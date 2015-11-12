import DopApp from 'DopApp';
import createOpenClose from 'openClose/singleOpened';

export const directiveName = "openCloseSingle";

class OpenCloseSingle {
	constructor() {
		this.openClose = createOpenClose();
	}
}

DopApp.directive(directiveName, () => ({
	controllerAs: "viewModel",
	controller: OpenCloseSingle,
	bindToController: true,
}));