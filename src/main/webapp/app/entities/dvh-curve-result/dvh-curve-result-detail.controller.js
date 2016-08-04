(function() {
    'use strict';

    angular
        .module('miaApp')
        .controller('DvhCurveResultDetailController', DvhCurveResultDetailController);

    DvhCurveResultDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'DvhCurveResult'];

    function DvhCurveResultDetailController($scope, $rootScope, $stateParams, entity, DvhCurveResult) {
        var vm = this;
        vm.dvhCurveResult = {};
        vm.dvhCurveResult.dosevector = [];
        vm.dvhCurveResult.volumevector = [];
        vm.dvhCurveResult = entity;
        
        var unsubscribe = $rootScope.$on('miaApp:dvhCurveResultUpdate', function(event, result) {
            vm.dvhCurveResult = result;
        });
        $scope.$on('$destroy', unsubscribe);

        
        
        $scope.options = {
        		chart: {
        			type: 'lineChart',
        			height: 450,
        			margin : {
        				top: 20,
        				right: 20,
        				bottom: 40,
        				left: 55
        			},
        			x: function(d){ return d.x; },
        			y: function(d){ return d.y; },
        			useInteractiveGuideline: true,
        			dispatch: {
        				stateChange: function(e){ console.log("stateChange"); },
        				changeState: function(e){ console.log("changeState"); },
        				tooltipShow: function(e){ console.log("tooltipShow"); },
        				tooltipHide: function(e){ console.log("tooltipHide"); }
        			},
        			xAxis: {
        				axisLabel: 'Dose (Gray)'
        			},
        			yAxis: {
        				axisLabel: 'Volume (%)',
        				tickFormat: function(d){
        					return d3.format('.02f')(d);
        				},
        				axisLabelDistance: -10
        			},
        			callback: function(chart){
        				console.log("!!! lineChart callback !!!");
        			}
        		},
        		title: {
        			enable: false,
        			text: 'DVH Curve'
        		},
        		subtitle: {
        			enable: false,
        			text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
        			css: {
        				'text-align': 'center',
        				'margin': '10px 13px 0px 7px'
        			}
        		},
        		caption: {
        			enable: false,
        			html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
        			css: {
        				'text-align': 'justify',
        				'margin': '10px 13px 0px 7px'
        			}
        		}
        };



  
        $scope.data = chartData();

        function chartData() {
        	
        	var structure1 = [];
        	var dosearray = angular.fromJson(vm.dvhCurveResult.dosevector);
        	var volumearray = angular.fromJson(vm.dvhCurveResult.volumevector);
        	
        	if(volumearray[0]){
        	var vMax = volumearray[0];
        	}
        	
        	for(var i=0; i<dosearray.length; i++){	
        		var volume = (volumearray[i] / vMax) * 100; 		
        		structure1.push({ 
        			x: dosearray[i], 
        			y: volume 
        		});
        	};
        	

        	//Line chart data should be sent as an array of series objects.
        	return [
        	        {
        	        	values: structure1,     //values - represents the array of {x,y} data points
        	        	key: vm.dvhCurveResult.volumeOfInterest, 			//key  - the name of the series.
        	        	color: '#ff7f0e'  		//color - optional: choose your own line color.
        	        }
        	];
        };
                    
        
    }
})();
