import React from 'react'
import {View} from 'react-native'
import {Container, Header, Icon, H1, H2, H3, Button, Row, Form, Item, Input, Label} from 'native-base';

import {StyledContent, RowView} from "../components/custom-styling";

import HeaderBar from '../components/header-bar';

export default class AddEntry extends React.Component {
    render() {
        return (
            <Container>
                <HeaderBar title="Add Entry" navigation={this.props.navigation} leftBack/>
                <StyledContent>
                    <Form>
                        <Row>
                            <Item inlineLabel>
                                <Label>Amount</Label>
                                <Input keyboardType='numeric'/>
                            </Item>
                        </Row>
                    </Form>
                </StyledContent>
            </Container>
        )
    }
}
