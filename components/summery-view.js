import React from 'react';
import {View} from "react-native";
import {DateTime} from "luxon";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import DataView from './data-view';
import {
    filterAndJoinByDay,
    filterByDay,
    filterByWeek, getCategoryTotal,
    getDailyTotal,
    getWeeklyTotal,
    sortByDate
} from "../utils/helpers";
import {CenteredText, SummeryGoal, SummerySubtitle, SummeryTotal} from "./custom-styling";

class SummeryView extends React.Component {
    static propTypes = {
        week: PropTypes.string,
        summeryType: PropTypes.oneOf(['daily', 'weekly', 'today', 'category']).isRequired,
        navigation: PropTypes.object.isRequired,
        categoryID: PropTypes.string
    };

    getTotal = () => {
        const {navigation: {state: {params}}} = this.props;
        switch (this.props.summeryType) {
            case 'weekly':
                return getWeeklyTotal(this.props.entries);

            case 'today':
                return getDailyTotal(DateTime.local(), this.props.entries);

            case 'daily':
                return getDailyTotal(DateTime.fromISO(params.date), this.props.entries);

            case 'category':
                return getCategoryTotal(this.props.categoryID, this.props.entries);
        }
    };

    render() {
        const goalProgress = this.props.summeryType !== 'category' ? (this.props.goal - this.getTotal()).toFixed(2) : null;

        return (
            <View>
                <SummeryTotal>${this.getTotal()}</SummeryTotal>
                {(this.props.summeryType !== 'category' && this.props.goal !== 0) && (
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

                {this.props.summeryType === 'category' && (
                    <View>
                        <SummerySubtitle>Category earnings</SummerySubtitle>

                        {this.props.entries.length === 0 && (
                            <CenteredText>No current earnings for the category</CenteredText>
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

function mapStateToProps({categories, entries, settings}, {week, summeryType, navigation: {state: {params}}, categoryID}) {
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
            };

        case 'category':
            return {
                categories,
                category: categories.find(category => category.id === categoryID),
                entries: filterByDay(DateTime.fromISO(params.date), entries.filter(entry => entry.category === categoryID))
            };
    }
}

export default connect(mapStateToProps)(SummeryView)
