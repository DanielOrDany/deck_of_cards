import PushNotification from 'react-native-push-notification';
import firebase from "firebase/app";

const cardsRef = firebase.firestore().collection("cards");
const usersProfileRef = firebase.firestore().collection("usersProfile");

const configure = () => {
    PushNotification.configure({

        onRegister: function(token) {
            //process token
            console.log(token);
        },

        onNotification: function(notification) {
            // process the notification
            console.log(notification);
            const userData = firebase.auth().currentUser;
            console.log("userData", userData.email);
            if (userData) {
                const email = userData.email;

                usersProfileRef
                    .where("email", "==", email)
                    .get()
                    .then(users => {
                        users.forEach(user => {
                            const userId = user.id;
                            const userData = user.data();
                            const userCards = userData.gotCards;
                            cardsRef.get().then(cards => {
                                const allCards = [];
                                cards.forEach(card => {
                                    if (!userCards.includes(card.id)) {
                                        allCards.push(card.id);
                                    }
                                });
                                if (allCards.length) {
                                    userCards.push(allCards[Math.random() * allCards.length]);
                                    usersProfileRef.doc(userId).set({
                                        email: userData.email,
                                        gotCards: userCards
                                    });
                                }
                            });
                        });
                    });
            }
        },

        onRegistrationError: function(err) {
            console.error(err.message, err);
        },

        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        senderID: '206451807131',
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