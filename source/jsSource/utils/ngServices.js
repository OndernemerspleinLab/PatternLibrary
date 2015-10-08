import 'angular';
import DopApp from 'DopApp';

// List of services that will be extracted from angular
export const serviceNames = [
	"$http",
	"$animate",
	"$rootScope",
	"$q",
	"$timeout",
	"$document",
	"$window"
];


const ngServices = {};

getServices.$inject = serviceNames;
export function getServices(...services) {
	if (Object.isFrozen(ngServices)) { return; }
	services.reduce(function (memo, service, index) {
		const name = serviceNames[index];
		memo[name] = service;

		return memo;
	}, ngServices);
	Object.freeze(ngServices);
}

DopApp.run(getServices);

// ngServices will be populated once angular was initiated
export default ngServices;