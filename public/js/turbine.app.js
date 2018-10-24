var turbineApp = new Vue ({

  el: "#turbineData",

  data: {

      turbines: []
  },

  methods: {

    fetchTurbine : function (sId){

      fetch('api/TurbineDisplay.php?siteId='+sId)
      .then( function(response) {return response.json()} )
      .then( json => {turbineApp.turbines = json} )

      .catch(function(err){
        console.log('COMMENT FETCH ERROR:');
        console.log(err);
        }) ;//end of catch
      },//end of fetchClient

    gotoSensor(turbineId) {
      window.location = 'sensor.html?sensorId=' + sensorId;
    }

    },//methods closed

    created() {
        //TODO get parameters from url
        const url = new URL(window.location.href);
        const siteId = url.searchParams.get('siteId');
        this.fetchTurbine(siteId);
    }//created closed
});
