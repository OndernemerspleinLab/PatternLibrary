// Manage open and closed state for groups of elements that can only have one opened at a time

import {partial, existing, truthy} from 'utils/functional';

const singleOpened = Object.freeze({
	isOpened: (store, openedUnit) => existing(store.opened) && store.opened === openedUnit,
	isAnyOpened: (store) => truthy(store.opened),
	getOpenedUnit: (store) => store.opened,

	open: (store, openedUnit) => store.opened = openedUnit,
	close: (store) => store.opened = undefined,
	toggle: (store, openedUnit) => singleOpened.isOpened(store, openedUnit) ?
			singleOpened.close(store) :
			singleOpened.open(store, openedUnit),
});

const create = () => {
	const store = {};

	return Object.freeze(Object.keys(singleOpened).reduce((memo, key) => {
		memo[key] = partial(singleOpened[key], store);
		return memo;
	}, {}));
};

export default create;