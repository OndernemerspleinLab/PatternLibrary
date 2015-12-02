import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {ngHidden as ngHiddenClass, hidden as hiddenClass} from 'constants/classNames';
import {partial} from 'utils/functional';
import {height as selector} from 'constants/animationSelectors';
import {height as animationTiming} from 'constants/animationTiming';

const classNameFilters = [ngHiddenClass, hiddenClass];

export const animateHeight = ($element, height, done) => {
	Velocity($element, "stop");
	Velocity($element, {
		height
	}, Object.assign({
		complete: () => {
			$element.css("height", "");
			done();
		},
	}, animationTiming));
};

export const beforeAnimateOpen = ({$element, options, done}) => {
	const initialHeight = $element.css("height");
	$element.css("height", "");
	const {height: targetHeight} = $element[0].getBoundingClientRect();
	options.targetHeight = targetHeight;

	if (initialHeight) {
		Velocity.hook($element, "height", initialHeight);
	} else {
		Velocity.hook($element, "height", 0);
	}
	done();
};

export const animateOpen = ({$element, options: { targetHeight }, done}) => {
	animateHeight($element, targetHeight, done);
};

export const beforeAnimateClose = ({$element, done}) => {
	done();
};

export const animateClose = ({$element, done}) => {
	animateHeight($element, 0, done);
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters: classNameFilters,

	// beforeAddClass: beforeAnimateClose,
	addClass: animateClose,

	beforeRemoveClass: beforeAnimateOpen,
	removeClass: animateOpen,

});

init();

export default init;