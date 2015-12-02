import DopApp from 'DopApp';
import 'animations/heightAnimation';
import createOpenClose from 'openClose/singleOpened';

export const directiveName = "openCloseSingle";

class OpenCloseSingle {
	static get $inject() { return ['$attrs']; }
	constructor($attrs) {
		const defaultOpened = $attrs[directiveName];
		Object.assign(this, createOpenClose());

		if (defaultOpened) {
			this.open(defaultOpened);
		}
	}
}

DopApp.directive(directiveName, () => ({
	controllerAs: "viewModel",
	controller: OpenCloseSingle,
	scope: true,
	bindToController: true,
}));