import React from 'react'
import {Text} from 'react-native'
import {Container, Header, Left, Body, Right, Icon, H1, H2, H3, Button} from 'native-base';
import {NumberStepper, StyledContent} from "../components/custom-styling";

import HeaderBar from '../components/header-bar';

const AddEarnings = ({navigation}) => {
    return (
        <Button transparent onPress={() => navigation.navigate('AddEntry')}>
            <Icon name="add"/>
        </Button>
    )
}

export default class Home extends React.Component {
    state = {
        categories: [
            {id: 1443, title: 'GrubHub Catering'},
            {id: 1444, title: 'GrubHub'},
            {id: 1445, title: 'Amazon'},
        ],

        earnings: [
            {categoryId: 1444, amount: 12},
            {categoryId: 1444, amount: 40.12}
        ]
    };

    getTotalEarningsCategory = id => {
        const earningsCategory = this.state.earnings.filter(listing => listing.categoryId === id);

        return earningsCategory.reduce((a, b) => a + b.amount, 0)
    };

    render() {
        return (
            <Container>
                <HeaderBar title="Today's Earnings" navigation={this.props.navigation}
                           actionButton={<AddEarnings navigation={this.props.navigation}/>}/>
                <StyledContent>
                    <H1>Earnings by Category</H1>
                    {this.state.categories.map(category => (
                        <Text key={category.id}>
                            {category.title}: ${this.getTotalEarningsCategory(category.id)}
                        </Text>
                    ))}
                    <NumberStepper/>
                </StyledContent>
            </Container>
        )
    }
}
