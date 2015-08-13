import createOpenClose from 'openClose/multipleOpened';

describe("multipleOpened", () => {
	let openClose;

	beforeEach(() => openClose = createOpenClose());

	describe("isOpened", () => {
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

	describe("open", () => {
		it("should open a unit without closing others", () => {
			const unit = {};
			const unit2 = {};
			openClose.open(unit);
			openClose.open(unit2);
			expect(openClose.isOpened(unit)).toBe(true);
			expect(openClose.isOpened(unit2)).toBe(true);
		});
	});

	describe("close", () => {
		it("should close a unit", () => {
			const unit = {};
			const unit2 = {};
			openClose.open(unit);
			openClose.open(unit2);
			expect(openClose.isOpened(unit)).toBe(true);
			openClose.close(unit);
			expect(openClose.isOpened(unit)).toBe(false);
			expect(openClose.isOpened(unit2)).toBe(true);
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
	});
});