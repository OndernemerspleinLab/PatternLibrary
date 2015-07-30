
const singleOpened = Object.freeze({
	open: (store, openedUnit) => store.opened = openedUnit,
	close: (store) => store.opened = undefined,
	isOpened: (store, openedUnit) => store.opened === openedUnit,
	toggle: (store, openedUnit) => store.opened === openedUnit ?
			singleOpened.close(store) :
			singleOpened.open(store, openedUnit),
	isAnyOpened: (store) => Boolean(store.opened),
	getOpenedUnit: (store) => store.opened,
});

const create = () => {
	let store = {};

	return Object.freeze(Object.keys(singleOpened).reduce((memo, key) => {
		memo[key] = singleOpened[key].bind(null, store);
		return memo;
	}, {}));
};

export default create;