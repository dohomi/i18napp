if (Meteor.isClient) {

  var events = {
    "click button": function (e) {
      var where = $(e.target).data("where"); //should be home or foo
      Router.go(where);// --> here Router switches always to default lang /en/..
    }
  };
  Template.Foo.events(events);
  Template.Home.events(events);

}


