var siteApp = new Vue ({

  el: "#siteData",

  data: {

      sites: [],
      notes: [],
      newNoteForm: {}
  },

  methods: {

    fetchSite : function (cId){
      console.log("At function"+cId);
      fetch('http://ec2-34-222-125-25.us-west-2.compute.amazonaws.com/api/site.php?clientId='+cId)
      .then( function(response) {return response.json()} )
      .then( json => {siteApp.sites = json} )

      .catch(function(err){
        console.log('COMMENT FETCH ERROR:');
        console.log(err);
        }) ;//end of catch
      },//end of fetchSite

      fetchNote : function(cId){
        fetch('api/note.php?clientId='+cId)
        .then( function(response) {return response.json()} )
        .then( json => {siteApp.notes = json} )

        .catch(function(err){
          console.log('COMMENT FETCH ERROR:');
          console.log(err);
          }) ;//end of catch
      },//fetchNote ends

      getEmptyNoteForm() {
        console.log("Inside getEmptyNoteForm");
      return {
        clientId: null,
        noteDescription: null
      }
    },

      postNote : function(e){
      // console.log('inside postComment.');
        fetch('api/note.php', {
          method : "POST",
          body : JSON.stringify(
              {clientId: this.cid,
              noteDescription: this.newNoteForm.noteDescription}
            ), //end stringify
          headers: {
            'Content-type' : 'application/json; charset=utf-8'
          }// end headers
        })//end fetch

        .then( response => response.json() )
        .then(
          json => {this.comment.push(json);}
        )
        .then(window.location.reload())

        .catch(function (err) {
          console.log(('COMMENT POST ERROR: '));
          console.log(err);
        });
     }, //end postNote

    gotoTurbine(siteId) {
      //TODO change turbine page to site page
      window.location = 'turbine.html?siteId=' + siteId;
    }

    },//methods closed

    created() {
        //TODO get parameters from url
        const url = new URL(window.location.href);
        const clientId = url.searchParams.get('clientId');
        console.log("At created"+clientId);
        this.fetchSite(clientId);
        this.fetchNote(clientId);
        this.newNoteForm = this.getEmptyNoteForm();
        this.cid = clientId;
    }//created closed
});
