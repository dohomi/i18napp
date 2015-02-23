Meteor.publish(null, function () {
  return Meteor.users.find(this.userId, {fields: {profile: 1, languageKey: 1}});
});


Meteor.startup(function () {


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


});