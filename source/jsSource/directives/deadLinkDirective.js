import DopApp from 'DopApp';
import createOpenClose from 'openClose/singleOpened';
import {deadLink as templateUrl} from 'constants/templateUrls';
import ngServices from 'utils/ngServices';

export const directiveName = "deadLink";



const checkIfDeadLink = (target) => {

	if(!target){return false;}
	const href = target.getAttribute("href");
	return href === '' || href === '#';
};

const getLinkFromParent = (target) => {
	if(!target){return null;}
	if(target.tagName.toLowerCase() === 'a'){
		return target;
	}
	else{
		const parent = target.parentElement;
		return getLinkFromParent(parent);
	}
};

const checkIfLinkInParent = (target) =>{
	let anchor = getLinkFromParent(target);
	return checkIfDeadLink(anchor);

};




class DeadLink {
	constructor() {
		Object.assign(this, createOpenClose());
		const closeDeadLink = () =>{
			this.close('deadLinkAlert');
		};
		const deadLinkCallback = (event) =>{
			let target = event.target;

			if(checkIfLinkInParent(target)){
				ngServices.$timeout(() => this.open('deadLinkAlert'));
				ngServices.$timeout(closeDeadLink,3000);
			}

		};
		document.addEventListener('click', deadLinkCallback);



	}
}

DopApp.directive(directiveName, () => ({
	templateUrl,
	controllerAs: "viewModel",
	controller: DeadLink,
	scope: {},
	bindToController: true,
}));