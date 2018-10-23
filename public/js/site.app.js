var siteApp = new Vue ({

  el: "#siteData",

  data: {

      sites: []
  },

  methods: {

    fetchSite : function (){

      fetch('api/site.php')
      .then( function(response) {return response.json()} )
      .then( json => {siteApp.sites = json} )

      .catch(function(err){
        console.log('COMMENT FETCH ERROR:');
        console.log(err);
        }) ;//end of catch
      }//end of fetchSite

    // gotoSite(clientId) {
    //   //TODO change turbine page to site page
    //   window.location = 'turbine.html';
    // }

    },//methods closed

    created() {
        //TODO get parameters from url
        this.fetchSite();
    }//created closed
});
