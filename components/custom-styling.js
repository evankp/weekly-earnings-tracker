import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Content, H1, H2, H3, Button} from "native-base";
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

export const SummeryTotal = Styled(H2)`
    text-align: center;
    margin-bottom: 10px;
`;

export const SummeryGoal = Styled(Text)`
    text-align: center; 
    margin-bottom: 25px;
    color: ${Colors.grey};
    font-size: 19px;
`;

export const SummerySubtitle = Styled(H3)`
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
`;

export const CenteredText = Styled(Text)`
    text-align: center;
`;
