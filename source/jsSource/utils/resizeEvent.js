import DopApp from 'DopApp';
import angular from 'angular';
import {partial, spliceItem} from 'utils/functional';
import ngServices from 'utils/ngServices';

const listeners = [];


const executeResizeListeners = ($timeout) => {
	$timeout(() => listeners.forEach(listener => listener()));
};

export const scrollEventRunner = ($window, $timeout) => {
	const windowElement = angular.element($window);

	windowElement.on("resize", partial(executeResizeListeners, $timeout));
};

scrollEventRunner.$inject = ["$window", "$timeout"];

export const registerResizeListener = (listener, list = listeners) => {
	list.push(listener);
	executeResizeListeners(ngServices.$timeout);

	return partial(spliceItem, list, listener);
};

DopApp.run(scrollEventRunner);