import React from 'react';
import { StyleSheet, Text, View, Button, Animated, TouchableWithoutFeedback } from 'react-native';
import { pushNotifications } from './services';
import firebase from "firebase/app";

const cardsRef = firebase.firestore().collection("cards");
const usersProfileRef = firebase.firestore().collection("usersProfile");

class CurrentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0),
            card: {}
        };
    }

    async componentDidMount() {
        const userData = firebase.auth().currentUser;
        const email = userData.email;

        usersProfileRef
            .where("email", "==", email)
            .get()
            .then(users => {
                users.forEach(user => {
                    const lastCardId = [...user.data().gotCards].pop();
                    cardsRef
                        .doc(lastCardId)
                        .get()
                        .then(card => {
                            console.log(card);
                            const lastCard = {};
                            lastCard = card.data();
                            this.setState({card: lastCard});
                        });
                });
            });
    }

    startAnimation = () => {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 1500,
        }).start(() => {
            this.state.animation.setValue(0);
        });
    };

    async out() {
        pushNotifications.localNotification(
            "Daily update",
            "New card",
            "Review the new card and task for today",
            "see more"
        );
    }

    render() {
        const { card } = this.state;

        console.log("CARD", card);

        const xInterpolate = this.state.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "360deg"],
        });

        const yInterpolate = this.state.animation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: ["0deg", "0deg", "180deg"],
        });

        const animatedStyles = {
            transform: [{ rotateX: xInterpolate }, { rotateY: yInterpolate }],
        };

        return (
            <View style={styles.currentCardScreen}>
                <Text style={styles.currentCardDaily}>Daily card</Text>
                <TouchableWithoutFeedback onPress={this.out}>
                    <Animated.View style={[styles.box, animatedStyles]}>
                        <View style={styles.currentCardBox}>
                            <Text style={styles.currentCardTitle}>Владение - Пользовани</Text>
                            <Text style={styles.currentCardDescription}>Один из механизмов денежного мышления</Text>
                            <View style={styles.currentCardLine}/>
                            <Text style={styles.currentCardTask}>Некоторые задают важный вопрос, о котором нужно подумать в течение дня.</Text>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <Text style={styles.currentCardNumber}>1/54</Text>
            </View>
        );
    }
}

export default CurrentCard

const styles = StyleSheet.create({
    currentCardDaily: {
        color: "#102027",
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 25,
        fontFamily: 'serif'
    },

    currentCardTitle: {
        color: "#fff",
        textAlign: 'center',
        fontSize: 24,
        marginTop: 20,
        fontFamily: 'serif'
    },

    currentCardDescription: {
        textAlign: 'center',
        color: "#ff6d00",
        fontSize: 20,
        marginTop: 40,
        fontFamily: 'serif'
    },

    currentCardLine: {
        backgroundColor: "#fff",
        height: 1,
        width: 220,
        marginTop: 80
    },

    currentCardTask: {
        textAlign: 'left',
        color: "#fff",
        fontSize: 16,
        marginTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        fontFamily: 'serif'
    },

    currentCardNumber: {
        textAlign: 'center',
        color: "#102027",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        fontFamily: 'serif'
    },

    currentCardBox: {
        alignItems: 'center',
        padding: 10,
        width: 300,
        height: 400,
        backgroundColor: "#102027",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
        borderRadius: 5
    },

    currentCardScreen: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
    }
});