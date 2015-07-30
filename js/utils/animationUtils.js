export const checkClassDecorator = (requiredClassName, callback) => {
	return ($element, className, ...args) => {
		if (className === requiredClassName) {
			return callback($element, className, ...args);
		}
	};
};