import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import Modernizr from 'modernizr';
import {partialByObject, partial} from 'utils/functional';
import {animation} from 'utils/ngAnimation';
import {hidden as classNameFilters} from 'constants/classNames';
import {menuBarOverlayContent as selector} from 'constants/animationSelectors';
import {menuBarOverlayContent as animationTiming} from 'constants/animationTiming';
const transformPropName = Modernizr.prefixed("transform");

const animateOpacity = ({$element, translateX, done}) => {
	Velocity($element, {
		translateX,
	}, Object.assign({
		queue: false,
		complete: done
	}, animationTiming));
};

const beforeOpenAnimate = ({$element, done}) => {
	Velocity($element, "stop");

	if ($element[0].style[transformPropName] === "") {
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