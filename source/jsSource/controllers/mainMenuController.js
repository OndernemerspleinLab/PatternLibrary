// import {partial} from 'utils/functional';
import createOpenClose from 'openClose/singleOpened';

export default class MenuBarController {
	static get $inject() { return ['$attrs']; }

	constructor($attrs) {
		this.openClose = createOpenClose();
		const {defaultOpened, mainMenu: menuName} = $attrs;
		this.menuName = menuName;
		this.isMenuOpened = () => this.isOpened && this.isOpened(menuName);

		if (defaultOpened) {
			this.openClose.fullyOpen(defaultOpened);
		}
	}
}