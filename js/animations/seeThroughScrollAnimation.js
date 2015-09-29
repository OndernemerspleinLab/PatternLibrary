// Open and close an accordion that has it's content scroll
// behind the elements above and below it in order to give the
// user a clue about the fact that there is content that
// can be reached by scrolling

// *** Core concept ***
//
// Elements:
//
// * "see-though-elements": semi-transparant
//   elements which allow the overflown scrollable content
//   to be seen by the user
//
// * $wrapper: element that defines the area where the
//   scrollable content is visible, either behind other
//   (semitransparent) elements or on its own
//
// * $sizeElement: empty element that is used to take up space
//   where the content can be seen without being behind an
//   other element
//
// * $scrollElement: element that is scrollable and takes up the
//   space that should be scrollable, including the space behind
//   the see-through-elements
//
// * $contentElement: element containing the scrollable content
//   it should have margins on top and bottom to compensate
//   for the space behind the see-through-elements
//
//
// Layers:
//
// * overlay: top layer that is formed bij the
//   see-through-elements
//
// * content: second layer that can be seen through the
//   see-through-elements and is formed by $scrollElement and
//   contains $contentElement
//
// * size: bottom layer that is formed by $sizeElement
//   This layer does not contain any content and should
//   not interfere with the user interacting
//   with the other layers


import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {hidden as classNameFilters, forceShowing as forceShowingClassName} from 'constants/classNames';
import {existing, partial} from 'utils/functional';
import {height as animationTiming} from 'constants/animationTiming';
import {seeThroughScroll as selector} from 'constants/animationSelectors';


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

const cleanContentElement = ($contentElement) => {
	$contentElement.css({
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

const beforeAnimateOpen = ({options, done}) => {
	const {$wrapper, $sizeElement, $scrollElement, $contentElement} = options;
	cleanContentElement($contentElement);

	const wrapperRect = getVerticalClientRect($wrapper);
	const sizeRect = getSizeRect({$scrollElement, $sizeElement, $wrapper, $contentElement});
	const targetHeight = getTargetHeight(sizeRect);

	setContentMargins({sizeRect, wrapperRect, $contentElement});
	setSizeElementStartHeight($sizeElement);

	// Expose targetHeight to animateOpen function
	options.targetHeight = targetHeight;
	done();
};

export const animateOpen = ({options: {$wrapper, $sizeElement, $scrollElement, $contentElement, targetHeight}, done}) => {
	// targetHeight was set in beforeAnimateOpen
	animateHeight($sizeElement, `${targetHeight}px`, done);
	animateOpacity($scrollElement, 1, () => {});
};

export const instantOpen = ({options: {$scrollElement}, done}) => {
	$scrollElement.css('position', 'relative');
	done();
};

export const resize = ({options: {$wrapper, $sizeElement, $scrollElement, $contentElement, targetHeight}, done}) => {
	Velocity.hook($sizeElement, 'height', `${targetHeight}px`);
	Velocity.hook($scrollElement, 'opacity', 1);
	done();
};

const beforeAnimateClose = ({options, done}) => {
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
	animateOpacity($scrollElement, 0, () => {});
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters: classNameFilters,

	beforeAddClass: beforeAnimateClose,
	addClass: animateClose,

	beforeRemoveClass: beforeAnimateOpen,
	removeClass: animateOpen,
	removeClassInstant: instantOpen,

	beforeAnimate: beforeAnimateOpen,
	animate: resize,
	animateInstant: instantOpen,
});

init();

export default init;