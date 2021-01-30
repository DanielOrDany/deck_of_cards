import PushNotification from 'react-native-push-notification';

const configure = () => {
    PushNotification.configure({

        onRegister: function(token) {
            //process token
            console.log(token);
        },

        onNotification: function(notification) {
            // process the notification
            console.log(notification);
        },

        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        popInitialNotification: true,
        requestPermissions: true,

    });
};

const localNotification = (title, subText, bigText, expandMessage) => {
    console.log("notification is running..");

    PushNotification.localNotification({
        autoCancel: true,
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        bigText,
        subText,
        title,
        message: expandMessage,
        color: "green",
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
    });
};

export {
    configure,
    localNotification
};