Locations = new Mongo.Collection("Locations");
edudata = new Mongo.Collection("edudata");
if (Meteor.isClient) {
 


     
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.welcomeuser.helpers({
    user: function () {
      return Meteor.user().username;
    },
    loc: function () {

      if(!(Locations.findOne({createdBy: Meteor.userId()})))
         {
          navigator.geolocation.getCurrentPosition(function(position) {
           
             Locations.insert({
                 lat: position.coords.latitude,
                 lng: position.coords.longitude,
                 createdBy: Meteor.userId(),
                 username:Meteor.userId().username,
                 createdDate: new Date()
             });
             });
         }
       },
       edu:function(){
        if(!(edudata.findOne({createdBy: Meteor.userId()}))){
          edudata.insert({
            data1: document.getElementById('textbox');
          });
        }

       }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
