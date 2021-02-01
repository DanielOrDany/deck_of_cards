import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import firebase from "firebase";

const usersProfileRef = firebase.firestore().collection("usersProfile");

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            error: ""
        };
    }

    async componentDidMount() {
        const { navigateTo } = this.props;
        const userData = firebase.auth().currentUser;

        if (userData) {
            this.setState({user: userData});
            navigateTo('Home');
        }
    }

    register = async () => {
        const { navigateTo } = this.props;

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                usersProfileRef.doc().set({
                    email: this.state.email,
                    name: this.state.name,
                    gotCards: []
                }).then(function() {
                    console.log("Document successfully written!");
                }).catch(function(error) {
                    console.error("Error writing document: ", error);
                });

                res.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .then((data) => navigateTo('Home'))
            .catch((err) => this.setState({error: err.message}));
    };

    render() {
        const { error, key } = this.state;
        const { navigateTo } = this.props;

        return (
            <View style={styles.column}>
                <View style={styles.box}>
                    <Text style={styles.header}>
                        Create a new account
                    </Text>
                    <TextInput
                        style={key === 'name' ? styles.inputError : styles.input}
                        value={this.state.name}
                        onChangeText={ name => this.setState({name})}
                        placeholder="Name"
                    />
                    <TextInput
                        style={key === 'email' ? styles.inputError : styles.input}
                        value={this.state.email}
                        onChangeText={ email => this.setState({email})}
                        placeholder="Email"
                    />
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        style={key === 'password' ? styles.inputError : styles.input}
                        value={this.state.password}
                        onChangeText={ password => this.setState({password})}
                    />
                    <View style={styles.distance}/>
                    <Button
                        style={styles.btn}
                        title="Sign up"
                        onPress={() => this.register()}
                    />
                    <View style={styles.distance}/>
                    <Button
                        style={styles.btn}
                        title="Go back"
                        onPress={() => navigateTo('SignIn')}
                    />
                    { !!error &&
                    <Text style={styles.err}>
                        {error}
                    </Text>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputError: {
        color: "#102027",
        fontSize: 15,
        fontWeight: 'bold',
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        marginTop: 5,
        borderColor: 'red',
        borderWidth: 1,
    },
    distance: {
        margin: 6
    },
    header: {
        color: "#102027",
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 25,
        width: '100%',
        padding: 5,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        color: "#102027",
        fontSize: 15,
        fontWeight: 'bold',
        height: 42,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        marginTop: 5
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        width: 350,
        height: 350,
        padding: 10,
        borderRadius: 10
    },
    column: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btn: {
        width: 350,
        marginTop: 5,
        color: '#fff',
    },
    err: {
        marginTop: 10,
        width: 330,
        backgroundColor: "#102027",
        color: "white",
        padding: 5,
        borderRadius: 5,
        textAlign: 'center'
    }
});

export default SignUp