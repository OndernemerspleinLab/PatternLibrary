// Manage open and closed state for groups of elements that can only have one opened at a time

const singleOpened = Object.freeze({
	isOpened: (store, openedUnit) => store.opened === openedUnit,
	isAnyOpened: (store) => Boolean(store.opened),
	getOpenedUnit: (store) => store.opened,

	open: (store, openedUnit) => store.opened = openedUnit,
	close: (store) => store.opened = undefined,
	toggle: (store, openedUnit) => store.opened === openedUnit ?
			singleOpened.close(store) :
			singleOpened.open(store, openedUnit),
});

const create = () => {
	const store = {};

	return Object.freeze(Object.keys(singleOpened).reduce((memo, key) => {
		memo[key] = singleOpened[key].bind(null, store);
		return memo;
	}, {}));
};

export default create;