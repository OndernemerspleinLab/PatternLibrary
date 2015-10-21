// Manage open and closed state for groups of elements that can only have one opened at a time

import {partial, existing, unexisting, truthy} from 'utils/functional';

const singleOpened = Object.freeze({
	isOpened: (store, openedUnit) => existing(store.opened) && store.opened === openedUnit,
	isAnyOpened: (store) => truthy(store.opened),
	getOpenedUnit: (store) => store.opened,

	open: (store, openedUnit) => store.opened = openedUnit,
	close: (store, closedUnit) => {
		if (closedUnit === store.opened) {
			store.opened = undefined;
		}
	},
	toggle: (store, unit) => singleOpened.isOpened(store, unit) ?
			singleOpened.close(store, unit) :
			singleOpened.open(store, unit),

	canBeVisuallyOpened: (store, openedUnit) => unexisting(store.visuallyOpened) || store.visuallyOpened === openedUnit,
	isVisuallyOpened: (store, openedUnit) => existing(store.visuallyOpened) && store.visuallyOpened === openedUnit,
	getVisuallyOpenedUnit: (store) => store.visuallyOpened,

	visuallyOpen: (store, openedUnit) => store.visuallyOpened = openedUnit,
	visuallyClose: (store, closedUnit) => {
		if (closedUnit === store.visuallyOpened) {
			store.visuallyOpened = undefined;
		}
	},

	fullyOpen: (store, openedUnit, visuallyOpenedUnit = openedUnit) => {
		singleOpened.open(store, openedUnit);
		singleOpened.visuallyOpen(store, visuallyOpenedUnit);
	},

	getFullyOpenedUnit: (store) => {
		const opened = singleOpened.getOpenedUnit(store);
		return singleOpened.canBeVisuallyOpened(store, opened) ? opened : undefined;
	},
	isFullyOpened: (store, openedUnit, visuallyOpenedUnit = openedUnit) => singleOpened.isOpened(store, openedUnit) &&
			singleOpened.canBeVisuallyOpened(store, visuallyOpenedUnit),

});

const create = () => {
	const store = {};

	return Object.freeze(Object.keys(singleOpened).reduce((memo, key) => {
		memo[key] = partial(singleOpened[key], store);
		return memo;
	}, {}));
};

export default create;