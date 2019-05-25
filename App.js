import * as React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {Constants, AppLoading, Font as ExpoFont} from 'expo';
import {Container, Header, Content, Drawer} from 'native-base';
import Styled from 'styled-components';

import AppNavigator from './navigation'

const StatusBarBackground = Styled(View)`
    background-color: #000;
    height: ${Constants.statusBarHeight}
`;

export default class App extends React.Component {
    state = {
        loading: true
    };

    async componentWillMount() {
        await ExpoFont.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
            MaterialCommunityIcons: require("@expo/vector-icons/fonts/MaterialCommunityIcons.ttf")
        });
        this.setState({loading: false});
    }

    render() {
        if (this.state.loading) return <AppLoading/>;

        return (
            <Container>
                <StatusBar barStyle='default'/>
                <StatusBarBackground/>
                <AppNavigator/>
            </Container>
        );
    }
}
