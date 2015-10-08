import ngServices, {getServices, serviceNames} from 'utils/ngServices';
import mock from 'jsTest/ngMock';
const inject = mock.inject;

const prepNgServices = () => {
	let getServicesFiltered = (...services) => {
		const index = serviceNames.indexOf("$timeout");
		services[index] = func => func();
		getServices(...services);
	};

	getServicesFiltered.$inject = serviceNames;
	beforeEach(inject(getServicesFiltered));
	console.log("SERVICES");
};
export default prepNgServices;