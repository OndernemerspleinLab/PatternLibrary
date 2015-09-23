import createOpenClose from 'openClose/singleOpened';

describe("singleOpened", () => {
	let openClose;

	beforeEach(() => openClose = createOpenClose());

	describe("isOpened", () => {
		it("should not match undefined", () => {
			expect(openClose.isOpened(undefined)).toBe(false);
		});

		it("should descern opened and closed units", () => {
			const opened = {};
			const closed = {};
			openClose.open(opened);
			expect(openClose.isOpened(opened)).toBe(true);
			expect(openClose.isOpened(closed)).toBe(false);
		});
	});

	describe("isAnyOpened", () => {
		it("should find out if anything is opened", () => {
			expect(openClose.isAnyOpened()).toBe(false);
			openClose.open("test");
			expect(openClose.isAnyOpened()).toBe(true);
		});
	});

	describe("getOpenedUnit", () => {
		it("should return undefined when no unit is opened", () => {
			expect(openClose.getOpenedUnit()).toBeUndefined();
		});

		it("should return the opened unit", () => {
			const opened = {};
			openClose.open(opened);
			expect(openClose.getOpenedUnit(opened)).toBe(opened);
		});
	});

	describe("open", () => {
		it("should open a unit", () => {
			const unit = {};
			openClose.open(unit);
			expect(openClose.getOpenedUnit()).toBe(unit);
		});
	});

	describe("close", () => {
		it("should close a unit", () => {
			const unit = {};
			openClose.open(unit);
			expect(openClose.isOpened(unit)).toBe(true);
			openClose.close(unit);
			expect(openClose.isOpened(unit)).toBe(false);
		});
	});

	describe("toggle", () => {
		it("should toggle a unit", () => {
			const unit = {};

			openClose.toggle(unit);
			expect(openClose.isOpened(unit)).toBe(true);
			openClose.toggle(unit);
			expect(openClose.isOpened(unit)).toBe(false);
		});

		it("should open a unit when an other unit is opened", () => {
			const unit = {};
			const otherUnit = {};

			openClose.open(otherUnit);
			openClose.toggle(unit);
			expect(openClose.isOpened(unit)).toBe(true);
			openClose.toggle(unit);
			expect(openClose.isOpened(unit)).toBe(false);
		});
	});

	describe("canBeVisuallyOpened", () => {
		it("should recognize a unit can be visually opened", () => {
			const opened = {};
			openClose.visuallyOpen(opened);
			expect(openClose.canBeVisuallyOpened(opened)).toBe(true);
		});

		it("should recognize a unit can visually closed", () => {
			const opened = {};
			const closed = {};
			openClose.visuallyOpen(opened);
			expect(openClose.canBeVisuallyOpened(closed)).toBe(false);
		});

		it("should recognize a unit can be visually opened when nothing is visually opened", () => {
			const closed = {};
			expect(openClose.canBeVisuallyOpened(closed)).toBe(true);
		});
	});

	describe("isVisuallyOpened", () => {
		it("should not match undefined", () => {
			expect(openClose.isVisuallyOpened(undefined)).toBe(false);
		});

		it("should descern opened and closed units", () => {
			const opened = {};
			const closed = {};
			openClose.visuallyOpen(opened);
			expect(openClose.isVisuallyOpened(opened)).toBe(true);
			expect(openClose.isVisuallyOpened(closed)).toBe(false);
		});
	});

	describe("getOpenedUnit", () => {
		it("should return undefined when no unit is opened", () => {
			expect(openClose.getVisuallyOpenedUnit()).toBeUndefined();
		});

		it("should return the opened unit", () => {
			const opened = {};
			openClose.visuallyOpen(opened);
			expect(openClose.getVisuallyOpenedUnit(opened)).toBe(opened);
		});
	});

	describe("visuallyOpen", () => {
		it("should visually open a unit", () => {
			const unit = {};
			openClose.visuallyOpen(unit);
			expect(openClose.getVisuallyOpenedUnit()).toBe(unit);
		});
	});

	describe("visuallyClose", () => {
		it("should close a unit", () => {
			const unit = {};
			openClose.visuallyOpen(unit);
			expect(openClose.isVisuallyOpened(unit)).toBe(true);
			openClose.visuallyClose(unit);
			expect(openClose.isVisuallyOpened(unit)).toBe(false);
		});
	});

	describe("fullyOpen", () => {
		it("should both regularly and visually open a unit", () => {
			const opened = {};
			openClose.fullyOpen(opened);
			expect(openClose.getOpenedUnit()).toBe(opened);
			expect(openClose.getVisuallyOpenedUnit()).toBe(opened);
		});
	});

	describe("getFullyOpenedUnit", () => {
		it("should get a fully opened unit", () => {
			const opened = {};
			openClose.fullyOpen(opened);
			expect(openClose.getFullyOpenedUnit()).toBe(opened);
		});

		it("should not get an only visually opened unit", () => {
			const visuallyOpened = {};
			openClose.visuallyOpen(visuallyOpened);
			expect(openClose.getFullyOpenedUnit()).toBeUndefined();
		});

		it("should get an only regularly opened unit", () => {
			const regularlyOpened = {};
			openClose.open(regularlyOpened);
			expect(openClose.getFullyOpenedUnit()).toBe(regularlyOpened);
		});

		it("should not get an only regularly opened unit when another unit is visually opened", () => {
			const regularlyOpened = {};
			const visuallyOpened = {};
			openClose.visuallyOpen(visuallyOpened);
			openClose.open(regularlyOpened);
			expect(openClose.getFullyOpenedUnit()).toBeUndefined();
		});
	});

	describe("isFullyOpened", () => {
		it("should return true for a fully opened unit", () => {
			const opened = {};
			openClose.fullyOpen(opened);
			expect(openClose.isFullyOpened(opened)).toBe(true);
		});

		it("should return false for an only visually opened unit", () => {
			const visuallyOpened = {};
			openClose.visuallyOpen(visuallyOpened);
			expect(openClose.isFullyOpened(visuallyOpened)).toBe(false);
		});

		it("should return true for an only regularly opened unit", () => {
			const regularlyOpened = {};
			openClose.open(regularlyOpened);
			expect(openClose.isFullyOpened(regularlyOpened)).toBe(true);
		});

		it("should return false when different units are regularly and visually opened", () => {
			const regularlyOpened = {};
			const visuallyOpened = {};
			openClose.visuallyOpen(visuallyOpened);
			openClose.open(regularlyOpened);
			expect(openClose.isFullyOpened(regularlyOpened)).toBe(false);
			expect(openClose.isFullyOpened(visuallyOpened)).toBe(false);
		});
	});
});