import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/animationUtils';

const duration = 400;
const delay = 0;
const hideClass = "ng-hide";

const animateOpacity = ({$element, opacity, done}) => {
	Velocity($element, {
		opacity,
	}, {
		queue: false,
		duration,
		delay,
		complete: done
	});
};

const beforeAnimate = ({$element, zIndex, opacity, done}) => {
	Velocity($element, "stop");

	if ($element[0].style.opacity === "") {
		Velocity.hook($element, "z-index", zIndex);
		Velocity.hook($element, "opacity", opacity);
	}
	done();
};

animation({
	module: DopApp,
	selector: '.ngAnimate-menuBar-content',

	classNamesFilter: hideClass,

	beforeAddClass: ({$element, done}) => beforeAnimate({$element, zIndex: 1, opacity: 1, done}),
	addClass: ({$element, done}) => animateOpacity({$element, opacity: 0, done}),
	beforeRemoveClass: ({$element, done}) => beforeAnimate({$element, zIndex: 2, opacity: 0, done}),
	removeClass: ({$element, className, done}) => animateOpacity({$element, opacity: 1, done}),
});