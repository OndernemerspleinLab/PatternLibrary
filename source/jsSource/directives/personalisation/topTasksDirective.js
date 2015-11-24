import {topTasks, filterByAudience} from 'services/personalisationMockData';
import {topTasks as templateUrl} from 'constants/templateUrls';
import selectedAudienceStore from 'services/audienceSelector';

import DopApp from 'DopApp';

export const directiveName = "topTasks";

class TopTasks {
	get topTasks() {
		return filterByAudience(selectedAudienceStore.selectedAudience, topTasks);
	}
}

DopApp.directive(directiveName, () => ({
	templateUrl,
	controllerAs: "viewModel",
	controller: TopTasks,
	scope: {},
	bindToController: true,
}));