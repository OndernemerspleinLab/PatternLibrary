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
import {hidden as classNameFilters} from 'constants/classNames';
import {partial} from 'utils/functional';
import {seeThroughScroll as selector} from 'constants/animationSelectors';
import {
	animateHeight,
	animateOpacity,
	prepareAnimateOpen,
	prepareAnimateClose
} from 'animations/seeThroughScroll/seeThroughScrollAnimationFunctions';

export const beforeAnimateOpen = ({options, done}) => {
	const targetHeight = prepareAnimateOpen(options);
	// Expose targetHeight to animateOpen function
	options.targetHeight = targetHeight;
	done();
};

export const animateOpen = ({options: {$sizeElement, $scrollElement, targetHeight}, done}) => {
	// targetHeight was set in beforeAnimateOpen
	animateHeight($sizeElement, `${targetHeight}px`, done);
	animateOpacity($scrollElement, 1, () => {});
};

export const instantOpen = ({options: {$scrollElement}, done}) => {
	$scrollElement.css('position', 'relative');
	done();
};

export const resize = ({options: {$wrapper, $sizeElement, $scrollElement, $contentElement, targetHeight, enabled}, done}) => {
	Velocity.hook($scrollElement, 'opacity', 1);
	if (enabled) {
		Velocity.hook($sizeElement, 'height', `${targetHeight}px`);
	} else {
		$contentElement.css({
			"margin-top": "",
			"margin-bottom": "",
		});
	}
	done();
};

export const beforeAnimateClose = ({options, done}) => {
	prepareAnimateClose(options);
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