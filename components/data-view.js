import React from 'react';
import {View} from "react-native";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import {CenteredListItem} from "./custom-styling";
import {getCategoryTotal} from "../utils/helpers";
import * as Colors from "../utils/colors";

const DataView = ({summeryType, entries, categories, navigation}) => {
    switch (summeryType) {
        case 'today':
            return (
                <View>
                    {categories.map((category, index) => (
                        <CenteredListItem key={category.id}
                                          title={getCategoryTotal(category.id, entries)}
                                          description={category.title}
                                          style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                        />
                    ))}
                </View>
            );

        case 'daily':
            return (
                <View>
                    {categories.map((category, index) => (
                        <CenteredListItem key={category.id}
                                          title={getCategoryTotal(category.id, entries, entries[0].date)}
                                          description={category.title}
                                          style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                        />
                    ))}
                </View>
            );

        case 'weekly':
            return (
                <View>
                    {entries.map((entry, index) => (
                        <CenteredListItem key={entry.date}
                                          title={entry.amount.toFixed(2)}
                                          description={DateTime.fromISO(entry.date).toLocaleString()}
                                          style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                                          onLongPress={() => navigation.navigate('DayView', {date: entry.date})}
                        />
                    ))}
                </View>
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
