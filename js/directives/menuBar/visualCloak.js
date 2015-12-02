import DopApp from 'DopApp';

export const directiveName = "visualCloak";

DopApp.directive(directiveName, () => ({
	compile: function($element, $attr) {
		$attr.$set(directiveName, undefined);
		$element.removeClass(directiveName);
	},
}));