import React from 'react'
import {Text} from 'react-native'
import {Container, Header, Content, Left, Body, Right, Title, Button, Icon} from 'native-base';
import PropTypes from 'prop-types'

import * as Colors from '../utils/colors'

export default class HeaderBar extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigation: PropTypes.object.isRequired,
        actionButton: PropTypes.element,
        leftBack: PropTypes.bool
    };

    render() {
        const {openDrawer, goBack} = this.props.navigation;

        return (
            <Header style={{backgroundColor: Colors.black}}>
                <Left>
                    <Button transparent onPress={() => this.props.leftBack ? goBack() : openDrawer()}>
                        <Icon name={this.props.leftBack ? 'arrow-back' : 'menu'}/>
                    </Button>
                </Left>

                <Body>
                    <Title>{this.props.title}</Title>
                </Body>

                {this.props.actionButton && (
                    <Right>
                        {this.props.actionButton}
                    </Right>
                )}
            </Header>
        )
    }
}
