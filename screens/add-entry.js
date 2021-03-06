import React from 'react';
import {Container, DatePicker, Form, Label, Picker, Toast} from 'native-base';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {DateTime} from 'luxon';

import {StyledContent} from '../components/custom-styling';
import * as Colors from '../utils/colors';
import HeaderBar from '../components/header-bar';
import NumberInput from '../components/number-input';
import {generateID} from '../utils/helpers';
import {submitEntry} from '../redux/actions/entries';

class AddEntry extends React.Component {
    state = {
        id: generateID(),
        category: this.props.navigation.getParam('category', this.props.categories.length >= 1 ? this.props.categories[0].id : 0),
        amount: 0,
        date: this.props.navigation.getParam('date', DateTime.local())
    };

    changeState = (state, value) => {
        this.setState({[state]: value})
    };

    submit = async () => {
        this.props.dispatch(submitEntry(this.state, this.props.user, this.props.useDatabase));
        this.props.navigation.goBack();

        Toast.show({
            text: 'Entry added',
            buttonText: 'Close'
        })
    };

    render() {
        return (
            <Container>
                <HeaderBar title="Add Entry" leftBack/>
                <StyledContent>
                    <Form>
                        <Label>Date</Label>
                        <DatePicker
                            defaultDate={new Date()}
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
                        <NumberInput negative={false} onChange={(value) => this.changeState('amount', value)}
                                     mode="outlined" style={{marginBottom: 20}}/>

                        <Button mode="contained" color={Colors.black} onPress={this.submit}
                                disabled={this.props.categories.length === 0}>Submit</Button>
                    </Form>
                </StyledContent>
            </Container>
        )
    }
}

function mapStateToProps({categories, settings}) {
    return {
        categories,
        useDatabase: settings.databaseSync,
        user: settings.user
    }
}
export default connect(mapStateToProps)(AddEntry)
