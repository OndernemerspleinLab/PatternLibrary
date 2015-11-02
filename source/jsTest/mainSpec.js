// Start running specs
import 'directives/all';
import prepNgServices from 'jsTest/prepNgServices';
prepNgServices();
import 'jsTest/DopAppSpec';
import 'jsTest/ngServicesSpec';
import 'jsTest/functionalSpec';
import 'jsTest/singleOpenedSpec';
import 'jsTest/multipleOpenedSpec';
import 'jsTest/animationUtilsSpec';
import 'jsTest/ngAnimationSpec';
import 'jsTest/scrollEventSpec';
import 'jsTest/cssMatrixSpec';

// animations
// import 'jsTest/seeThroughScrollAnimationSpec';
// import 'jsTest/seeThroughScrollAnimationFunctionsSpec';
import 'jsTest/menuBarAnimationSpec';
import 'jsTest/menuBarSideContentAnimationSpec';

// controllers
// import 'jsTest/seeThroughScrollControllerSpec';
import 'jsTest/menuBarControllerSpec';

// directives
import 'jsTest/menuBarDirectiveSpec';
// import 'jsTest/seeThroughScrollDirectiveSpec';
// import 'jsTest/seeThroughScrollContentDirectiveSpec';
// import 'jsTest/mainMenuDirectiveSpec';
