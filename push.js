var webPush = require("web-push");

const vapidKey = {
    "publicKey": "BFOADbv7p5ck89dk4Zbp8AJJAa-40uaDO882L0sf2Pr9S-gW0dU8KGTmJSKepMu4HR393ZnZ2FOs7uSl1VRBGUY",
    "privateKey": "lMVVPWYw4zzMMwUWcO6amT-CmcOm9p_FGoVqcjHPgvE"
}

webPush.setVapidDetails(
    "mailto:example@pwa.org",
    vapidKey.publicKey,
    vapidKey.privateKey
);

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/ftqh6aiWPAc:APA91bHm-If1UHcFHlp_RmPYN2BXHyLbqqwJqDWeSBW4luzKFgoIweQVqH7ev-MSSH3bJgVwDTxICFvenzj749hyotxPma4nDsNHZ2tCR8eFD7TO5YjYRxVodl0knKSoGtfAL9ftAOEf",
    "keys": {
        "p256dh": "BCl9WDPeDc/bW2L/ak7Z1hgoB3lRORLPxJDr3gFo7Iylm49FEF/k7yifiiUkSqzyP9AM+XfOhFZHj6FpAUx1XNc=",
        "auth": "/hFjbfbAYTv4HTW71K9dng=="
    }
};

let payload = "Selamat aplikasi anda sudah menerima push notification";

let options = {
    gcmAPIKey: "722709262625",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)