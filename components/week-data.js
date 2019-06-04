import React from 'react';
import {H2, H3} from "native-base";
import {DateTime} from "luxon";
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

import {filterAndJoinByDay, filterByWeek, getWeeklyTotal, sortByDate} from "../utils/helpers";
import {Text, View} from "react-native";
import * as Colors from "../utils/colors";
import {CenteredListItem} from "./custom-styling";


class WeekData extends React.Component {
    static propTypes = {
      week: PropTypes.string
    };

    render() {
        const goalProgress = (this.props.goal - getWeeklyTotal(this.props.entries)).toFixed(2);

        return (
            <View>
                <H2 style={{textAlign: 'center', marginBottom: 10}}>${getWeeklyTotal(this.props.entries)}</H2>
                {this.props.goal !== 0 && (
                    <Text style={{textAlign: 'center', marginBottom: 25, color: Colors.grey, fontSize: 19}}>
                        ${goalProgress >= 0 ? `${goalProgress} left` : `${goalProgress * -1} over`}
                    </Text>
                )}
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
                                          onPress={() => this.props.navigation.navigate('DayView', {date: entry.date})}
                        />
                    ))}
                </View>
            </View>
        )
    }
}

function mapStateToProps({categories, entries, settings}, {week}) {
    const weekData = filterByWeek(entries, week);
    const filteredData = filterAndJoinByDay(weekData);

    return {
        categories,
        entries: sortByDate(filteredData, false),
        goal: settings.goals.weekly
    }
}

export default withNavigation(connect(mapStateToProps)(WeekData))
