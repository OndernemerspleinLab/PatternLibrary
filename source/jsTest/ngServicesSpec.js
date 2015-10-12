import DopApp from 'DopApp';
import ngServices, {getServices} from 'utils/ngServices';

describe("ngServices", function () {

	const serviceNames = [
		"$http",
		"$animate",
		"$rootScope",
		"$q",
		"$timeout",
		"$document",
		"$parse",
		"$window"
	];
	DopApp.run(getServices);

	serviceNames.forEach(function (serviceName) {
		it(`should have the angular ${serviceName} service as a property`, function () {
			const runFunction = (service) => {
				expect(service).not.toBeUndefined();
				expect(ngServices[serviceName]).toBe(service);
			};
			runFunction.$inject = [serviceName];
			DopApp.run(runFunction);
		});

	});
});