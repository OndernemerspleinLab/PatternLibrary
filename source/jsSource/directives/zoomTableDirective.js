import DopApp from 'DopApp';
import {fixedTableClass} from 'constants/classNames';
import createOpenClose from 'openClose/singleOpened';

export const directiveName = "zoomTable";

class ZoomTable {
	constructor() {
		this.openClose = createOpenClose();

		this.getStateClass = () => {
			return this.openClose.isOpened("table") ? fixedTableClass : "";
		};
	}
}

DopApp.directive(directiveName, () => ({
	controllerAs: "viewModel",
	controller: ZoomTable,
	bindToController: true,
}));