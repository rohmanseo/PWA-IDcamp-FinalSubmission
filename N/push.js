var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BM39NcgE1jTQFjc4o_dE9e7iQPalmVOFDRgaPgqgPtHJte_VJDruu7xeZOKBZYMokNbr9ZPc3tUfbTQghjn2xYI",
  privateKey: "Zs9QGcGQM91RRFZhsrvQ6NR31m-0AMbGmobO1CeiRpk"
};

webPush.setVapidDetails(
  "mailto:example.gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/fXAlzMCOZx8:APA91bFcUpH10tqVSzU-J9fgKDueBUk_2lGRxjF1oETbjuu_lEBU4s17Rw9vQ7l-ONdYxOgikWg2ra5Cjddu0NNekeCiGttzV6-xfLHnPRjrJtP0SzU5996MwAtcC2s4EdShRES7jiF_",
  keys: {
    p256dh:
      "BCxq3T55mDwdYDG9bd44NdgIjYoOu0CMzWiE9+t8vQWt9CP3pdJRZYkjZiuxd4GbqT6HC4qoZCXlBG77893RDDk=",
    auth: "A67RJx0lX+hy85V2mTyB9w=="
  }
};

var payload = "Hai Selamat Datang !";

var options = {
  gcmAPIKey: "182670932740",
  TTL: 60
};

webPush.sendNotification(
    pushSubscription, 
    payload, 
    options)
    .catch(function(err){
    console.log(err);
    });;
