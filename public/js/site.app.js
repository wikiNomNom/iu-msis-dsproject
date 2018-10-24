var siteApp = new Vue ({

  el: "#siteData",

  data: {

      sites: []
  },

  methods: {

    fetchSite : function (cId){

      fetch('api/site.php?clientId='+cId)
      .then( function(response) {return response.json()} )
      .then( json => {siteApp.sites = json} )

      .catch(function(err){
        console.log('COMMENT FETCH ERROR:');
        console.log(err);
        }) ;//end of catch
      },//end of fetchSite

    gotoTurbine(siteId) {
      //TODO change turbine page to site page
      window.location = 'turbine.html';
    }

    },//methods closed

    created() {
        //TODO get parameters from url
        const url = new URL(window.location.href);
        const clientId = url.searchParams.get('clientId');
        this.fetchSite(clientId);
    }//created closed
});
