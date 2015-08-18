// Manage open and closed state for groups of elements that can only have multiple opened at a time

import {partial} from 'utils/functional';

const multipleOpened  = Object.freeze({
	open: (store, openedUnit) => store.set(openedUnit, true),
	close: (store, openedUnit) => store.set(openedUnit, false),
	toggle: (store, openedUnit) => store.set(openedUnit, !store.get(openedUnit)),
	isOpened: (store, openedUnit) => Boolean(store.get(openedUnit)),
	isAnyOpened: (store) => Array.from(store.values()).some(Boolean),
});



const create = () => {
	const store = new Map();

	return Object.freeze(Object.keys(multipleOpened).reduce((memo, key) => {
		memo[key] = partial(multipleOpened[key], store);
		return memo;
	}, {}));
};

export default create;