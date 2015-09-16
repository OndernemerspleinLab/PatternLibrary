import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {hidden as classNameFilters, forceShowing as forceShowingClassName} from 'constants/classNames';
import {existing, partial} from 'utils/functional';
import {height as animationTiming} from 'constants/animationTiming';
import {height as selector} from 'constants/animationSelectors';
import getStyleProperty from 'utils/getStyleProperty';
// import ngServices from 'utils/ngServices';

const cleanHeightStyle = (element) => element.style.height = "";

export const getHeight = element => {
	if (existing(element)) {
		const originalHeightStyle = element.style.height;
		cleanHeightStyle(element);
		element.classList.add(forceShowingClassName);
		const height = parseInt(getStyleProperty(element, "height"), 10);
		element.classList.remove(forceShowingClassName);
		element.style.height = originalHeightStyle;

		return height + "px";
	}
	return "0px";
};

const animateHeight = ($element, height, done) => {
	Velocity($element, "stop");
	Velocity($element, {
		height
	}, Object.assign({
		complete: done
	}, animationTiming));
};

export const animateOpen = ({$element, options: {openedElement}, done}) => {
	const element = $element[0];

	const height = getHeight(element);

	if (element.style.height === "") {
		const startHeight = "0px";
		Velocity.hook($element, "height", startHeight);
	}

	animateHeight($element, height, () => {
		cleanHeightStyle(element);
		done();
	});
};

export const animateClose = ({$element, options: {openedElement}, done}) => {
	const element = $element[0];

	if (element.style.height === "") {
		const startHeight = getHeight(element);
		Velocity.hook($element, "height", startHeight);
	}

	animateHeight($element, "0px", () => {
		cleanHeightStyle(element);
		done();
	});
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters: classNameFilters,

	addClass: animateClose,

	removeClass: animateOpen,
});

init();

export default init;