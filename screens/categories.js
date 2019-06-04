import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import {Container, Toast} from 'native-base';
import {IconButton, List} from "react-native-paper";

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import {removeCategory} from "../redux/actions/categories";
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
                <HeaderBar title="Categories" navigation={navigation} addRoute="AddCategory" leftBack/>
                <StyledContent>
                    {this.props.categories.length === 0 && (
                        <Text style={{textAlign: 'center'}}>No Categories</Text>
                    )}
                    {this.props.categories.map(category => (
                        <List.Item key={category.id} title={category.title}
                                   right={(props) => <ListButtons category={category}
                                                                  navigate={navigation.navigate}
                                                                  deleteCategory={this.deleteCategory}
                                                                  {...props}/>}/>
                    ))}
                </StyledContent>
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
