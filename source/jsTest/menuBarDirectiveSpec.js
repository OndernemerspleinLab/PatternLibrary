import {baseTestDirective} from 'jsTest/testUtils';
import controller from 'controllers/menuBarController';
import {menuBarDirective as directive} from 'directives/menuBarDirective';

describe("menuBarDirective", () => {
	describe("directive configuration", () => {
		baseTestDirective(directive, "menuBarDirective", {
			controller,
			scope: true,
			restrict: "A",
		});
	});
});