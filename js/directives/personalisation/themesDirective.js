import selectedAudienceStore from 'services/audienceSelector';

import DopApp from 'DopApp';

export const directiveName = "themesView";

class Themes {
	get selectedAudience () {
		return selectedAudienceStore.selectedAudience;
	}
}

DopApp.directive(directiveName, () => ({
	controllerAs: "viewModel",
	controller: Themes,
	scope: true,
	bindToController: true,
}));