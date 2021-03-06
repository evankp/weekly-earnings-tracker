import React from 'react';
import {Container} from 'native-base';
import {DateTime} from 'luxon';
import {connect} from 'react-redux';

import {NavigationView, StyledContent, DayHeading, TextButton} from '../components/custom-styling';
import HeaderBar from '../components/header-bar';
import SummeryView from '../components/summery-view';
import {IconButton} from 'react-native-paper';
import * as Colors from '../utils/colors';
import {Text} from 'react-native';

class Home extends React.Component {
    state = {
        day: DateTime.local().startOf('day').toISO()
    };

    getDay = () => {
        return DateTime.fromISO(this.state.day).toLocaleString();
    };

    resetDay = () => {
        this.props.navigation.setParams({date: DateTime.local().startOf('day').toISO()});
        this.setState({day: DateTime.local().startOf('day').toISO()});
    };

    minusDay = () => {
        const newDate = DateTime.fromISO(this.state.day)
            .minus({days: 1})
            .toISO();

        this.props.navigation.setParams({date: newDate});
        this.setState({day: newDate});
    };

    plusDay = () => {
        const newDate = DateTime.fromISO(this.state.day)
            .plus({days: 1})
            .toISO();

        this.props.navigation.setParams({date: newDate});
        this.setState({day: newDate});
    };

    render() {
        return (
            <Container>
                <HeaderBar title="Daily Earnings" addRoute="AddEntry"/>
                <StyledContent>
                    {this.state.day !== DateTime.local().startOf('day').toISO() && (
                        <TextButton centeredText color={Colors.blue} onPress={() => this.resetDay()}>
                            <Text>Reset to today</Text>
                        </TextButton>
                    )}
                    <NavigationView>
                        <IconButton icon="keyboard-arrow-left" onPress={this.minusDay} size={28}/>
                        <DayHeading>
                            {this.getDay()}
                        </DayHeading>
                        <IconButton icon="keyboard-arrow-right" onPress={this.plusDay} size={28}/>
                    </NavigationView>

                    <SummeryView
                        summeryType="daily"
                    />
                </StyledContent>
            </Container>
        );
    }
}

export default connect(({settings}) => ({settings}))(Home);