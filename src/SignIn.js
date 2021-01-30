import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { login } from "./services/auth";
import { getUserByToken } from "./services/user";
import { AsyncStorage } from 'react-native';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    async componentDidMount() {
        const { navigateTo } = this.props;
        const userToken = await AsyncStorage.getItem('token');
        const userData = await getUserByToken(userToken);

        if (userData) {
            this.setState({user: userData.data.user});
            navigateTo('Home');
        }
    }

    login = async () => {
        const result = await login(this.state.email, this.state.password);
        const { navigateTo } = this.props;

        if (!result.data.success) {
            this.setState({error: result.data.message});

            if (result.data.key) {
                this.setState({key: result.data.key});
            } else {
                this.setState({key: ""});
            }
        } else {
            await AsyncStorage.setItem("token", result.data.token);
            navigateTo('Home');
        }
    };

    render() {
        const { error, key } = this.state;
        const { navigateTo } = this.props;

        return (
            <View style={styles.row}>
                <View style={styles.column}>
                    <View style={styles.box}>
                        <Text style={styles.header}>Try to login</Text>

                        <TextInput
                            style={key === 'email' ? styles.inputError : styles.input}
                            value={this.state.email}
                            onChangeText={ email => this.setState({email})}
                            placeholder="Email"
                        />
                        <TextInput
                            style={key === 'password' ? styles.inputError : styles.input}
                            secureTextEntry
                            placeholder="Password"
                            value={this.state.password}
                            onChangeText={password => this.setState({password})}
                        />
                        <Button
                            style={styles.btn}
                            title="Sign in"
                            onPress={() => this.login()}
                        />

                        <Button
                            style={styles.btn}
                            title="Go to Sign up"
                            onPress={() => navigateTo('SignUp')}
                        />
                        { !!error &&
                            <Text style={styles.err}>
                                {error}
                            </Text>
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputError: {
        color: '#3867a6',
        fontSize: 15,
        fontWeight: 'bold',
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10,
        marginTop: 5,
        borderColor: 'red',
        borderWidth: 1
    },
    header: {
        color: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 25,
        width: '100%',
        padding: 5,
        fontWeight: 'bold'
    },
    input: {
        color: '#3867a6',
        fontSize: 15,
        fontWeight: 'bold',
        height: 30,
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
        height: 280,
        backgroundColor: '#3867a6',
        padding: 10,
        borderRadius: 10
    },
    column: {
        display: 'flex',
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
        backgroundColor: "red",
        color: "white",
        padding: 5,
        borderRadius: 5,
        textAlign: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
});

export default SignIn