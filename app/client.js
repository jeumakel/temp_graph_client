'use strict';

import moment from 'moment';

class App {
	constructor() {
	// I create a WebSocket . Put the IP of your Raspberry Pi! 
    	this.socket = io('http://raspberrypi3:8000');
    	// I create a new object 'Chart'
    	this.chart = new Highcharts.Chart({
        	chart: {
        		renderTo: 'chart', 
        		defaultSeriesType: 'spline',
        		events: {
           			load: this.loadSocketEvents.bind(this)
            	}
        	},
        	rangeSelector : {
            	selected : 100
        	},
        	title: {
            	text: 'Temperature measured by Raspberry Pi'
	        },
    	    xAxis: {
        	    type: 'datetime',
            	tickPixelInterval: 150,
            	maxZoom: 20 * 1000
        	},
        	yAxis: {
            	minPadding: 0.2,
            	maxPadding: 0.2,
	            title: {
    	            text: 'Temperature ºC',
        	        margin: 80
            	}
       		},
        	series: [
				{
            		name: 'CpuTemperature',
            		data: []
        		},
				{
					name: 'IndoorTemperature',
					data: []
				}
			]
    	});
	}
	loadSocketEvents() {
		this.onCpuTempSocketEvent();
		this.onInteriorTempSocketEvent();
	}
	onCpuTempSocketEvent() {
		let self = this;
		this.socket.on('cpuTemperatureUpdate', function (time, data) {
			var series = self.chart.series[0];
			series.addPoint([moment(time).utc().add(2, 'h').valueOf(), data]);
		});
	}
	onInteriorTempSocketEvent() {
		var self = this;
		this.socket.on('sensorTemperatureUpdate', function (result) {
			var i = 0,
				timestamp,
				date,
		    series = self.chart.series[1];
	    	for (i; i < result.length; i += 1) {
				timestamp = parseInt(result[i]['_id'].substr(0,8), 16)*1000
				date = moment(timestamp).utc().add(2, 'h').valueOf();
				series.addPoint([date, result[i]['temperature']], false);
			}
			self.chart.redraw();
			//console.log('sensor temp:' +  result);
		});
	}
	cpuButtonClicked() {
		this.socket.emit('cpuTempQuery');
	}
	sensorButtonClicked() {
		this.socket.emit('sensorTempQuery');
	}
};

export default App;
