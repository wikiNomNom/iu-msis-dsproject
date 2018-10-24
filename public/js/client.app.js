var clientApp = new Vue ({

  el: "#clientData",

  data: {

      clients: []
  },

  methods: {

    fetchClient : function (){

      fetch('api/client.php')
      .then( function(response) {return response.json()} )
      .then( json => {clientApp.clients = json} )

      .catch(function(err){
        console.log('COMMENT FETCH ERROR:');
        console.log(err);
        }) ;//end of catch
      },//end of fetchClient

    gotoSite(clientId) {
      //TODO change turbine page to site page
      window.location = 'site.html?clientId=' + clientId;
    }

    },//methods closed

    created() {
        //TODO get parameters from url
        this.fetchClient();
    }//created closed
});
