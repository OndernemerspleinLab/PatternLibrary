"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _DopApp = require('DopApp');

var _DopApp2 = _interopRequireDefault(_DopApp);

console.log("start");
_DopApp2["default"].directive("testDirective", function () {
	return {
		link: function link($scope, $element) {
			console.log("test", $element);
			$scope.haha = "lachuh";
		}
	};
});

// angular.bootstrap(document.documentElement, ['DopApp']);
//# sourceMappingURL=start.js.map
