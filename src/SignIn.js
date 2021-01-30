import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage } from 'react-native';
import { login } from "./services/auth";
import { getUserByToken } from "./services/user";

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
                    <View style={styles.distance}/>
                    <Button
                        style={styles.btn}
                        title="Sign in"
                        onPress={() => this.login()}
                    />
                    <View style={styles.distance}/>
                    <Button
                        style={styles.btn}
                        title="Create account"
                        onPress={() => navigateTo('SignUp')}
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
        borderColor: "#102027",
        borderWidth: 1
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
        height: 280,
        padding: 10,
        borderRadius: 10
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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