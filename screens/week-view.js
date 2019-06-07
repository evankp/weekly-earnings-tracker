import React from 'react'
import {View} from 'react-native'
import {Container, H2} from 'native-base';
import {IconButton} from "react-native-paper";
import {DateTime} from 'luxon';

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import {getWeekRange,} from "../utils/helpers";
import SummeryView from "../components/summery-view";

export default class WeekView extends React.Component {
    state = {
        weekDay: DateTime.local().startOf('week').toISO()
    };

    getWeek = () => {
        const {start, end} = getWeekRange(this.state.weekDay);
        return `${start.toLocaleString()} - ${end.toLocaleString()}`
    };

    plusWeek = () => {
        this.setState((state) => ({
            weekDay: DateTime.fromISO(state.weekDay).plus({week: 1}).toISO()
        }))
    };

    minusWeek = () => {
        this.setState((state) => ({
            weekDay: DateTime.fromISO(state.weekDay).minus({week: 1}).toISO()
        }))
    };

    render() {
        const {navigation} = this.props;

        return (
            <Container>
                <HeaderBar title="Weekly Earnings" navigation={navigation} addRoute="AddEntry"/>
                <StyledContent>
                    <View style={{flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'center'}}>
                        <IconButton icon="keyboard-arrow-left" onPress={this.minusWeek} size={28}/>
                        <H2 style={{textAlign: 'center', fontWeight: 'bold'}}>
                            {this.getWeek()}
                        </H2>
                        <IconButton icon="keyboard-arrow-right" onPress={this.plusWeek} size={28}/>
                    </View>
                    <SummeryView week={this.state.weekDay} summeryType="weekly" navigation={navigation}/>
                </StyledContent>
            </Container>
        )
    }
}
