import DopApp from 'DopApp';
import Velocity from 'velocity-animate';

const duration = 800;
const ngAnimate = "is-animating";
const easing = [200, 20];

DopApp.animation('.ngAnimate-menuBar', ($timeout) => ({
	addClass: ($element, className, done, {openedElement}) => {
		$timeout(() => {
			// const width = options.openedElement.clientWidth;
			const width = getComputedStyle(openedElement).getPropertyValue("width");
			openedElement.classList.add(ngAnimate);
			console.log(width);
			done();
			Velocity($element, {
				translateX: width,
			}, {
				duration,
				easing,
				queue: false,
				complete: () => {
					openedElement.classList.remove(ngAnimate);
					done();
				}
			});
		});
	},

	removeClass: ($element, className, done, {closedElement}) => {
		closedElement.classList.add(ngAnimate);
		console.log(closedElement.className);
		$timeout(() => {
			Velocity($element, {
				translateX: "0px",
			}, {
				duration,
				easing,
				queue: false,
				complete: () => {
					closedElement.classList.remove(ngAnimate);
					done();
				}
			});
		});
	},

	animate: ($element, from, to, done, {openedElement}) => {
		console.log("animate");
		$timeout(() => {
			const width = getComputedStyle(openedElement).getPropertyValue("width");
			console.log(width);
			Velocity($element, {
				translateX: width,
			}, {
				duration,
				easing,
				queue: false,
				complete: () => {
					openedElement.classList.remove(ngAnimate);
					done();
				}
			});
		});
	},
}));