import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {hidden as classNameFilters, forceShowing as forceShowingClassName} from 'constants/classNames';
import {existing, partial} from 'utils/functional';
import {height as animationTiming} from 'constants/animationTiming';
import {height as selector} from 'constants/animationSelectors';
import getStyleProperty from 'utils/getStyleProperty';
import ngServices from 'utils/ngServices';

const cleanHeightStyle = (element) => element.style.height = "";

export const getHeight = element => {
	if (existing(element)) {
		const originalHeightStyle = element.style.height;
		cleanHeightStyle(element);
		element.classList.add(forceShowingClassName);
		const height = parseInt(getStyleProperty(element, "height"), 10);
		element.classList.remove(forceShowingClassName);
		element.style.height = originalHeightStyle;

		return height;
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

const getOpenCloseName = (element) => element.dataset.openCloseName;

const getViewModel = $element => {
	const scope = $element.scope();
	return scope && scope.viewModel;
};

const setActuallyOpenedState = (element, state = {}) => {
	const openCloseName = getOpenCloseName(element);
	if (openCloseName) {
		ngServices.$timeout(() => state.actuallyOpened = openCloseName);
	}
};

const resetActuallyOpenedState = (element, state = {}) => {
	if (state.actuallyOpened && state.actuallyOpened === getOpenCloseName(element)) {
		ngServices.$timeout(() => state.actuallyOpened = undefined);
	}
};

const setActuallyOpened = ($element) => {
	const viewModel = getViewModel($element);
	setActuallyOpenedState($element[0], viewModel);
};
const resetActuallyOpened = ($element) => {
	const viewModel = getViewModel($element);
	resetActuallyOpenedState($element[0], viewModel);
};

export const animateOpen = ({$element, options: {openedElement}, done}) => {
	const element = $element[0];

	const height = getHeight(element);

	if (element.style.height === "") {
		const startHeight = "0px";
		Velocity.hook($element, "height", startHeight);
	}

	setActuallyOpened($element);
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

	animateHeight($element, 0, () => {
		cleanHeightStyle(element);
		resetActuallyOpened($element);
		done();
	});
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters,

	addClass: animateClose,

	removeClass: animateOpen,
});

init();

export default init;