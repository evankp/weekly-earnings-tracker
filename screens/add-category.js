import React from 'react'
import {Container, Label, Toast} from 'native-base';
import {Button, TextInput} from "react-native-paper";
import {connect} from 'react-redux';

import {StyledContent} from "../components/custom-styling";
import * as Colors from '../utils/colors';
import {generateID} from "../utils/helpers";
import HeaderBar from '../components/header-bar';
import {addCategory} from "../redux/actions/categories";

class AddCategory extends React.Component {
    state = {
        id: generateID(),
        title: ''
    };

    changeState = (state, value) => {
        this.setState({[state]: value})
    };

    submitAdd = () => {
        this.props.dispatch(addCategory(this.state));
        this.props.navigation.goBack();
        Toast.show({
            text: 'Added category',
            buttonText: 'Close'
        })
    };

    render() {
        return (
            <Container>
                <HeaderBar title="Add Category" navigation={this.props.navigation} leftBack/>
                <StyledContent>
                        <Label>Add New Category</Label>
                        <TextInput mode="outlined" value={this.state.title}
                                   onChangeText={(value) => this.changeState('title', value)}
                                   style={{marginBottom: 20}}/>
                        <Button mode="contained" onPress={this.submitAdd}>Submit</Button>
                </StyledContent>
            </Container>
        )
    }
}

export default connect()(AddCategory);
