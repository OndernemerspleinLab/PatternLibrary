import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';

describe("ngServices", function () {

	const serviceNames = [
		"$http",
		"$animate",
		"$rootScope",
		"$q",
		"$timeout"
	];

	serviceNames.forEach(function (serviceName) {
		it(`should have the angular ${serviceName} service as a property`, function () {
			const runFunction = (service) => {
				expect(ngServices[serviceName]).toBe(service);
			};
			runFunction.$inject = [serviceName];
			DopApp.run(runFunction);
		});

	});
});