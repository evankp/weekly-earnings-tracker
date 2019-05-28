import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import {Container, Icon, H1, Fab} from 'native-base';

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import * as Colors from "../utils/colors";

class Home extends React.Component {
    getTotalEarningsCategory = id => {
        const earningsCategory = this.props.entries.filter(listing => listing.category === id);

        return earningsCategory.reduce((a, b) => a + b.amount, 0)
    };

    render() {
        const {navigation} = this.props;
        console.log(this.props.entries);
        return (
            <Container>
                <HeaderBar title="Today's Earnings" navigation={navigation}/>
                <StyledContent>
                    <H1>Earnings by Category</H1>
                    {this.props.categories === [] && (
                        <View>
                            <Text>No current Categories</Text>
                        </View>
                    )}
                    {this.props.categories !== [] && (
                        <View>
                            {this.props.categories.map(category => (
                                <Text key={category.id}>
                                    {category.title}: ${this.getTotalEarningsCategory(category.id)}
                                </Text>
                            ))}
                        </View>
                    )}
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
        entries
    }
}

export default connect(mapStateToProps)(Home)
