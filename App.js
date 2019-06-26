import * as React from 'react';
import {View, StatusBar} from 'react-native';
import {Constants, AppLoading, Font as ExpoFont} from 'expo';
import {Root} from 'native-base';
import Styled from 'styled-components';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";

import {store, persistor} from './redux/configure-store'
import AppNavigator from './navigation'

import * as Colors from './utils/colors';

const StatusBarBackground = Styled(View)`
    background-color: #000;
    height: ${Constants.statusBarHeight}
`;

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.black
    }
};

export default class App extends React.Component {
    state = {
        loading: true
    };

    async componentWillMount() {
        await ExpoFont.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
            MaterialIcons: require("@expo/vector-icons/fonts/MaterialIcons.ttf"),
            MaterialCommunityIcons: require("@expo/vector-icons/fonts/MaterialCommunityIcons.ttf")
        });
        this.setState({loading: false});
    }

    render() {
        if (this.state.loading) return <AppLoading/>;

        return (
            // Redux Provider
            <Provider store={store}>
                {/* Redux Persist Provider */}
                <PersistGate persistor={persistor}>
                    {/* react-native-paper Provider */}
                    <PaperProvider theme={theme}>
                        {/* NativeBase Toast Root */}
                        <Root>
                            <StatusBar barStyle='default'/>
                            <StatusBarBackground/>
                            <AppNavigator/>
                        </Root>
                    </PaperProvider>
                </PersistGate>
            </Provider>
        );
    }
}
