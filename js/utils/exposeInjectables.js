import angular from 'angular';
import DopApp from 'DopApp';
import Immutable from 'immutable';

let services;

var serviceNames = [
	"$http",
	"$rootScope"
];


let services = {};

getServices.$inject = serviceNames;
function getServices(...services) {
	console.log("I", services);
	services = services.reduce(function (memo, service, index) {
		let name = serviceNames[index];
		memo[name] = service;

		return memo;
	}, services);
}

DopApp.run(getServices);

export default services;