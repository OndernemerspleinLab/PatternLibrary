import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {checkClassDecorator} from 'utils/animationUtils';

const duration = 400;
const delay = 400;
const hideClass= "ng-hide";

const animateOpacity = ($element, opacity, complete) => {
	Velocity($element, {
		opacity,
	}, {
		queue: false,
		duration,
		complete
	});
};


DopApp.animation('.ngAnimate-menuBar-content', () => ({
	beforeAddClass: checkClassDecorator(hideClass, ($element, className, done) => {
		Velocity($element, "stop");
		if ($element[0].style.opacity === "") {
			Velocity.hook($element, "z-index", 1);
			Velocity.hook($element, "opacity", 1);
		}
		done();
	}),

	addClass: checkClassDecorator(hideClass, ($element, className, done) => {
		animateOpacity($element, 0, done);
	}),

	beforeRemoveClass: checkClassDecorator(hideClass, ($element, className, done) => {
		Velocity($element, "stop");
		if ($element[0].style.opacity === "") {
			Velocity.hook($element, "z-index", 2);
			Velocity.hook($element, "opacity", 0);
		}
		done();
	}),

	removeClass: checkClassDecorator(hideClass, ($element, className, done) => {
		animateOpacity($element, 1, done);
	}),
}));