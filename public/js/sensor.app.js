var sensorApp = new Vue ({

  el: "#sensorData",

  data: {

      sensors: []
  },

  methods: {

    fetchSensor : function (tId){

      fetch('api/sensorDisplay.php?turbineId='+tId)
      .then( function(response) {return response.json()} )
      .then( json => {sensorApp.sensor = json} )

      .catch(function(err){
        console.log('COMMENT FETCH ERROR:');
        console.log(err);
        }) ;//end of catch
      }//end of fetchClient

    // gotoSensor(turbineId) {
    //    window.location = 'sensor.html?turbineId=' + turbineId;
    //  }

    },//methods closed

    created() {
        //TODO get parameters from url
        const url = new URL(window.location.href);
        const turbineId = url.searchParams.get('turbineId');
        this.fetchSensor(turbineId);
    }//created closed
});
