import DopApp from 'DopApp';
import 'animations/heightAnimation';
import createOpenClose from 'openClose/singleOpened';

export const directiveName = "openCloseSingle";

class OpenCloseSingle {
	constructor() {
		Object.assign(this, createOpenClose());
	}
}

DopApp.directive(directiveName, () => ({
	controllerAs: "viewModel",
	controller: OpenCloseSingle,
	scope: true,
	bindToController: true,
}));