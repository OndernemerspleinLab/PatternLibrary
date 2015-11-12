import DopApp from 'DopApp';
import createOpenClose from 'openClose/singleOpened';

export const directiveName = "openClose";

class OpenClose {
	constructor() {
		this.openClose = createOpenClose();
	}
}

DopApp.directive(directiveName, () => ({
	controllerAs: "viewModel",
	controller: OpenClose,
	bindToController: true,
}));