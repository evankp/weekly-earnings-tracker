import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import {Container, Icon, H1, H2, H3, Fab} from 'native-base';
import {List} from "react-native-paper";

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import * as Colors from "../utils/colors";
import {getCategoryTotal, getDailyTotal, getPureDate, getWeeklyTotal} from "../utils/helpers";

const ListItemEarnings = (props) => {
    return (
        <H2>
            ${props.earnings}
        </H2>
    )
};

class Home extends React.Component {
    render() {
        const {navigation} = this.props;
        const today = getPureDate(new Date());

        return (
            <Container>
                <HeaderBar title="Today's Earnings" navigation={navigation}/>
                <StyledContent>
                    <H1 style={{textAlign: 'center', marginBottom: 20, fontWeight: 'bold'}}>
                        {today.getUTCMonth() + 1}/{today.getUTCDate()}/{today.getUTCFullYear()}
                    </H1>
                    <H2 style={{
                        textAlign: 'center',
                        marginBottom: 20
                    }}>${getDailyTotal(new Date(), this.props.entries)}</H2>
                    <H3 style={{fontWeight: 'bold', marginBottom: 15}}>Categories</H3>
                    {this.props.categories.length === 0 && (
                        <View>
                            <Text>No current Categories</Text>
                        </View>
                    )}
                    {this.props.categories.length > 0 && (
                        <View>
                            {this.props.categories.map(category => (
                                <List.Item key={category.id} title={category.title} left={(props) => <ListItemEarnings
                                    earnings={getCategoryTotal(category.id, this.props.entries)} {...props}/>}/>
                            ))}
                        </View>
                    )}
                </StyledContent>

                {this.props.categories.length >= 1 && (
                    <Fab active={true}
                         onPress={() => navigation.navigate('AddEntry')}
                         style={{backgroundColor: Colors.black}}>
                        <Icon name="add" type="MaterialIcons"/>
                    </Fab>
                )}
            </Container>
        )
    }
}

function mapStateToProps({categories, entries}) {
    return {
        categories,
        entries
    }
}

export default connect(mapStateToProps)(Home)
