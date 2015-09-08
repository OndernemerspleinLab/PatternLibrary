import {getServices} from 'utils/ngServices';
import mock from 'jsTest/ngMock';
const inject = mock.inject;

const prepNgServices = () => {
	beforeEach(inject(getServices));
};

export default prepNgServices;