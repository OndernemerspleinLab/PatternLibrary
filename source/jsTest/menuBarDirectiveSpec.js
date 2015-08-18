import {baseTestDirective} from 'jsTest/testUtils';
import controller from 'controllers/menuBarController';
import {menuBarDirective as directive} from 'directives/menuBarDirective';

describe("menuBarDirective", () => {
	it("should be properly configured", () => {
		baseTestDirective({
			directive,
			controller,
			directiveName: "menuBarDirective",
			templateUrl: "menuBar.html",
			scopeConfig: {}
		});
	});
});