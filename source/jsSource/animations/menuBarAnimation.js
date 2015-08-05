import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/animationUtils';
import {existing} from 'utils/functional';

const duration = 800;
const easing = [200, 20];
const openedClass = "is-opened";

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
	}, {
		duration,
		easing,
		complete: done
	});
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
	selector: '.ngAnimate-menuBar',

	classNamesFilter: openedClass,

	addClass: animate,
	addClassInstant: instant,

	removeClass: animate,
	removeClassInstant: instant,

	animate: animate,
	animateInstant: instant,
});