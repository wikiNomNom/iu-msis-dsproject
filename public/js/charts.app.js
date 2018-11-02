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
        // chartsApp.heatRateChart();
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

  },

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
                name: 'Trips',
                data: chartsApp.charts.map( entry=>
                  [entry.dateCollected, entry.output]
                )
            }]
        });

    }

    },//methods closed

    created() {
        //TODO get parameters from url
        const url = new URL(window.location.href);
        const sensorId = url.searchParams.get('sensorId');
        this.fetchChart(turbineId);
    }//created closed
});
