import Modernizr from 'modernizr';
import {
	arrayfy, existing, unexisting, includes,
	isFilledArray, toObjectArguments,
	aliasMapProperty, partial
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