import React from 'react'
import {Container, DatePicker, Form, Label, Picker, Toast} from 'native-base';
import {Button} from "react-native-paper";
import {connect} from 'react-redux';
import {DateTime} from 'luxon';

import {StyledContent} from "../components/custom-styling";
import * as Colors from '../utils/colors';
import HeaderBar from '../components/header-bar';
import NumberInput from "../components/number-input";
import {editEntry} from "../redux/actions/entries";

class EditEntry extends React.Component {
    state = {
        ...this.props.entry
    };

    changeState = (state, value) => {
        this.setState({[state]: value})
    };

    submit = () => {
        this.props.dispatch(editEntry(this.props.entry.id, this.state));
        this.props.navigation.goBack();
        Toast.show({
            text: 'Entry Edited',
            buttonText: 'Close'
        })
    };

    render() {
        return (
            <Container>
                <HeaderBar title="Edit Entry" navigation={this.props.navigation} leftBack/>
                <StyledContent>
                    <Form>
                        <Label>Date</Label>
                        <DatePicker
                            defaultDate={new Date(this.props.entry.date)}
                            formatChosenDate={(date) => [
                                date.getMonth() + 1,
                                date.getDate(),
                                date.getFullYear(),
                            ].join('/')}
                            onDateChange={(date) => this.changeState('date', DateTime.fromISO(date.toISOString()))}
                        />
                        <Label>Category</Label>
                        <Picker note mode="dialog" selectedValue={this.state.category}
                                onValueChange={(value) => this.changeState('category', value)}
                                enabled={this.props.categories.length >= 1}>

                            {this.props.categories.map(category => (
                                <Picker.Item key={category.id} label={category.title} value={category.id}/>
                            ))}
                        </Picker>
                        <Label>Amount</Label>
                        <NumberInput negative={false} value={this.state.amount} onChange={(value) => this.changeState('amount', value)}
                                     mode="outlined" style={{marginBottom: 20}}/>

                        <Button mode="contained" color={Colors.black} onPress={this.submit}
                                disabled={this.props.categories.length === 0}>Submit</Button>
                    </Form>
                </StyledContent>
            </Container>
        )
    }
}

function mapStateToProps({categories, entries}, ownProps) {
    const {id} = ownProps.navigation.state.params;

    return {
        entry: entries.find(entry => entry.id === id),
        categories
    }
}

export default connect(mapStateToProps)(EditEntry)
