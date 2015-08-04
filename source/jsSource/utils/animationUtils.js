import Modernizr from 'utils/modernizr';

export const checkClassDecorator = (requiredClassName, callback) => {
	return ($element, className, ...args) => {
		if (className === requiredClassName) {
			return callback($element, className, ...args);
		}
	};
};

export const canAnimate = () => {
	return Modernizr.csstransforms;
};

export const canAnimateDecorator = (animationCallback, noAnimationCallback) => {
	const callback = canAnimate() ? animationCallback : noAnimationCallback;
	return callback;
};