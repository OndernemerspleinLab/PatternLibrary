import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {opened as classNameFilters} from 'constants/classNames';
import {partial} from 'utils/functional';
import {height as selector} from 'constants/animationSelectors';
import {height as animationTiming} from 'constants/animationTiming';

export const animateSize = ($element, width, height, done) => {
	Velocity($element, "stop");
	Velocity($element, {
		width,
		height,
	}, Object.assign({
		complete: () => {
			$element.css({
				"width": "",
				"height": "",
			});
			done();
		},
	}, animationTiming));
};

const getInlineBlockSize = ($element, $extraElements) => {

};

const getBlockSize = () => {};


export const beforeAnimateOpen = ({$element, options, done}) => {
	const initialHeight = $element.css("height");
	const initialWidth = $element.css("width");

	$element.css({
		"width": "",
		"height": "",
	});

	const closedSize = getClosedSize();
	const openedSize = getOpenedSize();
	done();
};

export const animateOpen = ({$element, options: { targetWidth, targetHeight }, done}) => {
	animateSize($element, targetWidth, targetHeight, done);
};

export const beforeAnimateClose = ({$element, done}) => {
	done();
};

export const animateClose = ({$element, done}) => {
	animateSize($element, 0, done);
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters: classNameFilters,

	// beforeAddClass: beforeAnimateClose,
	addClass: animateClose,

	beforeRemoveClass: beforeAnimateOpen,
	removeClass: animateOpen,

});

init();

export default init;