import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {checkClassDecorator, canAnimateDecorator} from 'utils/animationUtils';

const duration = 800;
const easing = [200, 20];
const openedClass = "is-opened";

const getWidth = element => getComputedStyle(element).getPropertyValue("width");

const animateTranslateX = ($element, translateX, complete) => {
	Velocity($element, "stop");
	Velocity($element, {
		translateX,
	}, {
		duration,
		easing,
		complete
	});
};

DopApp.animation('.ngAnimate-menuBar', () => ({
	addClass: checkClassDecorator(openedClass, canAnimateDecorator(($element, className, done, {openedElement}) => {
		const width = getWidth(openedElement);
		animateTranslateX($element, width, done);
	}, ($element, className, done, {openedElement}) => {
		const width = getWidth(openedElement);
		Velocity.hook($element, "left", width);
		done();
	})),

	removeClass: checkClassDecorator(openedClass, canAnimateDecorator(($element, className, done) => {
		const width = "0px";
		animateTranslateX($element, width, done);
	}, ($element, className, done) => {
		const width = "0px";
		Velocity.hook($element, "left", width);
		done();
	})),

	animate: canAnimateDecorator(($element, from, to, done, {openedElement}) => {
		const width = getWidth(openedElement);
		console.log(width, openedElement.id);
		animateTranslateX($element, width, done);

	}, ($element, from, to, done, {openedElement}) => {
		const width = getWidth(openedElement);
		Velocity.hook($element, "left", width);
		done();
	}),
}));