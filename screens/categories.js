import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Container, Icon, H1, Toast, Fab} from 'native-base';
import {List, IconButton} from "react-native-paper";

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import {removeCategory} from "../redux/actions/categories";
import * as Colors from '../utils/colors'
import {clearCategory} from "../redux/actions/entries";

const ListButtons = (props) => {
    const {category} = props;

    return (
        <View style={{flexDirection: 'row'}}>
            <IconButton icon="edit" onPress={() => props.navigate('EditCategory', {id: category.id})}/>
            <IconButton icon="delete" onPress={() => props.deleteCategory(category.id)}/>
        </View>
    )
};

class Categories extends React.Component {
    deleteCategory = (id) => {
        this.props.dispatch(removeCategory(id));
        this.props.dispatch(clearCategory(id));
        Toast.show({
            text: 'Category deleted',
            buttonText: 'Close'
        })
    };

    render() {
        const {navigation} = this.props;

        return (
            <Container>
                <HeaderBar title="Categories" navigation={navigation}/>
                <StyledContent>
                    {this.props.categories.map(category => (
                        <List.Item key={category.id} title={category.title}
                                   right={(props) => <ListButtons category={category}
                                                                  navigate={navigation.navigate}
                                                                  deleteCategory={this.deleteCategory}
                                                                  {...props}/>}/>
                    ))}
                </StyledContent>
                <Fab active={true}
                     onPress={() => navigation.navigate('AddCategory')}
                     style={{backgroundColor: Colors.black}}>
                    <Icon name="add" type="MaterialIcons"/>
                </Fab>
            </Container>
        )
    }
}

function mapStateToProps({categories}) {
    return {
        categories
    }
}

export default connect(mapStateToProps)(Categories)
