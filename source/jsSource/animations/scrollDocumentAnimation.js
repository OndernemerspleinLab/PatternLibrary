import DopApp from 'DopApp';
import Velocity from 'velocity-animate';
import {animation} from 'utils/ngAnimation';
import {scrollDocument as animationTiming} from 'constants/animationTiming';
import {documentElement as selector} from 'constants/animationSelectors';

animation({
	module: DopApp,
	selector: selector,
	animate: ({$element: $html, to, done}) => {
		Velocity($html, "stop");
		Velocity($html, "scroll", Object.assign({
			offset: to.scrollTop,
			complete: done
		}, animationTiming.duration));
	},
});