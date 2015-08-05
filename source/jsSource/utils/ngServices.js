import 'angular';
import DopApp from 'DopApp';

const serviceNames = [
	"$http",
	"$animate",
	"$rootScope",
	"$q",
	"$timeout"
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

export default ngServices;