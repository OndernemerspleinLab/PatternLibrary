import selectedAudienceStore from 'services/audienceSelector';
import DopApp from 'DopApp';

export const directiveName = "audienceSelector";

class AudienceSelector {
	constructor() {
		this.selectedAudienceStore = selectedAudienceStore;
	}
}

DopApp.directive(directiveName, () => ({
	controllerAs: "viewModel",
	controller: AudienceSelector,
	scope: true,
	bindToController: true,
}));