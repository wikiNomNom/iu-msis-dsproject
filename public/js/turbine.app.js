var turbineApp = new Vue ({

  el: "#turbineData",

  data: {

      turbines: []
  },

  methods: {

    fetchTurbine : function (sId){

      fetch('api/turbineDisplay.php?siteId='+sId)
      .then( function(response) {return response.json()} )
      .then( json => {turbineApp.turbines = json} )

      .catch(function(err){
        console.log('COMMENT FETCH ERROR:');
        console.log(err);
        }) ;//end of catch
      },//end of fetchClient

    gotoSensor(turbineId) {
       window.location = 'sensor.html?turbineId=' + turbineId;
     }

    },//methods closed

    created() {
        //TODO get parameters from url
        const url = new URL(window.location.href);
        const siteId = url.searchParams.get('siteId');
        this.fetchTurbine(siteId);
    }//created closed
});
