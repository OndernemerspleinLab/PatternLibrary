import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';

describe("ngServices", function () {
	it("should have the angular $http service as a property", function () {
		DopApp.run(function ($http) {
			expect(ngServices.$http).toBe($http);
		});
	});
});