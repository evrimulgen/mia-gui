(function() {
    'use strict';

  angular
	.module('miaApp')
	.directive('dvhResultCurveDirective', function (){
		return {
			restrict: 'E',
			scope: { dosevector: '=dosevector', volumevector: '=volumevector' },
			templateUrl: 'app/entities/dvh-curve-result/dvh-curve-result.linechart.directive.html',
			link: linkFunction
		};
	});

	function linkFunction(scope, element, attrs, ctrl) {

		/*console.log(scope.dosevector);
		console.log(scope.volumevector);*/

		 
	  
		

	};

})();