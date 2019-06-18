import React from 'react'
import {Body, Button, Header, Icon, Left, Right, Title} from 'native-base';
import PropTypes from 'prop-types'
import includes from 'lodash/includes'

import * as Colors from '../utils/colors'

export default class HeaderBar extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigation: PropTypes.object.isRequired,
        addRoute: PropTypes.string,
        addRouteParams: PropTypes.object,
        leftBack: PropTypes.bool
    };

    static defaultProps = {
        addRouteParams: {}
    };

    static singlePageRoutes = [
        'AddEntry',
        'EditCategory',
        'AddCategory',
        'Settings',
        'Goals',
        'DayView'
    ];

    render() {
        const {navigation} = this.props;

        return (
            <Header style={{backgroundColor: Colors.black}}>
                <Left>
                    {this.props.leftBack && (
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    )}
                </Left>

                <Body>
                <Title>{this.props.title}</Title>
                </Body>

                {!(includes(HeaderBar.singlePageRoutes, navigation.state.routeName)) && (
                    <Right>
                        <Button onPress={() => navigation.navigate(this.props.addRoute, this.props.addRouteParams)} transparent>
                            <Icon name="plus" type="MaterialCommunityIcons" style={{fontSize: 25}}/>
                        </Button>
                    </Right>
                )}
            </Header>
        )
    }
}
