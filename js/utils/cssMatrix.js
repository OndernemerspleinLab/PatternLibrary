const regex = /matrix(3d)?\((.*)\)/;
const defaultReturn = { values: [], is3d: false };

export const parseMatrix = (cssMatrixString) => {

	if (!cssMatrixString) {
		return defaultReturn;
	}

	const match = cssMatrixString.match(regex);

	if (!match) {
		return defaultReturn;
	}

	const is3d = match[1] === "3d";
	const valueString = match[2];

	const values = valueString.split(",").map(Number);

	return { values, is3d };
};

export const getTranslateXFromMatrix = (matrix) => {
	return (matrix.is3d ? matrix.values[12] : matrix.values[4]) || 0;
};