import {forceShowing as forceShowingClassName} from 'constants/classNames';
import {existing} from 'utils/functional';
import {height as animationTiming} from 'constants/animationTiming';
import Velocity from 'velocity-animate';

export const animateHeight = ($element, height, done) => {
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

const cleanHeightStyle = (element) => element.style.height = "";

// Remove added height styling and force the element to
// show so the height can be mesured properly
const getVerticalClientRect = $element => {
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

const removeVerticalMargin = ($element) => {
	$element.css({
		"margin-top": '0px',
		"margin-bottom": '0px',
	});
};

const setSizeElementStartHeight = ($sizeElement) => {
	const startHeight = $sizeElement.css("height");
	if (startHeight === "") {
		Velocity.hook($sizeElement, "height", "0px");
	}
};

const setContentMargins = ({
	sizeRect: {top: sizeRectTop, bottom: sizeRectBottom},
	wrapperRect: {top: wrapperRectTop, bottom: wrapperRectBottom},
	$contentElement
}) => {
	const offsetTop = Math.max(sizeRectTop - wrapperRectTop, 0);
	const offsetBottom = Math.max(wrapperRectBottom - sizeRectBottom, 0);
	$contentElement.css({
		"margin-top": `${offsetTop}px`,
		"margin-bottom": `${offsetBottom}px`,
	});
};

const getSizeRect = ({$scrollElement, $sizeElement}) => {
	// Append a temporary clone of $scrollElement to determine the
	// desired size of $sizeElement
	const $scrollClone = $scrollElement.clone();
	$scrollClone.css('position', 'relative');
	$sizeElement.append($scrollClone);
	const sizeRect = getVerticalClientRect($sizeElement);
	$scrollClone.remove();
	return sizeRect;
};
const getTargetHeight = sizeRect => sizeRect.height;

export const prepareAnimateOpen = ({$wrapper, $sizeElement, $scrollElement, $contentElement}) => {
	removeVerticalMargin($contentElement);

	const wrapperRect = getVerticalClientRect($wrapper);
	const sizeRect = getSizeRect({$scrollElement, $sizeElement, $wrapper, $contentElement});
	const targetHeight = getTargetHeight(sizeRect);

	setContentMargins({sizeRect, wrapperRect, $contentElement});
	setSizeElementStartHeight($sizeElement);

	return targetHeight;
};

export const prepareAnimateClose = ({$sizeElement}) => {
	const startHeight = $sizeElement[0].style.height;
	if (startHeight === "") {
		const {height} = getVerticalClientRect($sizeElement);

		Velocity.hook($sizeElement, "height", height);
	}
};