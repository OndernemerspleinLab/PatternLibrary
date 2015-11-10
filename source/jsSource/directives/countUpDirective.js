import DopApp from 'DopApp';
import ngServices from 'utils/ngServices';
import {countUp as templateUrl} from 'constants/templateUrls';

export const directiveName = "countUp";


const nextCount = (context) => {
	ngServices.$timeout(() => {
		context.currentCount += context.countStep;

		if (context.currentCount < context.countEnd) {
			nextCount(context);
		}
	}, context.countDeltaInMs);
};

class CountUp {
	constructor() {
		this.currentCount = Number(this.countStart) || 0;
		this.countStep = Number(this.countStep) || 1;
		this.countDeltaInMs = Number(this.countDeltaInMs) || 70;
		this.countEnd = Number(this.countEnd) || 1;
		nextCount(this);
	}
}

DopApp.directive(directiveName, () => ({
	templateUrl,
	controllerAs: "viewModel",
	controller: CountUp,
	scope: {},
	bindToController: {
		countStart: "@",
		countEnd: "@",
		countStep: "@",
		countDeltaInMs: "@",
	},
}));