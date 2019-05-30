import {createAppContainer, createDrawerNavigator, createStackNavigator} from 'react-navigation';

// Screens
import Home from '../screens/home';
import AddEntry from '../screens/add-entry';
import Categories from '../screens/categories';
import EditCategory from '../screens/edit-category';
import AddCategory from '../screens/add-category';
import Entries from '../screens/entries';

// Drawer
const DrawerNavigator = createDrawerNavigator({
  Home: Home,
  Categories: Categories,
  Entries: {
    screen: Entries,
    navigationOptions: {
      title: 'Entry History'
    }
  }
});

// Stack Navigator for non-drawer items
export default createAppContainer(createStackNavigator({
  Main: DrawerNavigator,
  AddEntry: AddEntry,
  EditCategory: EditCategory,
  AddCategory: AddCategory
}, {
  defaultNavigationOptions: {
    header: null
  }
}))
