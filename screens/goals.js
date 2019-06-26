import React from 'react'
import {Container, Label, Toast} from 'native-base';
import {Button} from "react-native-paper";
import {connect} from 'react-redux';

import {StyledContent} from "../components/custom-styling";
import NumberInput from "../components/number-input";
import * as Colors from '../utils/colors';
import {generateID} from "../utils/helpers";
import HeaderBar from '../components/header-bar';
import {addCategory} from "../redux/actions/categories";
import {adjustSetting} from "../redux/actions/settings";

class Goals extends React.Component {
    state = {
        ...this.props.goalSettings
    };

    onChange = (state, value) => {
        this.setState({[state]: value});
    };

    submit = () => {
        this.props.dispatch(adjustSetting('goals', {...this.state}));
        this.props.navigation.goBack();
        Toast.show({
            text: 'Saved Goals',
            buttonText: 'Close',
        })
    };

    render() {
        return (
            <Container>
                <HeaderBar title="Add Category" leftBack/>
                <StyledContent>
                    <Label>Daily Goal</Label>
                    <NumberInput value={this.state.daily}
                                 onChange={(value) => this.onChange('daily', value)}
                                 negative={false}
                                 style={{marginBottom: 20}}/>

                    <Label>Weekly Goal</Label>
                    <NumberInput value={this.state.weekly}
                                 onChange={(value) => this.onChange('weekly', value)}
                                 negative={false}
                                 style={{marginBottom: 20}}/>

                    <Button mode="contained" color={Colors.black} onPress={this.submit}>Submit</Button>
                </StyledContent>
            </Container>
        )
    }
}

function mapStateToProps({settings}) {
    return {
        goalSettings: settings.goals
    }
}

export default connect(mapStateToProps)(Goals);
