import Modernizr from 'modernizr';

let csstransforms = Modernizr.csstransforms;
export const enableAnimations = () => Modernizr.csstransforms = true;
export const disableAnimations = () => Modernizr.csstransforms = false;
export const resetAnimations = () => Modernizr.csstransforms = csstransforms;