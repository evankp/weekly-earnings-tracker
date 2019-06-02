import React from 'react';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Icon} from "native-base";

// Screens
import Home from '../screens/home';
import AddEntry from '../screens/add-entry';
import Categories from '../screens/categories';
import EditCategory from '../screens/edit-category';
import EditEntry from '../screens/edit-entry';
import AddCategory from '../screens/add-category';
import Entries from '../screens/entries';
import WeekView from '../screens/week-view';

// Drawer
const BottomTabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,

    },
    Categories: Categories,
    Entries: {
        screen: Entries,
        navigationOptions: {
            title: 'Entry History'
        }
    },
    WeekView: {
        screen: WeekView,
        navigationOptions: {
            title: 'Week'
        }
    }
}, {
    tabBarOptions: {
        tabStyle: {
            backgroundColor: '#f6f6f6'
        }
    },
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const {routeName} = navigation.state;
            let iconName,
                fontSize = 23;

            switch (routeName) {
                case 'Home':
                    iconName = focused ? 'home' : 'home-outline';
                    break;

                case 'Categories':
                    iconName = focused ? 'folder-multiple': 'folder-multiple-outline';
                    fontSize = 21;
                    break;

                case 'Entries':
                    iconName = 'format-list-bulleted';
                    break;

                case 'WeekView':
                    iconName = 'currency-usd';
                    break;

                default:
                    iconName = 'tab'
            }

            return <Icon type="MaterialCommunityIcons" name={iconName} style={{color: tintColor, fontSize: fontSize}}/>
        }
    })
});

// Stack Navigator for non-drawer items
export default createAppContainer(createStackNavigator({
    Main: BottomTabNavigator,
    AddEntry: AddEntry,
    EditCategory: EditCategory,
    AddCategory: AddCategory,
    EditEntry: EditEntry
}, {
    defaultNavigationOptions: {
        header: null
    }
}))
