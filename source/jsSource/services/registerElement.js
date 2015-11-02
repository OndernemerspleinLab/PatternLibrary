export const createRegistery = () => {
	const registery = [];
	const register = (data) => registery.push(data);

	return {registery, register};
};