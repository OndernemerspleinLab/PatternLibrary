import {
	negate, existing, unexisting,
	falsy, truthy,
	partial, partialByObject, includes,
	isFilledArray, isEmptyArray, debounce,
	arrayfy, spliceItem, defaults, forEachObject,
	reduceObject, mapObject, filterObject,
	aliasMapProperty, toObjectArguments
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
	describe("falsy", () => {
		it("return true for false, null and undefined", () => {
			expect(falsy(null)).toBe(true);
			expect(falsy(undefined)).toBe(true);
			expect(falsy(false)).toBe(true);
		});

		it("return false for values other than false, null and undefined", () => {
			expect(falsy("")).toBe(false);
			expect(falsy(0)).toBe(false);
			expect(falsy(true)).toBe(false);
			expect(falsy(NaN)).toBe(false);
			expect(falsy([])).toBe(false);
			expect(falsy({})).toBe(false);
		});
	});
	describe("truthy", () => {
		it("return false for false, null and undefined", () => {
			expect(truthy(null)).toBe(false);
			expect(truthy(undefined)).toBe(false);
			expect(truthy(false)).toBe(false);
		});

		it("return true for values other than false, null and undefined", () => {
			expect(truthy("")).toBe(true);
			expect(truthy(0)).toBe(true);
			expect(truthy(true)).toBe(true);
			expect(truthy(NaN)).toBe(true);
			expect(truthy([])).toBe(true);
			expect(truthy({})).toBe(true);
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

			expect(func).toHaveBeenCalledWith({a: 1, b: 2, c: 4});
		});

		it("should partially apply an object to a function", () => {
			partialByObject(partialByObject(func, {a: 1, b: 2}), { b: 3, c: 4 })({c: 5, d: 6});

			expect(func).toHaveBeenCalledWith({a: 1, b: 2, c: 4, d: 6});
		});

		it("should not alter the boundObj and the argsObj", () => {
			const boundObj = {a: 1, b: 2};
			const argsObj = {b: 3, c: 4};

			partialByObject(func, boundObj)(argsObj);

			expect(boundObj).toEqual({a: 1, b: 2});
			expect(argsObj).toEqual({b: 3, c: 4});
		});
	});

	describe("debounce", () => {
		it("should ", () => {
			const timeout = 100;
			const setTimeoutSpy = spyOn(window, "setTimeout");
			const clearTimeoutSpy = spyOn(window, "clearTimeout");
			const debounceCallbackSpy = jasmine.createSpy("debounceCallback");

			const debounced = debounce(debounceCallbackSpy, timeout);

			debounced(1, 2, 3);
			expect(clearTimeoutSpy).toHaveBeenCalled();
			expect(setTimeoutSpy).toHaveBeenCalledWith(jasmine.any(Function), timeout);
			const firstCallback = setTimeoutSpy.calls.mostRecent().args[0];
			firstCallback();
			expect(debounceCallbackSpy).toHaveBeenCalledWith(1, 2, 3);

			debounced(4, 5, 6);
			expect(clearTimeoutSpy).toHaveBeenCalled();
			expect(setTimeoutSpy).toHaveBeenCalledWith(jasmine.any(Function), timeout);
			const secondCallback = setTimeoutSpy.calls.mostRecent().args[0];
			secondCallback();
			expect(debounceCallbackSpy).toHaveBeenCalledWith(4, 5, 6);

		});
	});

	describe("includes", () => {
		it("report if a value is in an array", () => {
			const arr = [0, 1, 2, 3];
			expect(includes(arr, 2)).toBe(true);
			expect(includes(arr, 4)).toBe(false);
			expect(includes(arr, "2")).toBe(false);
			expect(includes(arr, undefined)).toBe(false);
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

	describe("isFilledArray", () => {
		it("should descern between empty and filled arrays", () => {
			expect(isFilledArray([])).toBe(false);
			expect(isFilledArray([1, null])).toBe(true);
			expect(isFilledArray([,])).toBe(true); // jshint ignore:line
			expect(isFilledArray([undefined])).toBe(true);
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

	describe("spliceItem", () => {
		it("should not alter an array which does not contain the item", () => {
			const arr = [1, 2, 3];
			spliceItem(arr, 4);
			expect(arr).toEqual([1, 2, 3]);
		});
		it("should remove an item from an array", () => {
			const arr = [1, 2, 3];
			spliceItem(arr, 2);
			expect(arr).toEqual([1, 3]);
		});
	});

	describe("defaults", () => {
		it("should return a new object with the defaults filled in", () => {
			const result = defaults({a: 3}, {a: 2, b: 2}, { a: 1, b: 1, c: 1 });
			expect(result).toEqual({a: 3, b: 2, c: 1});
		});
	});

	describe("forEachObject", () => {
		it("should iterate over an object", () => {
			const iterator = jasmine.createSpy("forEachObject iterator");
			const obj = { key1: 'val1', key2: 'val2', key3: 'val3' };

			forEachObject(obj, iterator);

			const callsArgs = iterator.calls.allArgs();

			expect(callsArgs[0]).toEqual(['val1', "key1", obj]);
			expect(callsArgs[1]).toEqual(['val2', "key2", obj]);
			expect(callsArgs[2]).toEqual(['val3', "key3", obj]);
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

	describe("aliasMapProperty", () => {
		it("should make an alias for a map property", () => {
			const map = new Map();

			map.set("original", 1);
			aliasMapProperty(map, "original", "alias");

			expect(map.get("alias")).toBe(1);
		});
	});

	describe("toObjectArguments", () => {
		let callbackSpy = jasmine.createSpy("callback");

		it("should call the callback with the argMames combined with the original args in an object", () => {
			const argNames = ["a", "b", "c"];
			const objectCallback = toObjectArguments(callbackSpy, argNames);
			objectCallback(1, 2, 3);

			const calledArgs = callbackSpy.calls.mostRecent().args;
			expect(calledArgs.length).toBe(1);
			expect(calledArgs[0]).toEqual({ a: 1, b: 2, c: 3 });
		});

		it("should call the callback with an empty object when argNames is empty", () => {
			const argNames = [];
			const objectCallback = toObjectArguments(callbackSpy, argNames);
			objectCallback(1, 2, 3);

			const calledArgs = callbackSpy.calls.mostRecent().args;
			expect(calledArgs.length).toBe(1);
			expect(calledArgs[0]).toEqual({});
		});
	});
});