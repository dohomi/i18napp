if (Meteor.isClient) {
  //Session.setDefault("lang", "en");
}


var languages = ["en", "de"];

var setLanguageHelper = function (lang) {
  //Session.set("lang", lang);
  Helpers.setLanguage(lang)
};

var isLangSessionSet = function () {
  return !!Session.get('lang');
};

var inited = false;
var initVal;

var setInitVal = function (lang) {
  if (!inited) {
    initVal = lang;

    inited = true;
  }
};

var getLanguage = function () {
  if (Session.get("lang")) {
    return Session.get("lang");
  }
  return Helpers.language();
};

Router.configure({
  layoutTemplate: 'layout',

  i18n: {
    languages: languages,

    setLanguage: function (lang) {
      //console.log("setLanguage %s", lang);
      //Session.set("lang", lang);
      setLanguageHelper(lang);
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

  Template.layout.rendered = function () {


    this.autorun(function () {
      var langCodeMissing = Router.initalLangCodeMissing;
      //console.log(langCodeMissing,"langCodeMissing")
      var userLang = Meteor.user() && Meteor.user().languageKey;
      if (langCodeMissing && !Meteor.loggingIn() && userLang) {
        if (userLang !== Router.getLanguage()) {
          Router.setLanguage(Meteor.user().languageKey);
        }
      } else {
        Helpers.setLanguage(Router.getLanguage());
      }


    });

    //this.autorun(function () {
    //
    //  var user = Meteor.user();
    //  if (user && user.languageKey) {
    //    console.log("hier")
    //    langCode = user.languageKey;
    //  }
    //
    //  Router.setLanguage(langCode);
    //})

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


if (Meteor.isServer) {
  Meteor.publish(null, function () {
    return Meteor.users.find(this.userId, {fields: {profile: 1, languageKey: 1}});
  });
}

Meteor.startup(function () {

  if (Meteor.isServer) {


    var testuser = Meteor.users.findOne({username: "testuser@example.com"}), userId;

    // create operator
    if (!testuser) {

      userId = Accounts.createUser({

        username: "testuser@example.com",
        email: "testuser@example.com",
        password: "123123",
        profile: {
          firstName: "Test",
          lastName: "User"
        }
      });
      Meteor.users.update(userId, {$set: {languageKey: 'de'}});


    }
  }

});


Helpers.addDictionary({

  'home': {
    en: 'Home Content',
    de: 'Startseiten Inhalt',

  },
  'foo': {
    en: 'Foo Content',
    de: 'Foo Seiteninhalt'
  }
});