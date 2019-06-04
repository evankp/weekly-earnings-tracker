import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import {Container, H1, H2, H3} from 'native-base';
import {DateTime} from 'luxon';

import {CenteredListItem, StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import * as Colors from "../utils/colors";
import {filterByDay, getCategoryTotal, getDailyTotal} from "../utils/helpers";

class DayView extends React.Component {
    render() {
        const {navigation, navigation: {state: {params: {date}}}} = this.props;
        const today = DateTime.fromISO(date);
        const goalProgress = (this.props.goal - getDailyTotal(today, this.props.entries)).toFixed(2);
        return (
            <Container>
                <HeaderBar title="Past Day Earnings" navigation={navigation} leftBack/>
                <StyledContent>
                    <H1 style={{textAlign: 'center', marginBottom: 20, fontWeight: 'bold'}}>
                        {today.toLocaleString()}
                    </H1>
                    <H2 style={{
                        textAlign: 'center',
                        marginBottom: 20
                    }}>${getDailyTotal(today, this.props.entries)}</H2>
                    {this.props.goal !== 0 && (
                        <Text style={{textAlign: 'center', marginBottom: 25, color: Colors.grey, fontSize: 19}}>
                            ${goalProgress >= 0 ? `${goalProgress} left` : `${goalProgress * -1} over`}
                        </Text>
                    )}
                    <H3 style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 15}}>Categories</H3>

                    {this.props.categories.length === 0 && (
                        <Text style={{textAlign: 'center'}}>No current Categories</Text>
                    )}
                    {this.props.categories.length > 0 && (
                        <View>
                            {this.props.categories.map((category, index) => (
                                <CenteredListItem key={category.id}
                                                  title={getCategoryTotal(category.id, this.props.entries, this.props.entries[0].date)}
                                                  description={category.title}
                                                  style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                                />
                            ))}
                        </View>
                    )}
                </StyledContent>
            </Container>
        )
    }
}

function mapStateToProps({categories, entries, settings}, {navigation: {state: {params}}}) {
    return {
        categories,
        entries: filterByDay(DateTime.fromISO(params.date), entries),
        goal: settings.goals.daily
    }
}

export default connect(mapStateToProps)(DayView)
