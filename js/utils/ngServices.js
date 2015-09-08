import 'angular';
import DopApp from 'DopApp';

// List of services that will be extracted from angular
const serviceNames = [
	"$http",
	"$animate",
	"$rootScope",
	"$q",
	"$timeout",
	"$window"
];


const ngServices = {};

getServices.$inject = serviceNames;
function getServices(...services) {
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