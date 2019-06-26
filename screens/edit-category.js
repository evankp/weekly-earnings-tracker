import React from 'react'
import {Container, Label, Toast} from 'native-base';
import {Button, TextInput} from "react-native-paper";
import {connect} from 'react-redux';

import {StyledContent} from "../components/custom-styling";
import * as Colors from '../utils/colors';
import HeaderBar from '../components/header-bar';
import {editCategory} from "../redux/actions/categories";

class EditCategory extends React.Component {
    state = {
        title: this.props.category.title
    };

    changeState = (state, value) => {
        this.setState({[state]: value})
    };

    submitEdit = () => {
        const {id} = this.props.category;

        this.props.dispatch(editCategory({id, title: this.state.title}));
        this.props.navigation.goBack();
        Toast.show({
            text: 'Edit saved',
            buttonText: 'Close'
        })
    };

    render() {
        return (
            <Container>
                <HeaderBar title="Edit Category" leftBack/>
                <StyledContent>
                        <Label>Change category name</Label>
                        <TextInput mode="outlined" value={this.state.title}
                                   onChangeText={(value) => this.changeState('title', value)}
                                   style={{marginBottom: 20}}/>
                        <Button mode="contained" onPress={this.submitEdit}>Submit</Button>
                </StyledContent>
            </Container>
        )
    }
}

function mapStateToProps({categories}, ownProps) {
    return {
        category: categories.find(category => category.id === ownProps.navigation.state.params.id)
    }
}

export default connect(mapStateToProps)(EditCategory);
