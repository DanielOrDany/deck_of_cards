import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [1, 2, 3, 4, 5, 6, 7, 8]
        };
    }

    render() {
        const { cards } = this.state;

        return (
            <View style={styles.cardScreen}>
                <Text style={styles.receivedCards}>Received cards</Text>
                <ScrollView style={styles.cardList}>
                    { cards && cards.map(card =>
                        <View style={styles.cardBox}>
                            <Text style={styles.cardTitle}>Владение - Пользовани</Text>
                            <Text style={styles.cardDescription}>Один из механизмов денежного мышления</Text>
                            <View style={styles.cardLine}/>
                            <Text style={styles.cardTask}>Некоторые задают важный вопрос, о котором нужно подумать в течение дня.</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        );
    }
}

export default Cards

const styles = StyleSheet.create({
    receivedCards: {
        color: "#102027",
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        fontFamily: 'serif'
    },

    cardList: {
        marginHorizontal: 20,
        paddingBottom: 40,
    },

    cardTitle: {
        color: "#fff",
        textAlign: 'center',
        fontSize: 24,
        marginTop: 20,
        fontFamily: 'serif'
    },

    cardDescription: {
        textAlign: 'center',
        color: "#ff6d00",
        fontSize: 20,
        marginTop: 40,
        fontFamily: 'serif'
    },

    cardLine: {
        backgroundColor: "#fff",
        height: 1,
        width: 220,
        marginTop: 80
    },

    cardTask: {
        textAlign: 'left',
        color: "#fff",
        fontSize: 16,
        marginTop: 15,
        paddingLeft: 30,
        paddingRight: 30,
        fontFamily: 'serif'
    },

    cardNumber: {
        textAlign: 'center',
        color: "#102027",
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        fontFamily: 'serif'
    },

    cardBox: {
        marginTop: 10,
        marginBottom: 10,
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

    cardScreen: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
    }
});