import DopApp from 'DopApp';
import angular from 'angular';
import {debounce, partial, spliceItem} from 'utils/functional';

const listeners = [];

export const scrollEventRunner = ($window, $document, $rootScope, delay = 200) => {
	const windowElement = angular.element($window);
	const doc = $document[0];

	windowElement.on("scroll", debounce(() => {
		const left = $window.scrollX || doc.documentElement.scrollLeft || doc.body.scrollLeft || 0;
		const top = $window.scrollY || doc.documentElement.scrollTop || doc.body.scrollTop || 0;
		$rootScope.$apply(() => listeners.forEach(listener => listener({top, left})));
	}, delay));
};

scrollEventRunner.$inject = ["$window", "$document", "$rootScope"];

export const registerScrollListener = (listener, list = listeners) => {
	list.push(listener);
	return partial(spliceItem, list, listener);
};

DopApp.run(scrollEventRunner);