
import createOpenClose from 'openClose/singleOpened';
export default class MenuBarController {
	static get $inject() { return ['$attrs']; }

	constructor($attrs) {
		this.openClose = createOpenClose();
		const defaultOpened = $attrs.defaultOpened;

		if (defaultOpened) {
			this.openClose.open(defaultOpened);
			this.actuallyOpened = defaultOpened;
		}

		this.isOpened = name => {
			return this.openClose.isOpened(name) &&
					(this.actuallyOpened === name || this.actuallyOpened === undefined);
		};
	}
}