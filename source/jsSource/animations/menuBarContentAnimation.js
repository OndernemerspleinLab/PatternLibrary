import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {partialByObject} from 'utils/functional';
import {animation} from 'utils/animationUtils';
import {hidden as classNameFilters} from 'constants/classNames';
import {menuBarContent as selector} from 'constants/animationSelectors';
console.log("C", classNameFilters, selector);


const duration = 400;
const delay = 0;

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
	selector,

	classNameFilters,

	beforeAddClass: partialByObject(beforeAnimate, {zIndex: 1, opacity: 1}),
	addClass: partialByObject(animateOpacity, {opacity: 0}),
	beforeRemoveClass: partialByObject(beforeAnimate, {zIndex: 2, opacity: 0}),
	removeClass: partialByObject(animateOpacity, {opacity: 1}),
});