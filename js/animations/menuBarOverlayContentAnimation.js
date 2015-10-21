import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import Modernizr from 'modernizr';
import {partialByObject, partial, minimalZero} from 'utils/functional';
import {animation} from 'utils/ngAnimation';
import getWindowSize from 'utils/getWindowSize';
import getStyleProperty from 'utils/getStyleProperty';
import {hidden as classNameFilters} from 'constants/classNames';
import {menuBarOverlayContent as selector} from 'constants/animationSelectors';
import {menuBarOverlayContent as animationTiming} from 'constants/animationTiming';

const transformPropName = Modernizr.prefixed("transform");
const buttonPadding = 10;

const getOffsetFromBottom = (canvasHeight, element) => {
	const {bottom: bottomFromTop} = element.getBoundingClientRect();
	const fromBottom = canvasHeight - bottomFromTop;

	return fromBottom;
};

const fitInCanvas = (canvasHeight, bottomOffset, elementHeight) => {
	const elementTop = elementHeight + bottomOffset;
	const topOverFlow = minimalZero(elementTop - canvasHeight);
	const newBottomOffset = minimalZero(bottomOffset - topOverFlow);

	return newBottomOffset;
};

const calcBottomPosition = (buttonPadding, overlayElement, buttonElement) => {
	const {height: windowHeight} = getWindowSize();
	const {height: overlayInnerHeight} = overlayElement.getBoundingClientRect();
	const overlayMarginTop = parseInt(getStyleProperty(overlayElement, "margin-top"), 10) || 0;
	const overlayHeight = overlayInnerHeight + overlayMarginTop;

	const buttonBottom = getOffsetFromBottom(windowHeight, buttonElement);
	const overlayBottom = getOffsetFromBottom(windowHeight, overlayElement);

	const buttonBottomWithPadding = buttonBottom - buttonPadding;
	const bottomOffset = fitInCanvas(windowHeight, buttonBottomWithPadding, overlayHeight);

	const overlayOffsetFromBottom = minimalZero(bottomOffset - overlayBottom);

	return overlayOffsetFromBottom;
};

const animateOpacity = ({$element, translateX, done}) => {
	Velocity($element, {
		translateX,
	}, Object.assign({
		queue: false,
		complete: done
	}, animationTiming));
};

const beforeOpenAnimate = ({$element, options: {buttonElement}, done}) => {
	Velocity($element, "stop");
	const element = $element[0];
	element.style.bottom = "";
	const bottomOffset = calcBottomPosition(buttonPadding, element, buttonElement);
	element.style.bottom = `${bottomOffset}px`;

	if (element.style[transformPropName] === "") {
		Velocity.hook($element, "translateX", "-100%");
	}
	done();
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters,

	addClass: partialByObject(animateOpacity, {translateX: "-100%"}),
	beforeRemoveClass: beforeOpenAnimate,
	removeClass: partialByObject(animateOpacity, {translateX: "0%"}),
});

init();

export default init;