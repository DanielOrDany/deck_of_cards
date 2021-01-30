import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style = {styles.logoBackground}>
                <Text style={styles.logoTextHeader}>Cards</Text>
                <Text style={styles.logoText}></Text>
            </View>
        );
    }
}

export default Cards

const styles = StyleSheet.create({
    logoTextHeader: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold"
    },

    logoText: {
        color: "#fff",
        fontSize: 16
    },

    logoBackground: {
        flex: 1,
        backgroundColor: '#3867a6',
        alignItems: 'center',
        justifyContent: 'center',
    }
});