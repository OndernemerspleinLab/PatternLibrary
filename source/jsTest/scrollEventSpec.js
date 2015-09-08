import {scrollEventRunner, registerScrollListener} from 'utils/scrollEvent';

import mock from 'jsTest/ngMock';
const {inject} = mock;

describe("scrollEvent", () => {
	describe("registerScrollListener", () => {
		it("should register a listener in the provided list", () => {
			const list = [];
			const listener = () => {};
			const listener2 = () => {};
			registerScrollListener(listener, list);
			registerScrollListener(listener2, list);

			expect(list).toEqual([listener, listener2]);
		});
		it("should return an unregister function", () => {
			const list = [];
			const listener = () => {};
			const listener2 = () => {};
			const unregister = registerScrollListener(listener, list);
			const unregister2 = registerScrollListener(listener2, list);
			expect(list).toEqual([listener, listener2]);

			unregister();
			expect(list).toEqual([listener2]);

			unregister2();
			expect(list).toEqual([]);
		});
	});

	describe("scrollEventRunner", () => {
		const $timeout = (func) => func();
		let $window;
		let $document;
		let scrollEvent = document.createEvent("Event");
		scrollEvent.initEvent("scroll");

		beforeEach(inject((_$document_) => {
			$window = document.createElement("div");
			$document = _$document_;
		}));

		it("should call callbacks when scroll event is triggered", () => {
			const listener = jasmine.createSpy("listener");
			const listener2 = jasmine.createSpy("listener2");
			scrollEventRunner($window, $document, $timeout, 0);
			registerScrollListener(listener);
			registerScrollListener(listener2);
			$window.scrollX = 10;
			$window.scrollY = 20;

			expect(listener).not.toHaveBeenCalled();
			expect(listener2).not.toHaveBeenCalled();

			$window.dispatchEvent(scrollEvent);


			expect(listener).toHaveBeenCalledWith({ top: 20, left: 10 });
			expect(listener2).toHaveBeenCalledWith({ top: 20, left: 10 });
		});
	});
});