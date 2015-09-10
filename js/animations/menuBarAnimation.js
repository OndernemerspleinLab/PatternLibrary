import Modernizr from 'modernizr';
import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {existing, partial} from 'utils/functional';
import {parseMatrix, getTranslateXFromMatrix} from 'utils/cssMatrix';
import {opened as classNameFilters, forceShowing as forceShowingClassName} from 'constants/classNames';
import {menuBar as animationTiming} from 'constants/animationTiming';
import {menuBar as selector} from 'constants/animationSelectors';
import getStyleProperty from 'utils/getStyleProperty';

const transformPropName = Modernizr.prefixed("transform");

export const getWidth = element => {
	if (existing(element)) {
		element.style.width = "";
		element.classList.add(forceShowingClassName);
		const width = getStyleProperty(element, "width");
		element.classList.remove(forceShowingClassName);

		return width;
	}
	return "0px";
};

export const getTranslateX = (element) => {
	const transformState = getStyleProperty(element, transformPropName);
	element.style[transformPropName] = "";

	const transformDestination = getStyleProperty(element, transformPropName);
	const translateX = getTranslateXFromMatrix(parseMatrix(transformDestination));

	element.style[transformPropName] = transformState;

	return translateX + "px";

};

export const animateTranslateX = ($element, translateX, done) => {
	Velocity($element, "stop");
	Velocity($element, {
		translateX,
	}, Object.assign({
		complete: done
	}, animationTiming));
};

export const animateOpen = ({$element, options: {openedElement}, done}) => {
	const width = getWidth(openedElement);
	animateTranslateX($element, width, done);
};

export const animateClose = ({$element, options: {openedElement}, done}) => {
	const translateX = getTranslateX($element[0]);
	animateTranslateX($element, translateX, () => {
		$element.css(transformPropName, "");
		done();
	});
};

export const instant = ({ $element, options: {openedElement}, done}) => {
	const width = getWidth(openedElement);
	Velocity.hook($element, "left", width);
	done();
};

const init = partial(animation, {
	module: DopApp,
	selector,

	classNameFilters,

	addClass: animateOpen,
	addClassInstant: instant,

	removeClass: animateClose,
	removeClassInstant: instant,

	animate: animateOpen,
	animateInstant: instant,
});

init();

export default init;