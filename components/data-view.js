import React from 'react';
import {View, ScrollView} from "react-native";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import {CenteredListItem} from "./custom-styling";
import {getCategoryTotal, getLocalDateTime} from "../utils/helpers";
import * as Colors from "../utils/colors";

const DataView = ({summeryType, entries, categories, navigation}) => {
    switch (summeryType) {
        case 'today':
            return (
                <ScrollView style={{height: 382}}>
                    {categories.map((category, index) => (
                        <CenteredListItem key={category.id}
                                          title={getCategoryTotal(category.id, entries)}
                                          description={category.title}
                                          style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                                          onPress={() => navigation.navigate('CategorySummery', {
                                              category: {id: category.id, title: category.title},
                                              date: DateTime.local().toISO()
                                          })}
                        />
                    ))}
                </ScrollView>
            );

        case 'daily':
            return (
                <ScrollView style={{height: 382}}>
                    {categories.map((category, index) => (
                        <CenteredListItem key={category.id}
                                          title={getCategoryTotal(category.id, entries, entries[0].date)}
                                          description={category.title}
                                          style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                                          onPress={() => navigation.navigate('CategorySummery', {
                                              category: {id: category.id, title: category.title},
                                              date: navigation.state.params.date
                                          })}
                        />
                    ))}
                </ScrollView>
            );

        case 'weekly':
            return (
                <ScrollView style={{height: 382}}>
                    {entries.map((entry, index) => (
                        <CenteredListItem key={entry.date}
                                          title={entry.amount.toFixed(2)}
                                          description={getLocalDateTime(entry.date)}
                                          style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                                          onPress={() => navigation.navigate('DayView', {date: entry.date})}
                        />
                    ))}
                </ScrollView>
            );

        case 'category':
            return (
                <ScrollView style={{height: 382}}>
                    {entries.map((entry, index) => (
                        <CenteredListItem key={entry.date}
                                          title={entry.amount.toFixed(2)}
                                          description={getLocalDateTime(entry.date)}
                                          style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                        />
                    ))}
                </ScrollView>
            )
    }
};

DataView.propTypes = {
    summeryType: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
};

export default DataView
