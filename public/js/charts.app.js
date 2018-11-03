var chartsApp = new Vue ({

  el: "#chartData",

  data: {

      charts: []
  },

  methods: {

    fetchChart : function (sId){

      fetch('api/sensorKpi.php?sensorId='+sId)
      .then( function(response) {return response.json()} )
      .then( json => {
        chartsApp.charts = json;
        chartsApp.formatChartTime();
        chartsApp.outputChart();
        chartsApp.heatRateChart();
        chartsApp.compressorEfficiencyChart();
        chartsApp.availabilityChart();
        chartsApp.reliabilityChart();
        chartsApp.firedHourChart();
        chartsApp.trips();
      } )

      .catch(function(err){
        console.log('SENSOR FETCH ERROR:');
        console.log(err);
        }) ;//end of catch
      },//end of fetchChart


    formatChartTime: function (){
      this.charts.forEach(
      (entry, index, arr) => {
        entry.dateCollected = Date.parse(entry.dataCollectedDate);
        entry.output = Number(entry.output);
        entry.heatRate = Number(entry.heatRate);
        entry.compressorEfficiency = Number(entry.compressorEfficiency);
        entry.availability = Number(entry.availability);
        entry.reliability = Number(entry.reliability);
        entry.firedHours = Number(entry.firedHours);
        entry.trips = Number(entry.trips);
        entry.starts = Number(entry.starts);
      }
    )

  }, //formatChartTime ends

    outputChart: function() {
      Highcharts.chart('outputChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Output'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Output'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, "#63E2C6"],
                            [1, "#006440"]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Output',
                data: chartsApp.charts.map( entry=>
                  [entry.dateCollected, entry.output]
                )
            }]
        });

    },//outputChart ends

    heatRateChart: function(){
        Highcharts.chart('heatRateChart', {
          chart: {
              type: 'scatter',
              zoomType: 'xy'
          },
          title: {
              text: 'Heat Rate'
          },
          xAxis: {
              title: {
                  enabled: true
              },
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true
          },
          yAxis: {
              title: {
                  text: 'Heat Rate'
              }
          },
          legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'top',
              x: 100,
              y: 70,
              floating: true,
              backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
              borderWidth: 1
          },
          plotOptions: {
              scatter: {
                  marker: {
                      radius: 5,
                      states: {
                          hover: {
                              enabled: true,
                              lineColor: 'rgb(100,100,100)'
                          }
                      }
                  },
                  states: {
                      hover: {
                          marker: {
                              enabled: false
                          }
                      }
                  }
              }
          },
          series: [{
              name: 'Heat Rate',
              color: 'rgba(223, 83, 83, .5)',
              data: chartsApp.charts.map( entry=>
                [entry.output, entry.heatRate]
              )
          }]
      });

    },//heatRateChart ends

    compressorEfficiencyChart: function() {
      Highcharts.chart('compChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Compressor Efficiency'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Compressor Efficiency'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, '#801515'],
                            [1, '#FAAAA']
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Compressor Efficiency',
                data: chartsApp.charts.map( entry=>
                  [entry.dateCollected, entry.compressorEfficiency]
                )
            }]
        });
    },

    availabilityChart: function() {
      Highcharts.chart('avbChart', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Availability'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Availability'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, '#c06c84'],
                            [1, '#f67280']
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Availability',
                data: chartsApp.charts.map( entry=>
                  [entry.dateCollected, entry.availability]
                )
            }]
        });
    },

    reliabilityChart: function() {

      Highcharts.chart('reliabilityChart', {

            chart: {

                zoomType: 'x'

            },

            title: {

                text: 'Reliability'

            },

            xAxis: {

                type: 'datetime'

            },

            yAxis: {

                title: {

                    text: 'Reliability'

                }

            },
           legend: {

                enabled: false

            },

            plotOptions: {

                area: {

                    fillColor: {

                        linearGradient: {

                            x1: 0,

                            y1: 0,

                            x2: 0,

                            y2: 1

                        },

                        stops: [

                            [0,'#7284A8'],

                            [1, '#A9B3CE']

                        ]

                    },
                     marker: {

                        radius: 2

                    },

                    lineWidth: 1,

                    states: {

                        hover: {

                            lineWidth: 1

                        }

                    },

                    threshold: null

                }

            },
            series: [{

                type: 'area',

                name: 'Reliability',

                data: chartsApp.charts.map( entry=>

                  [entry.dateCollected, entry.reliability]

                )

            }]

        });

    },

    firedHourChart: function() {

      Highcharts.chart('firedHours', {

            chart: {

                zoomType: 'x'

            },

            title: {

                text: 'Fired Hours'

            },

            xAxis: {

                type: 'datetime'

            },

            yAxis: {

                title: {

                    text: 'Fired Hours'

                }

            },

            legend: {

                enabled: false

            },

            plotOptions: {

                area: {

                    fillColor: {

                        linearGradient: {

                            x1: 0,

                            y1: 0,

                            x2: 0,

                            y2: 1

                        },

                        stops: [

                            [0, '#FAFF70'],

                            [1, '#E3C16F']

                        ]

                    },

                    marker: {

                        radius: 1.5

                    },

                    lineWidth: 1,

                    states: {

                        hover: {

                            lineWidth: 1

                        }

                    },

                    threshold: null

                }

            },

            series: [{

                type: 'area',

                name: 'Fired Hours',

                data: chartsApp.charts.map( entry=>

                  [entry.dateCollected, entry.firedHours]

                )

            }]

        });

    },

    trips: function() {
      Highcharts.chart('trips', {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Trips'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Trips'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
              column: {
               pointPadding: 0.2,
               borderWidth: 0
           }
            },
            series: [{
                type: 'area',
                name: 'Trips',
                data: chartsApp.charts.map( entry=>
                  [entry.dateCollected, entry.trips]
                )
            }]
        });
    }


    },//methods closed

    created() {
        //TODO get parameters from url
        const url = new URL(window.location.href);
        const sensorId = url.searchParams.get('sensorId');
        this.fetchChart(sensorId);
    }//created closed
});
