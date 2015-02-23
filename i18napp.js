if (Meteor.isClient) {

  Template.layout.rendered = function () {


    this.autorun(function () {
      //console.log(langCodeMissing,"langCodeMissing")
      if (!Router.isLanguageSet && Router.getLanguage() !== Helpers.language()) {
        Helpers.setLanguage(Router.getLanguage());
      }
    });

  };


  var events = {
    "click button": function (e) {
      var where = $(e.target).data("where"); //should be home or foo
      Router.go(where);// --> here Router switches always to default lang /en/..
    }
  };
  Template.Foo.events(events);
  Template.Home.events(events);


  //util stuff to change language and show current one
  Template.layout.helpers({
    "lang": function () {
      return Helpers.language();
    },
    "languages": function () {
      return languages;
    },
    "isLang": function () {
      return this == Helpers.language();
    }
  });
  Template.layout.events({
    "change select": function (e) {
      Router.setLanguage($(e.currentTarget).val());
    }
  });

}


