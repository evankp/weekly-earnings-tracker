import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import {Container, H1, H2, H3} from 'native-base';
import {DateTime} from 'luxon';

import {CenteredListItem, StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import * as Colors from "../utils/colors";
import {filterByDay, getWeeklyTotal, getWeekRange, sortByDate,} from "../utils/helpers";

class WeekView extends React.Component {
    getWeek = () => {
        const {start, end} = getWeekRange();
        return `${start.toLocaleString()} - ${end.toLocaleString()}`
    };

    render() {
        const {navigation} = this.props;

        return (
            <Container>
                <HeaderBar title="Weekly Earnings" navigation={navigation} addRoute="AddEntry"/>
                <StyledContent>
                    <H1 style={{textAlign: 'center', marginBottom: 20, fontWeight: 'bold'}}>
                        {this.getWeek()}
                    </H1>
                    <H2 style={{textAlign: 'center', marginBottom: 10}}>${getWeeklyTotal(this.props.entries)}</H2>
                    <Text style={{textAlign: 'center', marginBottom: 25, color: Colors.grey, fontSize: 19}}>
                        {/* TODO: Allow change of the goal */}
                        ${(500 - getWeeklyTotal(this.props.entries)).toFixed(2)} left
                    </Text>
                    <H3 style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 15}}>Earnings Per Day</H3>

                    {this.props.entries.length === 0 && (
                        <Text style={{textAlign: 'center'}}>No current earnings for the week</Text>
                    )}
                    <View>
                        {this.props.entries.map((entry, index) => (
                            <CenteredListItem key={entry.date}
                                              title={entry.amount.toFixed(2)}
                                              description={DateTime.fromISO(entry.date).toLocaleString()}
                                              style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                            />
                        ))}
                    </View>
                </StyledContent>
            </Container>
        )
    }
}

function mapStateToProps({categories, entries}) {
    return {
        categories,
        entries: sortByDate(filterByDay(entries), false)
    }
}

export default connect(mapStateToProps)(WeekView)
