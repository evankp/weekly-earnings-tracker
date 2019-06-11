import React from 'react'
import {View, Text} from 'react-native'
import {Container, H2} from 'native-base';
import {IconButton} from "react-native-paper";
import {DateTime} from 'luxon';

import {StyledContent, DayHeading, TextButton, NavigationView} from "../components/custom-styling";
import * as Colors from '../utils/colors'
import HeaderBar from '../components/header-bar';
import {getWeekRange,} from "../utils/helpers";
import SummeryView from "../components/summery-view";

export default class WeekView extends React.Component {
    state = {
        displayWeek: DateTime.local().startOf('week').toISO()
    };

    getWeek = () => {
        const {start, end} = getWeekRange(this.state.displayWeek);
        return `${start.toLocaleString()} - ${end.toLocaleString()}`
    };

    resetWeek = () => {
        this.setState({displayWeek: DateTime.local().startOf('week').toISO()})
    };

    plusWeek = () => {
        this.setState((state) => ({
            displayWeek: DateTime.fromISO(state.displayWeek).plus({week: 1}).toISO()
        }))
    };

    minusWeek = () => {
        this.setState((state) => ({
            displayWeek: DateTime.fromISO(state.displayWeek).minus({week: 1}).toISO()
        }))
    };

    render() {
        const {navigation} = this.props;

        return (
            <Container>
                <HeaderBar title="Weekly Earnings" navigation={navigation} addRoute="AddEntry"/>
                <StyledContent>
                    {this.state.displayWeek !== DateTime.local().startOf('week').toISO() && (
                        <TextButton centeredText color={Colors.blue} onPress={() => this.resetWeek()}>
                            <Text>Reset to current week</Text>
                        </TextButton>
                    )}
                    <NavigationView>
                        <IconButton icon="keyboard-arrow-left" onPress={this.minusWeek} size={28}/>
                        <DayHeading>
                            {this.getWeek()}
                        </DayHeading>
                        <IconButton icon="keyboard-arrow-right" onPress={this.plusWeek} size={28}/>
                    </NavigationView>
                    <SummeryView week={this.state.displayWeek} summeryType="weekly" navigation={navigation}/>
                </StyledContent>
            </Container>
        )
    }
}
