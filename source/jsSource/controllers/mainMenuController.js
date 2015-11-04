import createOpenClose from 'openClose/singleOpened';
export default class MenuBarController {
	static get $inject() { return ['$attrs']; }

	constructor($attrs) {
		this.openClose = createOpenClose();
		const {defaultOpened, mainMenu: menuName} = $attrs;
		this.toggle = (unitName) => {
			if (this.openCloseState.enabled){
				this.openClose.toggle(unitName);
			}
		};
		this.openCloseState = {};
		this.menuName = menuName;
		this.isMenuFullyOpened = () => this.isFullyOpened && this.isFullyOpened(menuName, this.menuType);

		if (defaultOpened) {
			this.openClose.fullyOpen(defaultOpened);
		}
	}
}