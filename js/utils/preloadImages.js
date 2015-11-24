export const preloadImage = (url) => {
	const img = document.createElement('img');
	img.src = url;
};

export const preloadImages = (urls) => {
	urls.forEach(preloadImage);
};