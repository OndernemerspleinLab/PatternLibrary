import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/animationUtils';
import {existing} from 'utils/functional';
import {opened as classNameFilters} from 'constants/classNames';
import {menuBar as animationTiming} from 'constants/animationTiming';
import {menuBar as selector} from 'constants/animationSelectors';

const getWidth = element => {
	if (existing(element)) {
		element.style.width = "";
		return getComputedStyle(element).getPropertyValue("width");
	}
	return "0px";
};

const animateTranslateX = ($element, translateX, done) => {
	Velocity($element, "stop");
	Velocity($element, {
		translateX,
	}, Object.assign({
		complete: done
	}, animationTiming));
};

const animate = ({$element, options: {openedElement}, done}) => {
	const width = getWidth(openedElement);
	animateTranslateX($element, width, done);
};

const instant = ({ $element, options: {openedElement}, done}) => {
	const width = getWidth(openedElement);
	Velocity.hook($element, "left", width);
	done();
};

animation({
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