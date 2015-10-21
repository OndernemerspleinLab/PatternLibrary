import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {partialByObject, partial} from 'utils/functional';
import {animation} from 'utils/ngAnimation';
import {hidden as classNameFilters} from 'constants/classNames';
import {menuBarSideContent as selector} from 'constants/animationSelectors';
import {menuBarSideContent as animationTiming} from 'constants/animationTiming';
import getStyleProperty from 'utils/getStyleProperty';

const animateOpacity = ({$element, opacity, done}) => {
	Velocity($element, {
		opacity,
	}, Object.assign({
		queue: false,
		complete: done
	}, animationTiming));
};

const getZindex = ($element, zIndexDelta) => {
	$element.css("z-index", "");
	const zIndex = getStyleProperty($element[0], "z-index");
	const normalizedZIndex = isNaN(zIndex) ? 0 : Number(zIndex);
	return normalizedZIndex + zIndexDelta;
};

const beforeAnimate = ({$element, zIndexDelta, opacity, done}) => {
	Velocity($element, "stop");

	if ($element[0].style.opacity === "") {
		const zIndex = getZindex($element, zIndexDelta);
		Velocity.hook($element, "z-index", zIndex);
		Velocity.hook($element, "opacity", opacity);
	}
	done();
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters,

	beforeAddClass: partialByObject(beforeAnimate, {zIndexDelta: 0, opacity: 1}),
	addClass: partialByObject(animateOpacity, {opacity: 0}),
	beforeRemoveClass: partialByObject(beforeAnimate, {zIndexDelta: 1, opacity: 0}),
	removeClass: partialByObject(animateOpacity, {opacity: 1}),
});

init();

export default init;