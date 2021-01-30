import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getUserByToken } from './services/user';
import { AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import CurrentCard from "./CurrentCard";
import Cards from "./Cards";

const Drawer = createDrawerNavigator();

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
    }

    async componentDidMount() {
        const userToken = await AsyncStorage.getItem('token');
        const userData = await getUserByToken(userToken);

        console.log(userData);
        if (userData) {
            this.setState({user: userData.data.user});
        } else {
            this.setState({error: "time is out.."});
        }
    }

    async out() {
        const {navigateTo} = this.props;
        await AsyncStorage.setItem('token', null);
        navigateTo('SignIn');
    }

    render() {
        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={CurrentCard} />
                    <Drawer.Screen name="My cards" component={Cards} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        position : 'absolute',
        left: 0,
        top: 0,
        width : 80,
        height : 100,
        paddingTop : 10,
        paddingLeft : 10,
        paddingRight : 10,
        paddingBottom : 10
    },
    menu: {
        zIndex: 0,
        position : 'absolute',
        backgroundColor: '#3867a6',
        color: '#fff'
    },
    container: {
        position : 'absolute',
        zIndex: 9999999999999,
        backgroundColor: '#fff',
        color: '#3867a6'
    },
    header: {
        color: '#3867a6',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 25,
        width: '100%',
        padding: 5,
        fontWeight: 'bold',
        marginBottom: 30
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
        height: 60,
        backgroundColor: "red",
        color: "white",
        padding: 5,
        borderRadius: 5,
        textAlign: 'center'
    }
});

export default Home