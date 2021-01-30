import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoTimeIsFinished: false
        };

        this.setState = this.setState.bind(this);
    }

    render() {
        const { logoTimeIsFinished } = this.state;
        const { navigateTo } = this.props;
        setTimeout(this.setState, 2000, { logoTimeIsFinished: true });

        if (logoTimeIsFinished) {
            navigateTo('SignIn');
        }

        return (
            <View style = {styles.logoBackground}>
                <Text style={styles.logoTextHeader}>Mobile lab</Text>
                <Text style={styles.logoText}>by Nikulshyn Daniel</Text>
            </View>
        );
    }
}

export default Logo

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