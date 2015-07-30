import angular from 'angular';
import DopApp from 'DopApp';
import Immutable from 'immutable';

var serviceNames = [
	"$http",
	"$animate",
	"$rootScope",
	"$q",
	"$timeout"
];


let ngServices = {};

getServices.$inject = serviceNames;
function getServices(...services) {
		services.reduce(function (memo, service, index) {
		let name = serviceNames[index];
		memo[name] = service;

		return memo;
	}, ngServices);
	Object.freeze(ngServices);
}

DopApp.run(getServices);

export default ngServices;