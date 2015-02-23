languages = ["en", "de"];

var setLanguageHelper = function (lang) {
  //Session.set("lang", lang);
  Helpers.setLanguage(lang)
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