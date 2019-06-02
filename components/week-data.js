import React from 'react';
import {H2, H3} from "native-base";
import {DateTime} from "luxon";
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

import {filterByDay, filterByWeek, getWeeklyTotal, sortByDate} from "../utils/helpers";
import {Text, View} from "react-native";
import * as Colors from "../utils/colors";
import {CenteredListItem} from "./custom-styling";


class WeekData extends React.Component {
    static propTypes = {
      week: PropTypes.string
    };

    render() {
        return (
            <View>
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
            </View>
        )
    }
}

function mapStateToProps({categories, entries}, {week}) {
    const weekData = filterByWeek(entries, week);
    const filteredData = filterByDay(weekData);

    return {
        categories,
        entries: sortByDate(filteredData, false)
    }
}

export default connect(mapStateToProps)(WeekData)
