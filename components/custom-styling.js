import React from 'react';
import {View, TextInput} from 'react-native';
import {Content, Button, Icon} from "native-base";
import Styled from 'styled-components';

export const StyledContent = Styled(Content)`
    margin: 20px 15px;
`;

export const RowView = Styled(View)`
    flex-direction: row;
`;

export const BorderedTextInput = Styled(TextInput)`
    border: 1px solid black;
    width: 10px;
`;

export class NumberStepper extends React.Component {
    render() {
        return (
            <View>
                <Button bordered>
                    <Icon name="minus" type="MaterialCommunityIcons"/>
                </Button>
                <BorderedTextInput/>
                <Button bordered>
                    <Icon name="plus" type="MaterialCommunityIcons"/>
                </Button>
            </View>
        )
    }
}
