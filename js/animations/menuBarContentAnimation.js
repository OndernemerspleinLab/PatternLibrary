import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {partialByObject, partial} from 'utils/functional';
import {animation} from 'utils/ngAnimation';
import {hidden as classNameFilters} from 'constants/classNames';
import {menuBarContent as selector} from 'constants/animationSelectors';
import {menuBarContent as animationTiming} from 'constants/animationTiming';

const animateOpacity = ({$element, opacity, done}) => {
	Velocity($element, {
		opacity,
	}, Object.assign({
		queue: false,
		complete: done
	}, animationTiming));
};

const beforeAnimate = ({$element, zIndex, opacity, done}) => {
	Velocity($element, "stop");

	if ($element[0].style.opacity === "") {
		Velocity.hook($element, "z-index", zIndex);
		Velocity.hook($element, "opacity", opacity);
	}
	done();
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters,

	beforeAddClass: partialByObject(beforeAnimate, {zIndex: 1, opacity: 1}),
	addClass: partialByObject(animateOpacity, {opacity: 0}),
	beforeRemoveClass: partialByObject(beforeAnimate, {zIndex: 2, opacity: 0}),
	removeClass: partialByObject(animateOpacity, {opacity: 1}),
});

init();

export default init;