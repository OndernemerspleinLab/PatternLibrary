const getStyleProperty = (element, propName) => getComputedStyle(element).getPropertyValue(propName);

export default getStyleProperty;