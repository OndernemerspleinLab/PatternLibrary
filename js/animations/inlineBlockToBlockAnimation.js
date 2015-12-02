import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {opened as classNameFilters, forceShowing as forceShowingClass} from 'constants/classNames';
import {partial, mapObject} from 'utils/functional';
import {inlineBlockToBlock as selector} from 'constants/animationSelectors';
import {inlineBlockToBlock as animationTiming} from 'constants/animationTiming';

export const animateSize = ($element, first, second, done) => {
	Velocity($element, first, animationTiming);
	Velocity($element, second, Object.assign({
		complete: () => {
			$element.css({
				"width": "",
				"height": "",
			});
			done();
		},
	}, animationTiming));
};

const addPx = (val) => `${val}px`;
const addPxToProps = (obj) => mapObject(obj, addPx);

const getInlineBlockSize = ($element, blockOnlyElements) => {
	blockOnlyElements.forEach((element) => element.style.display = "none");
	$element.css({ display: "inline-block" });
	const {width, height} = $element[0].getBoundingClientRect();
	blockOnlyElements.forEach((element) => element.style.display = "");
	$element.css({ display: "" });

	return addPxToProps({width, height});

};

const getBlockSize = ($element, blockOnlyElements) => {
	blockOnlyElements.forEach((element) => element.classList.add(forceShowingClass));
	blockOnlyElements.forEach((element) => element.style.display = "");
	$element.css({ display: "block" });
	const {width, height} = $element[0].getBoundingClientRect();
	$element.css({ display: "" });
	blockOnlyElements.forEach((element) => element.classList.remove(forceShowingClass));

	return addPxToProps({width, height});
};


export const beforeAnimate = ({$element, options, done}) => {
	const {blockOnlyElements} = options;

	const inlineBlockSize = getInlineBlockSize($element, blockOnlyElements);
	const blockSize = getBlockSize($element, blockOnlyElements);

	Object.assign(options, {inlineBlockSize, blockSize});
	done();
};

export const animateOpen = ({$element, options: { inlineBlockSize, blockSize }, done}) => {
	Velocity($element, "stop");
	Velocity.hook($element[0], "height", inlineBlockSize.height);
	Velocity.hook($element[0], "width", inlineBlockSize.width);
	animateSize($element, {width: blockSize.width}, {height: blockSize.height}, done);
};

export const animateClose = ({$element, options: { inlineBlockSize, blockSize }, done}) => {
	Velocity($element, "stop");
	Velocity.hook($element[0], "height", blockSize.height);
	Velocity.hook($element[0], "width", blockSize.width);
	animateSize($element, {height: inlineBlockSize.height}, {width: inlineBlockSize.width}, done);
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters: classNameFilters,

	beforeAddClass: beforeAnimate,
	addClass: animateOpen,

	beforeRemoveClass: beforeAnimate,
	removeClass: animateClose,

});

init();

export default init;