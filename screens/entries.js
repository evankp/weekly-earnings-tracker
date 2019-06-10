import React from 'react'
import {Text} from 'react-native'
import {connect} from 'react-redux'
import {Container, Toast} from 'native-base';
import {List} from "react-native-paper";
import {DateTime} from 'luxon';

import {EntryButtons, StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import * as Colors from "../utils/colors";
import {getLocalDateTime, sortByDate} from "../utils/helpers";
import {removeEntry} from "../redux/actions/entries";

const EntryAmountDate = ({categories, entry, amount}) => {
    return (
        <Text>
            {categories.find(category => category.id === entry.category).title}: ${amount.toFixed(2)}
        </Text>
    )
};

const CategoryTitle = ({date}) => {
    return (
        <Text>{getLocalDateTime(date.toISO())}</Text>
    )
};

class Entries extends React.Component {
    deleteEntry = (id) => {
        this.props.dispatch(removeEntry(id));
        Toast.show({
            text: 'Entry deleted',
            buttonText: 'Close'
        })
    };

    render() {
        return (
            <Container>
                <HeaderBar title="Entry History" navigation={this.props.navigation} addRoute="AddEntry"/>
                <StyledContent>
                    {this.props.entries.length === 0 && (
                        <Text style={{textAlign: 'center'}}>
                            No Entries
                        </Text>
                    )}
                    {this.props.entries.map((entry, index) => (
                        <List.Item key={entry.id}
                                   title={<EntryAmountDate categories={this.props.categories} entry={entry}
                                                           amount={entry.amount}/>}
                                   description={<CategoryTitle date={DateTime.fromISO(entry.date)}/>}
                                   style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                                   right={(props) => <EntryButtons entry={entry} deleteEntry={this.deleteEntry} {...props}/>}
                        />
                    ))}
                </StyledContent>
            </Container>
        )
    }
}

function mapStateToProps({categories, entries}) {
    return {
        categories,
        entries: sortByDate(entries)
    }
}

export default connect(mapStateToProps)(Entries)
