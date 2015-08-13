import Modernizr from 'modernizr';
import {
	arrayfy, existing, unexisting, includes,
	isFilledArray, mapObject, filterObject,
	toObjectArguments, aliasMapProperty, partial
} from 'utils/functional';


// Only animate when we can do so efficiently with csstransforms
export const canAnimate = () => {
	return Modernizr.csstransforms;
};


// Call either canCallCallback or canNotCallCallback depending
// on wether the browser supports enough to succesfully animate
export const switchCallback = (switcher, truthyCallback, falsyCallback) => {
	const callback = switcher() ? truthyCallback : falsyCallback;
	return callback;
};

// Call either animationCallback or noAnimationCallback depending
// on wether the browser supports enough to succesfully animate
export const canAnimateSwitcher = partial(switchCallback, canAnimate);

//  check if classNameFilters is empty or if className is in classNameFilters
export const checkClass = (classNameFilters, className) => {
	classNameFilters = arrayfy(classNameFilters);

	return isFilledArray(classNameFilters) && includes(classNameFilters, className);
};

// Only call callback when the className matches one of the classNameFilters
export const checkClassDecorator = (classNameFilters, callback) => {
	if (unexisting(callback)) {
		return undefined;
	}

	return (config) => {
		const className = config.className;
		if (checkClass(classNameFilters, className)) {
			return callback(config);
		}
	};
};

export const makeNgAnimationCallback = (callback, eventName) => {
	const argsMap = new Map([
		['animate', ['$element', 'from', 'to', 'done', 'options']],
		['setClass', ['$element', 'classNameToAdd', 'classNameToRemove', 'done', 'options']],
		['addClass', ['$element', 'className', 'done', 'options']],
	]);

	aliasMapProperty(argsMap, 'animate', 'beforeAnimate');
	aliasMapProperty(argsMap, 'setClass', 'beforeSetClass');
	aliasMapProperty(argsMap, 'addClass', 'beforeAddClass');
	aliasMapProperty(argsMap, 'addClass', 'beforeRemoveClass');
	aliasMapProperty(argsMap, 'addClass', 'removeClass');

	const argNames = argsMap.get(eventName);

	const angularCallback = existing(argNames) ? toObjectArguments(callback, argNames) : callback;

	return angularCallback;
};

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

		setClass: checkClassDecorator(classNameFilters, canAnimateSwitcher(setClass, setClassInstant)),
		beforeSetClass: checkClassDecorator(classNameFilters, canAnimateSwitcher(beforeSetClass, beforeSetClassInstant)),

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