import {existing} from 'utils/functional';


describe("utils/functional", function () {
	it("should be a function", function () {
		expect(existing).toEqual(jasmine.any(Function));

	});
});