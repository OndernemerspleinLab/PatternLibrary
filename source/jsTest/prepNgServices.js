import ngServices, {getServices} from 'utils/ngServices';
import mock from 'jsTest/ngMock';
const inject = mock.inject;

const prepNgServices = () => {
	beforeEach(inject(getServices));

	beforeEach(() => { ngServices.$timeout = func => func(); });
};

export default prepNgServices;