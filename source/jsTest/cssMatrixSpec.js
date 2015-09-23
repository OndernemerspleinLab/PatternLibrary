import {parseMatrix, getTranslateXFromMatrix} from 'utils/cssMatrix';

describe("cssMatrix", () => {
	describe("parseMatrix", () => {
		it("should parse a valid 2d matrix", () => {
			const matrix = "matrix(1, 0, 0, 1, 600.5, 0)";

			const parsed = parseMatrix(matrix);

			expect(parsed).toEqual({ values: [1, 0, 0, 1, 600.5, 0], is3d: false });
		});

		it("should parse a valid 3d matrix", () => {
			const matrix = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 400.5, 0, 2, 1)";

			const parsed = parseMatrix(matrix);

			expect(parsed).toEqual({ values: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 400.5, 0, 2, 1], is3d: true });
		});

		it("should return an empty matrix object for an invalid matrix", () => {
			const invalidMatrix = "matrix(1, 0, 0, 1, 600.5, 0";

			const parsed = parseMatrix(invalidMatrix);

			expect(parsed).toEqual({ values: [], is3d: false });
		});

		it("should return an empty matrix object for a missing matrix", () => {

			const parsed = parseMatrix();

			expect(parsed).toEqual({ values: [], is3d: false });
		});
	});

	describe("getTranslateXFromMatrix", () => {
		it("should get translateX from a 2d matrix", () => {
			const matrix = "matrix(1, 0, 0, 1, 600.5, 0)";

			const parsed = parseMatrix(matrix);

			expect(getTranslateXFromMatrix(parsed)).toBe(600.5);
		});
		it("should get translateX from a 3d matrix", () => {
			const matrix = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 400.5, 0, 2, 1)";

			const parsed = parseMatrix(matrix);
			expect(getTranslateXFromMatrix(parsed)).toBe(400.5);
		});
	});
});