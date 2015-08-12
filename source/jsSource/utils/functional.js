import angular from 'angular';


export const negate = (callback) => {
	return (...args) => !callback(...args);
};
export const existing = (value) => value !== undefined && value !== null;

export const unexisting = negate(existing);

export const isEmptyArray = (arr) => arr.length === 0;

export const partial = (func, ...args) => func.bind(null, ...args);

export const partialByObject = (func, boundObj = {}) => (obj = {}) => {
	const argObj = Object.assign({}, boundObj, obj);
	return func(argObj);
};

// Always returns an array, if the candidate is an array it is returned
// otherwise it is wrapped in an array
export const arrayfy = (candidate) => {
	if (existing(candidate)) {
		return angular.isArray(candidate) ? candidate : [candidate];
	}

	return [];
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