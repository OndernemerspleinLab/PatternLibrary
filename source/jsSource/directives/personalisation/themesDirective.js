import {themes, filterByAudience, filterWithoutAudience} from 'services/personalisationMockData';
import {themesView as templateUrl} from 'constants/templateUrls';
import selectedAudienceStore from 'services/audienceSelector';

import DopApp from 'DopApp';

export const directiveName = "themesView";

class Themes {
	get emphasizedThemes() {
		return filterByAudience(selectedAudienceStore.selectedAudience, themes);
	}
	get deemphasizedThemes() {
		return filterWithoutAudience(selectedAudienceStore.selectedAudience, themes);
	}
}

DopApp.directive(directiveName, () => ({
	templateUrl,
	controllerAs: "viewModel",
	controller: Themes,
	scope: {},
	bindToController: true,
}));