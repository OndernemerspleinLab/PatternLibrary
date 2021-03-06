import angular from 'angular';


export const negate = (callback) => {
	return (...args) => !callback(...args);
};

export const existing = (value) => value !== undefined && value !== null;

export const unexisting = negate(existing);

export const falsy = (value) => unexisting(value) || value === false;

export const truthy = negate(falsy);

export const includes = (arr, value) => arr.indexOf(value) >= 0;

export const isEmptyArray = (arr) => arr.length === 0;

export const isFilledArray = negate(isEmptyArray);

export const partial = (func, ...args) => func.bind(null, ...args);

export const partialByObject = (func, boundObj = {}) => {
	return (obj = {}) => {
		const argObj = Object.assign({}, obj, boundObj);
		return func(argObj);
	};
};

export const debounce = (callback, delay) => {
	let timer;

	if (unexisting(delay) || delay === 0) {
		return callback;
	}

	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(partial(callback, ...args), delay);
	};
};

// Always returns an array, if the candidate is an array it is returned
// otherwise it is wrapped in an array
export const arrayfy = (candidate) => {
	if (existing(candidate)) {
		return angular.isArray(candidate) ? candidate : [candidate];
	}

	return [];
};

// Remove an item from an array by modifying the array
export const spliceItem = (arr, item) => {
	const index = arr.indexOf(item);
	if (index >= 0) {
		arr.splice(index, 1);
	}
};

export const defaults = (obj, ...defaultObjs) => {
	const defaultObjsReversed = [...defaultObjs].reverse();
	return Object.assign({}, ...defaultObjsReversed, obj);
};

export const forEachObject = (obj, iterator) => {
	const keys = Object.keys(obj);

	keys.forEach((key) => {
		const value = obj[key];
		iterator(value, key, obj);
	});
};

export const reduceObject = (obj, iterator, initial) => {
	const keys = Object.keys(obj);
	if (unexisting(initial)) {
		initial = obj[keys.shift()];
	}

	return keys.reduce((memo, key) => {
		const value = obj[key];
		return iterator(memo, value, key, obj);
	}, initial);
};

export const mapObject = (obj, iterator) => {
	return reduceObject(obj, (memo, value, key, innerObj) => {
		memo[key] = iterator(value, key, innerObj);

		return memo;
	}, {});
};

export const filterObject = (obj, iterator) => {
	return reduceObject(obj, (memo, value, key, innerObj) => {
		if (iterator(value, key, innerObj)) {
			memo[key] = value;
		}

		return memo;
	}, {});
};

export const isAscendantOf = (parent, child) => {
	if (parent === child) {
		return true;
	}

	const nextChild = child.parentElement;

	if (!nextChild) {
		return false;
	}

	return isAscendantOf(parent, nextChild);
};

export const aliasMapProperty = (map, oldKey, aliasKey) => map.set(aliasKey, map.get(oldKey));

export const toObjectArguments = (func, argNames) => {
	const callback = (...args) => {
		const config = argNames.reduce((memo, argName, index) => {
			memo[argName] = args[index];
			return memo;
		}, {});

		return func(config);
	};

	return callback;
};

export const minimalZero = partial(Math.max, 0);