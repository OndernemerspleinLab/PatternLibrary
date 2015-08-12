import {
	negate, existing, unexisting,
	partial, partialByObject,
	isEmptyArray, arrayfy, reduceObject,
	mapObject, filterObject,
} from 'utils/functional';

describe("functional", () => {
	describe("negate", () => {
		it("should negate the result of a function", () => {
			expect(negate(() => true)()).toBe(false);
			expect(negate(() => false)()).toBe(true);
		});
	});
	describe("existing", () => {
		it("return false for null and undefined", () => {
			expect(existing(null)).toBe(false);
			expect(existing(undefined)).toBe(false);
		});

		it("return true for values other than null and undefined", () => {
			expect(existing("")).toBe(true);
			expect(existing(0)).toBe(true);
			expect(existing(false)).toBe(true);
			expect(existing(true)).toBe(true);
			expect(existing(NaN)).toBe(true);
			expect(existing([])).toBe(true);
			expect(existing({})).toBe(true);
		});
	});
	describe("unexisting", () => {
		it("return true for null and undefined", () => {
			expect(unexisting(null)).toBe(true);
			expect(unexisting(undefined)).toBe(true);
		});

		it("return false for values other than null and undefined", () => {
			expect(unexisting("")).toBe(false);
			expect(unexisting(0)).toBe(false);
			expect(unexisting(false)).toBe(false);
			expect(unexisting(true)).toBe(false);
			expect(unexisting(NaN)).toBe(false);
			expect(unexisting([])).toBe(false);
			expect(unexisting({})).toBe(false);
		});
	});

	describe("partial", () => {
		let func;

		beforeEach(() => {
			func = jasmine.createSpy('function');
		});

		it("should partially apply a function", () => {
			partial(func, 1, 2)(3, 4);

			expect(func).toHaveBeenCalledWith(1, 2, 3, 4);
		});

		it("should partially apply zero arguments", () => {
			partial(func)(3, 4);

			expect(func).toHaveBeenCalledWith(3, 4);
		});
	});

	describe("partialByObject", () => {
		let func;

		beforeEach(() => {
			func = jasmine.createSpy('function');
		});

		it("should partially apply an object to a function", () => {
			partialByObject(func, {a: 1, b: 2})({ b: 3, c: 4 });

			expect(func).toHaveBeenCalledWith({a: 1, b: 3, c: 4});
		});

		it("should partially apply an object to a function", () => {
			partialByObject(partialByObject(func, {a: 1, b: 2}), { b: 3, c: 4 })({c: 5, d: 6});

			expect(func).toHaveBeenCalledWith({a: 1, b: 3, c: 5, d: 6});
		});

		it("should not alter the boundObj and the argsObj", () => {
			const boundObj = {a: 1, b: 2};
			const argsObj = {b: 3, c: 4};

			partialByObject(func, boundObj)(argsObj);

			expect(boundObj).toEqual({a: 1, b: 2});
			expect(argsObj).toEqual({b: 3, c: 4});
		});
	});

	describe("isEmptyArray", () => {
		it("should descern between empty and filled arrays", () => {
			expect(isEmptyArray([])).toBe(true);
			expect(isEmptyArray([1, null])).toBe(false);
			expect(isEmptyArray([,])).toBe(false); // jshint ignore:line
			expect(isEmptyArray([undefined])).toBe(false);
		});
	});

	describe("arrayfy", () => {
		it("should create an empty array for unexisting values", () => {
			expect(arrayfy(undefined)).toEqual([]);
			expect(arrayfy(null)).toEqual([]);
		});
		it("should wrap an existing non array value in an array", () => {
			expect(arrayfy({})).toEqual([{}]);
			expect(arrayfy("string")).toEqual(["string"]);
			expect(arrayfy(0)).toEqual([0]);
			expect(arrayfy(NaN)).toEqual([NaN]);
		});
		it("should return an array value without altering it", () => {
			const arr= [1, 2, 3];
			expect(arrayfy(arr)).toBe(arr);
		});
	});

	describe("reduceObject", () => {
		it("should reduce an object", () => {
			const obj = {a: 1, b: 2, c: 3};
			expect(reduceObject(obj, (a, b) => a + b)).toBe(6);
			expect(reduceObject(obj, (a, b) => a + b, 4)).toBe(10);
		});
		it("should supply iterator with memo, val, key, obj", () => {
			const obj = {a: 1, b: 2, c: 3};

			reduceObject(obj, (memo, val, key, obj) => {
				expect(obj).toBe(obj);
				expect(obj[key]).toBe(val);
				expect(memo).toBe("memo");

				return memo;
			}, "memo");
		});
	});

	describe("mapObject", () => {
		it("should map an object", () => {
			const obj = {a: 1, b: 2, c: 3};
			expect(mapObject(obj, (a) => a*2)).toEqual({a: 2, b: 4, c: 6});
		});
		it("should supply iterator with val, key, obj", () => {
			const obj = {a: 1, b: 2, c: 3};

			mapObject(obj, (val, key, obj) => {
				expect(obj).toBe(obj);
				expect(obj[key]).toBe(val);
			});
		});
	});

	describe("filterObject", () => {
		it("should map an object", () => {
			const obj = {a: 1, b: 2, c: 3, d: 4};
			expect(filterObject(obj, (a) => a % 2 === 0)).toEqual({b: 2, d: 4});
		});
		it("should supply iterator with val, key, obj", () => {
			const obj = {a: 1, b: 2, c: 3};

			filterObject(obj, (val, key, obj) => {
				expect(obj).toBe(obj);
				expect(obj[key]).toBe(val);
			});
		});
	});
});