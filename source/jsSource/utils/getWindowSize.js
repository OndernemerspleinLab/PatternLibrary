import ngServices from 'utils/ngServices';


const getWindowSize = () => {
	const doc = ngServices.$document[0];
	const body = doc.body;
	const rulerElement = doc.createElement(rulerElement);
	Object.assign(rulerElement.style, {
		zIndex: -1000,
		position: "fixed",
		left: 0,
		top: 0,
		bottom: 0,
		right: 0,
		width: "auto",
		height: "auto",
		margin: 0,
		padding: 0,
		visibility: "hidden",
		pointerEvents: "none"
	});
	body.appendChild(rulerElement);
	const {width, height} = rulerElement.getBoundingClientRect();
	const windowSize = {width, height};
	body.removeChild(rulerElement);
	return windowSize;
};

export default getWindowSize;