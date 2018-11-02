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
        // chartsApp.compressorEfficiencyChart();
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
        entry.fixedHours = Number(entry.firedHours);
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
                          //TODO change chart color
                            [0, "#2d9d47"],
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

    }//heatRateChart ends

    },//methods closed

    created() {
        //TODO get parameters from url
        const url = new URL(window.location.href);
        const sensorId = url.searchParams.get('sensorId');
        this.fetchChart(sensorId);
    }//created closed
});
