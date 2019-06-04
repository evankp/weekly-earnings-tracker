import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Content, H3, Button} from "native-base";
import Styled from 'styled-components';

import * as Colors from '../utils/colors'

export const StyledContent = Styled(Content)`
    margin: 20px 15px;
`;

const CenteredItemButton = Styled(TouchableOpacity)`
   align-items: center;
   padding: 15px;
`;

const CenteredItemView = Styled(View)`
   align-items: center;
   padding: 15px;
`;

export const CenteredListItem = ({title, description, style, onPress}) => {
    if (onPress) {
        return (
            <CenteredItemButton style={style} onPress={onPress}>
                <H3>${title}</H3>
                <Text style={{fontWeight: '100', color: Colors.grey}}>{description}</Text>
            </CenteredItemButton>
        )
    }

    return (
        <CenteredItemView style={style}>
            <H3>${title}</H3>
            <Text style={{fontWeight: '100', color: Colors.grey}}>{description}</Text>
        </CenteredItemView>
    )
};
