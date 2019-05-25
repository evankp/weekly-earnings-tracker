import {createAppContainer, createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Home from '../screens/home';
import AddEntry from '../screens/add-entry';

const DrawerNavigator = createDrawerNavigator({
  Home: Home
});

export default createAppContainer(createStackNavigator({
  Main: DrawerNavigator,
  AddEntry: AddEntry
}, {
  defaultNavigationOptions: {
    header: null
  }
}))
