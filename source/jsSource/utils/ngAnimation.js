import {
	existing, mapObject, filterObject
} from 'utils/functional';

import {checkClassDecorator, canAnimateSwitcher, makeNgAnimationCallback} from 'utils/animationUtils';

// Ignore jshint warnings about to many arguments for this function
// jshint -W072
export const animation = ({
	module,
	selector,

	classNameFilters,

	beforeAnimate, beforeAnimateInstant,
	animate, animateInstant,

	setClass, setClassInstant,
	beforeSetClass, beforeSetClassInstant,

	addClass, addClassInstant,
	beforeAddClass, beforeAddClassInstant,

	removeClass, removeClassInstant,
	beforeRemoveClass, beforeRemoveClassInstant
}) => {
// jshint +W072

	// All possible animation types
	const fullAnimationConfig = {
		animate: canAnimateSwitcher(animate, animateInstant),
		beforeAnimate: canAnimateSwitcher(beforeAnimate, beforeAnimateInstant),

		setClass: canAnimateSwitcher(setClass, setClassInstant),
		beforeSetClass: canAnimateSwitcher(beforeSetClass, beforeSetClassInstant),

		addClass: checkClassDecorator(classNameFilters, canAnimateSwitcher(addClass, addClassInstant)),
		beforeAddClass: checkClassDecorator(classNameFilters, canAnimateSwitcher(beforeAddClass, beforeAddClassInstant)),

		removeClass: checkClassDecorator(classNameFilters, canAnimateSwitcher(removeClass, removeClassInstant)),
		beforeRemoveClass: checkClassDecorator(classNameFilters, canAnimateSwitcher(beforeRemoveClass, beforeRemoveClassInstant)),
	};

	// Filter out properties without a callback
	// so angular animation doesn't erroneously calls it
	const filteredAnimationConfig = filterObject(fullAnimationConfig, existing);

	const animationConfig = mapObject(filteredAnimationConfig, makeNgAnimationCallback);

	// Angular function for registering animations
	return module.animation(selector, () => animationConfig);
};