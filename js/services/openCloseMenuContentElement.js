import * as classNames from 'constants/classNames';
import ngServices from 'utils/ngServices';

export const openUnitContentElement = ({visuallyOpen}, unitInfo) => {
	return ngServices.$animate.removeClass(unitInfo.element, classNames.hidden);
};

export const closeUnitContentElement = ({visuallyClose}, unitInfo) => {
	return ngServices.$animate.addClass(unitInfo.element, classNames.hidden);
};
export const closeMultipleUnitContentElements = (openClose, unitInfos) => {
	return ngServices.$q.all(unitInfos.map((unitInfo) => closeUnitContentElement(openClose, unitInfo)));
};