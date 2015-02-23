Template.layout.rendered = function () {


  this.autorun(function () {
    var initialLangCodeMissing = Router.isLangCodeMissing();
    console.log("initialLangCode", initialLangCodeMissing)
    var userLang = Meteor.user() && Meteor.user().languageKey;
    // here I need to do an action, if no routing is set
    if (initialLangCodeMissing && !Meteor.loggingIn() && userLang) {
      Router.setLanguage(userLang);
    }
    //console.log(langCodeMissing,"langCodeMissing")
    if (Router.getLanguage() !== Helpers.language()) {
      Helpers.setLanguage(Router.getLanguage());
    }
  });

};

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