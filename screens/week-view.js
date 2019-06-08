import React from 'react'
import {View, Text} from 'react-native'
import {Container, H2} from 'native-base';
import {IconButton} from "react-native-paper";
import {DateTime} from 'luxon';

import {StyledContent, CenteredText, TextButton} from "../components/custom-styling";
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

    setWeek = (week) => {
        this.setState({displayWeek: week})
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
        const currentWeek = DateTime.local().startOf('week').toISO();

        return (
            <Container>
                <HeaderBar title="Weekly Earnings" navigation={navigation} addRoute="AddEntry"/>
                <StyledContent>
                    {this.state.displayWeek !== currentWeek && (
                        <TextButton centeredText color={Colors.blue} onPress={() => this.setWeek(currentWeek)}>
                            <Text>Reset to current week</Text>
                        </TextButton>
                    )}
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <IconButton icon="keyboard-arrow-left" onPress={this.minusWeek} size={28}/>
                        <H2 style={{textAlign: 'center', fontWeight: 'bold'}}>
                            {this.getWeek()}
                        </H2>
                        <IconButton icon="keyboard-arrow-right" onPress={this.plusWeek} size={28}/>
                    </View>
                    <SummeryView week={this.state.displayWeek} summeryType="weekly" navigation={navigation}/>
                </StyledContent>
            </Container>
        )
    }
}
