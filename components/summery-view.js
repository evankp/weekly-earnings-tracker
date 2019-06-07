import React from 'react';
import {View} from "react-native";
import {DateTime} from "luxon";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import DataView from './data-view';
import {
    filterAndJoinByDay,
    filterByDay,
    filterByWeek,
    getDailyTotal,
    getWeeklyTotal,
    sortByDate
} from "../utils/helpers";
import {CenteredText, SummeryGoal, SummerySubtitle, SummeryTotal} from "./custom-styling";

class SummeryView extends React.Component {
    static propTypes = {
        week: PropTypes.string,
        summeryType: PropTypes.oneOf(['daily', 'weekly', 'today']).isRequired,
        navigation: PropTypes.object.isRequired
    };

    render() {
        const {navigation: {state: {params}}} = this.props;

        const total = this.props.summeryType === 'weekly'
            ? getWeeklyTotal(this.props.entries)
            : this.props.summeryType === 'today'
                ? getDailyTotal(DateTime.local(), this.props.entries)
                : getDailyTotal(DateTime.fromISO(params.date), this.props.entries);

        const goalProgress = (this.props.goal - total).toFixed(2);

        return (
            <View>
                <SummeryTotal>${total}</SummeryTotal>
                {this.props.goal !== 0 && (
                    <SummeryGoal>
                        ${goalProgress >= 0 ? `${goalProgress} left` : `${goalProgress * -1} over`}
                    </SummeryGoal>
                )}

                {this.props.summeryType === 'weekly' && (
                    <View>
                        <SummerySubtitle>Earnings Per Day</SummerySubtitle>

                        {this.props.entries.length === 0 && (
                            <CenteredText>No current earnings for the week</CenteredText>
                        )}
                    </View>
                )}

                {['daily', 'today'].includes(this.props.summeryType) && (
                    <View>
                        <SummerySubtitle>Categories</SummerySubtitle>

                        {this.props.length === 0 && (
                            <CenteredText>Please add a category!</CenteredText>
                        )}
                    </View>
                )}

                <DataView
                    navigation={this.props.navigation}
                    categories={this.props.categories}
                    entries={this.props.entries}
                    summeryType={this.props.summeryType}
                />
            </View>
        )
    }
}

function mapStateToProps({categories, entries, settings}, {week, summeryType, navigation}) {
    switch (summeryType) {
        case 'weekly':
            const weekData = filterByWeek(entries, week);
            const filteredData = filterAndJoinByDay(weekData);

            return {
                categories,
                entries: sortByDate(filteredData, false),
                goal: settings.goals.weekly
            };

        case 'daily':
            const {params} = navigation.state;

            return {
                categories,
                entries: filterByDay(DateTime.fromISO(params.date), entries),
                goal: settings.goals.daily
            };

        case 'today':
            return {
                categories,
                entries,
                goal: settings.goals.daily
            }
    }
}

export default connect(mapStateToProps)(SummeryView)
