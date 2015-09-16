import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {hidden as classNameFilters, forceShowing as forceShowingClassName} from 'constants/classNames';
import {existing, partial} from 'utils/functional';
import {height as animationTiming} from 'constants/animationTiming';
import {seeThroughScroll as selector} from 'constants/animationSelectors';
// import ngServices from 'utils/ngServices';

const cleanHeightStyle = (element) => element.style.height = "";

export const getClientRect = $element => $element[0].getBoundingClientRect();

const animateHeight = ($element, height, done) => {
	Velocity($element, "stop");
	Velocity($element, {
		height
	}, Object.assign({
		complete: done
	}, animationTiming));

};

export const animateOpacity = ($element, opacity) => {
	Velocity($element, "stop");
	Velocity($element, {
		opacity
	}, { duration: 400 });
};

export const getVerticalClientRect = $element => {
	const element = $element[0];
	if (existing(element)) {
		const originalHeightStyle = element.style.height;
		cleanHeightStyle(element);
		element.classList.add(forceShowingClassName);
		const verticalClientRect = element.getBoundingClientRect();
		element.classList.remove(forceShowingClassName);
		element.style.height = originalHeightStyle;

		return verticalClientRect;
	}
	return 0;
};

const cleanElements = ($sizeElement, $scrollElement, $contentElement) => {
	$scrollElement.css("position", "relative");
	$sizeElement.css("height", '');
	$contentElement.css({
		"margin-top": '0px',
		"margin-bottom": '0px',
	});
};
const setAnimationStartState = ($sizeElement, $scrollElement, startHeight) => {
	$scrollElement.css("position", "");
	if (startHeight === "") {
		Velocity.hook($sizeElement, "height", "0px");
	}
};

const setContentMargins = (sizeRect, wrapperRect, $contentElement) => {
	const offsetTop = Math.max(sizeRect.top - wrapperRect.top, 0);
	const offsetBottom = Math.max(wrapperRect.bottom - sizeRect.bottom, 0);
	$contentElement.css({
		"margin-top": `${offsetTop}px`,
		"margin-bottom": `${offsetBottom}px`,
	});
};

const prepareOpen = ({options, done}) => {
	const {$wrapper, $sizeElement, $scrollElement, $contentElement} = options;
	const startHeight = $sizeElement[0].style.height;
	cleanElements($sizeElement, $scrollElement, $contentElement);

	const sizeRect = getVerticalClientRect($sizeElement);
	const wrapperRect = getVerticalClientRect($wrapper);
	setContentMargins(sizeRect, wrapperRect, $contentElement);
	const targetHeight = sizeRect.height;

	setAnimationStartState($sizeElement, $scrollElement, startHeight);

	options.targetHeight = targetHeight;

	done();
};

export const animateOpen = ({options: {$wrapper, $sizeElement, $scrollElement, $contentElement, targetHeight}, done}) => {
	animateHeight($sizeElement, `${targetHeight}px`, done);
	// animateOpacity($scrollElement, 1, () => {});
};

export const resize = ({options: {$wrapper, $sizeElement, $scrollElement, $contentElement, targetHeight}, done}) => {
	Velocity.hook($sizeElement, 'height', `${targetHeight}px`);
	// Velocity.hook($scrollElement, 'opacity', 1);
	done();
};

const prepareClose = ({options, done}) => {
	const {$sizeElement} = options;
	const startHeight = $sizeElement[0].style.height;
	if (startHeight === "") {
		const {height} = getVerticalClientRect($sizeElement);

		Velocity.hook($sizeElement, "height", height);
	}
	done();
};

export const animateClose = ({options: {$wrapper, $sizeElement, $scrollElement, $contentElement}, done}) => {
	animateHeight($sizeElement, '0px', done);
	// animateOpacity($scrollElement, 0.2, () => {});
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters: classNameFilters,

	beforeAddClass: prepareClose,
	addClass: animateClose,

	beforeRemoveClass: prepareOpen,
	removeClass: animateOpen,

	beforeAnimate: prepareOpen,
	animate: resize,
});

init();

export default init;