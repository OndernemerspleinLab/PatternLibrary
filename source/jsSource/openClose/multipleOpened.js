// Manage open and closed state for groups of elements that can only have multiple opened at a time

const multipleOpened  = Object.freeze({
	open: (store, openedUnit) => store[openedUnit] = true,
	close: (store, openedUnit) => store[openedUnit] = false,
	toggle: (store, openedUnit) => store[openedUnit] = !store[openedUnit],
	isOpened: (store, openedUnit) => Boolean(store[openedUnit]),
	isAnyOpened: (store) => Object.keys(store).some(openedUnit => store[openedUnit]),
});



const create = () => {
	const store = {};

	return Object.freeze(Object.keys(multipleOpened).reduce((memo, key) => {
		memo[key] = multipleOpened[key].bind(null, store);
		return memo;
	}, {}));
};

export default create;