import {stories, filterByAudience} from 'services/personalisationMockData';
import selectedAudienceStore from 'services/audienceSelector';

import DopApp from 'DopApp';

export const directiveName = "storiesView";

class Story {
	get story() {
		const filteredStories = filterByAudience(selectedAudienceStore.selectedAudience, stories);
		return filteredStories && filteredStories[0];
	}
	get imageStyle() {
		return {
			'background-image': `url('${this.story.img.url}')`,
		};
	}
}

DopApp.directive(directiveName, () => ({
	controllerAs: "viewModel",
	controller: Story,
	bindToController: true,
}));