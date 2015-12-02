import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {scrollDocument as animationTiming} from 'constants/animationTiming';
import {documentElement as selector} from 'constants/animationSelectors';

const scrollTop = ({$element: $html, to: {scrollTop}, done}) => {
	Velocity($html, "stop");
	Velocity($html, "scroll", Object.assign({
		offset: scrollTop,
		complete: done
	}, animationTiming.duration));
};

const scrollToElement = ({$element: $html, to: {$element}, done}) => {
	Velocity($html, "stop");
	Velocity($element, "scroll", Object.assign({
		offset: -40,
		complete: done
	}, animationTiming.duration));
};

const scrollDoc = (config) => {
	const {to, done} = config;

	if ("scrollTop" in to) {
		return scrollTop(config);
	} else if ("$element" in to) {
		return scrollToElement(config);
	} else {
		done();
	}
};

animation({
	module: DopApp,
	selector: selector,
	animate: scrollDoc,
	animateInstant: scrollDoc,
});