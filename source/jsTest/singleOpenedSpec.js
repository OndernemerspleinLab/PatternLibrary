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
});