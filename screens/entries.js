import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import {Container, Icon, H1, H2, H3, Toast, Fab} from 'native-base';
import {IconButton, List} from "react-native-paper";
import {DateTime} from 'luxon';

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import * as Colors from "../utils/colors";
import {getCategoryTotal, getDailyTotal, getWeeklyTotal, sortByDate} from "../utils/helpers";
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
        <Text>{date.toLocaleString()}</Text>
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
        const {navigation} = this.props;
        return (
            <Container>
                <HeaderBar title="Entry History" navigation={this.props.navigation}/>
                <StyledContent>
                    {this.props.entries.length === 0 && (
                        <Text style={{textAlign: 'center'}}>
                            No Entries
                        </Text>
                    )}
                    {this.props.entries.map((entry, index) => (
                        <List.Item key={entry.id}
                                   title={<EntryAmountDate categories={this.props.categories} entry={entry} amount={entry.amount}/>}
                                   description={<CategoryTitle date={DateTime.fromISO(entry.date)}/>}
                                   style={{backgroundColor: (index % 2) === 0 ? Colors.lightGrey : Colors.white}}
                                   right={(props) => <IconButton icon='delete' onPress={() => this.deleteEntry(entry.id)} {...props}/>}
                        />
                    ))}
                </StyledContent>
                <Fab active={true}
                         onPress={() => navigation.navigate('AddEntry')}
                         style={{backgroundColor: Colors.black}}>
                        <Icon name="add" type="MaterialIcons"/>
                    </Fab>
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
