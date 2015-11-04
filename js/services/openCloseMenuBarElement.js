import * as classNames from 'constants/classNames';
import ngServices from 'utils/ngServices';

export const openMenuBar = ($menuBar, {element: openedElement}) => {
	return ngServices.$animate.addClass($menuBar, classNames.opened, {
		openedElement,
	});
};

export const resizeMenuBar = ($menuBar, {element: openedElement}) => {
	return ngServices.$animate.animate($menuBar, null, { resize: true }, null, {
		openedElement,
	});
};

export const closeMenuBar = ($menuBar) => {
	return ngServices.$animate.removeClass($menuBar, classNames.opened);
};

export const openOrResizeMenuBar = ($menuBar, openedUnitInfo, menuBarOpened) => {
	if (menuBarOpened) {
		return resizeMenuBar($menuBar, openedUnitInfo);
	} else {
		return openMenuBar($menuBar, openedUnitInfo);
	}
};

const isSideUnit = ({unitType}) => unitType === "side";

export const openOrCloseMenuBarElement = ($menuBar, {canBeVisuallyOpened}, openedUnitInfo, menuBarOpened) => {
	if (openedUnitInfo && isSideUnit(openedUnitInfo) && canBeVisuallyOpened("side")) {
		return {
			animationPromise: openOrResizeMenuBar($menuBar, openedUnitInfo, menuBarOpened),
			menuBarOpened: true,
		};
	} else {
		return {
			animationPromise: closeMenuBar($menuBar),
			menuBarOpened: false,
		};
	}
};