import React from 'react';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Icon} from "native-base";

import * as Colors from '../utils/colors'

// Screens
import * as Screens from '../screens'

// Drawer
const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: Screens.Home,
        navigationOptions: {
            title: 'Day'
        }
    },
    WeekView: {
        screen: Screens.WeekView,
        navigationOptions: {
            title: 'Week'
        }
    },
    Entries: {
        screen: Screens.Entries,
        navigationOptions: {
            title: 'Entry History'
        }
    },
    Settings: Screens.Settings
}, {
    tabBarOptions: {
        tabStyle: {
            backgroundColor: '#f6f6f6'
        },
        activeTintColor: Colors.blue
    },
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const {routeName} = navigation.state;
            let iconName;

            switch (routeName) {
                case 'Home':
                    iconName = 'calendar-today';
                    break;

                case 'Settings':
                    iconName = focused ? 'settings' : 'settings-outline';
                    break;

                case 'Entries':
                    iconName = 'history';
                    break;

                case 'WeekView':
                    iconName = 'calendar-range';
                    break;

                default:
                    iconName = 'tab'
            }

            return <Icon type="MaterialCommunityIcons" name={iconName} style={{color: tintColor, fontSize: 23}}/>
        }
    })
});

// Stack Navigator for non-drawer items
export default createAppContainer(createStackNavigator({
    Main: BottomTabNavigator,
    AddEntry: Screens.AddEntry,
    EditCategory: Screens.EditCategory,
    AddCategory: Screens.AddCategory,
    EditEntry: Screens.EditEntry,
    Categories: Screens.Categories,
    Goals: Screens.Goals,
    DayView: Screens.DayView,
    CategorySummery: Screens.CategorySummery,
    DataOptions: Screens.DataOptions
}, {
    defaultNavigationOptions: {
        header: null
    }
}))
