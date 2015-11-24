import {audiences} from 'services/personalisationMockData';

let _selectedAudience;

const store = {
	get selectedAudience() {
		return _selectedAudience;
	},
	set selectedAudience(audience) {
		if (audiences.find(({name}) => name === audience)) {
			_selectedAudience = audience;
		}
	},
};

store.selectedAudience = audiences.find(({defaultSelection}) => defaultSelection).name;

export default store;