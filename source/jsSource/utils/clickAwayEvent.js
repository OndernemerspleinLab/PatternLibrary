import DopApp from 'DopApp';
import {partial, spliceItem, isAscendantOf} from 'utils/functional';

const listeners = [];


const executeClickAwayListeners = ($timeout, evnt) => {
	$timeout(() => listeners.forEach(({listener, element}) => {
		const target = evnt.target;

		if (!isAscendantOf(element, target)) {
			listener();
		}
	}));
};

export const scrollEventRunner = ($document, $timeout) => {

	$document.on("click", partial(executeClickAwayListeners, $timeout));
};

scrollEventRunner.$inject = ["$document", "$timeout"];

export const registerClickAwayListener = (listener, element, list = listeners) => {
	const listenerUnit = {listener, element};
	list.push(listenerUnit);

	return partial(spliceItem, list, listenerUnit);
};

DopApp.run(scrollEventRunner);