import React from 'react';
import 'react-native-gesture-handler';
import Logo from './Logo.js';
import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import Home from './Home.js';
import { View } from "react-native";

class Routes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: "Logo"
        };

        this.setState = this.setState.bind(this);
    }

    navigateTo = (screen) => {
        this.setState({ currentScreen: screen });
    };

    render() {
        const { currentScreen } = this.state;

        return (
            <View style={{flex: 1, width: '100%'}}>
                { !!(currentScreen === "Logo") &&
                    <Logo navigateTo={this.navigateTo}/>
                }
                { !!(currentScreen === "SignIn") &&
                    <SignIn navigateTo={this.navigateTo}/>
                }
                { !!(currentScreen === "SignUp") &&
                    <SignUp navigateTo={this.navigateTo}/>
                }
                { !!(currentScreen === "Home") &&
                    <Home navigateTo={this.navigateTo}/>
                }
            </View>
        );
    }
}

export default Routes