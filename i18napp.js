if (Meteor.isClient) {
  Session.setDefault("lang", "en");
}


var languages = ["en", "de"];

Router.configure({
  layoutTemplate: 'layout',

  i18n: {
    languages: languages,

    setLanguage: function (lang) {
      Session.set("lang", lang);
    },
    getLanguage: function () {

      Session.get("lang");
    }
  }
});

Router.route("/", {
  name: "home"

});

Router.route("/foo", {
  name: "foo"

});

if (Meteor.isClient) {


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
    "lang" : function(){
      return Session.get("lang");
    },
    "languages": function(){
      return languages;
    },
    "isLang": function () {
      return this == Session.get("lang");
    }
  });
  Template.layout.events({
    "change select": function(e){

      Router.setLanguage($(e.currentTarget).val());
    }
  })

}