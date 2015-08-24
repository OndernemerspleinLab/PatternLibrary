import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {existing, partial} from 'utils/functional';
import {opened as classNameFilters} from 'constants/classNames';
import {menuBar as animationTiming} from 'constants/animationTiming';
import {menuBar as selector} from 'constants/animationSelectors';

export const getWidth = element => {
	if (existing(element)) {
		element.style.width = "";
		const width = parseInt(getComputedStyle(element).getPropertyValue("width"), 10);
		const maxWidth = parseInt(getComputedStyle(element).getPropertyValue("max-width"), 10);
		const minWidth = parseInt(getComputedStyle(element).getPropertyValue("min-width"), 10);

		const actualWidth = Math.max(Math.min(width, maxWidth), minWidth) + "px";

		return actualWidth;
	}
	return "0px";
};

export const animateTranslateX = ($element, translateX, done) => {
	Velocity($element, "stop");
	Velocity($element, {
		translateX,
	}, Object.assign({
		complete: done
	}, animationTiming));
};

export const animate = ({$element, options: {openedElement}, done}) => {
	const width = getWidth(openedElement);
	animateTranslateX($element, width, done);
};

export const instant = ({ $element, options: {openedElement}, done}) => {
	const width = getWidth(openedElement);
	Velocity.hook($element, "left", width);
	done();
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters,

	addClass: animate,
	addClassInstant: instant,

	removeClass: animate,
	removeClassInstant: instant,

	animate: animate,
	animateInstant: instant,
});

init();

export default init;