import DopApp from 'DopApp';
import angular from 'angular';
import {debounce, partial, spliceItem} from 'utils/functional';
import ngServices from 'utils/ngServices';

const listeners = [];


const executeScrollListeners = ($window, $document, $timeout) => {
	const doc = $document[0];
	const left = $window.scrollX || doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
	const top = $window.scrollY || doc.documentElement.scrollTop || doc.body.scrollTop || 0;
	$timeout(() => listeners.forEach(listener => listener({top, left})));
};

export const scrollEventRunner = ($window, $document, $timeout, delay = 200) => {
	const windowElement = angular.element($window);

	windowElement.on("scroll", debounce(partial(executeScrollListeners, $window, $document, $timeout), delay));
};

scrollEventRunner.$inject = ["$window", "$document", "$timeout"];

export const registerScrollListener = (listener, list = listeners) => {
	list.push(listener);
	executeScrollListeners(ngServices.$window, ngServices.$document, ngServices.$timeout);

	return partial(spliceItem, list, listener);
};

DopApp.run(scrollEventRunner);