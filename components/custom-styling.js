import React from 'react';
import {Platform, Text, TouchableNativeFeedback, TouchableOpacity, View} from 'react-native';
import {Content, H2, H3} from "native-base";
import PropTypes from 'prop-types'
import Styled from 'styled-components';

import * as Colors from '../utils/colors';

export const StyledContent = Styled(Content)`
    margin: 20px 15px;
`;

const CenteredItemView = Styled(View)`
   align-items: center;
   padding: 15px;
`;

const TouchableNative = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export const CenteredListItem = ({title, description, style, onPress, onLongPress}) => {
    if (onPress || onLongPress) {
        return (
            <TouchableNative onPress={onPress} onLongPress={onLongPress}>
                <View style={[{alignItems: 'center', padding: 15}, style]}>
                    <H3>${title}</H3>
                    <Text style={{fontWeight: '100', color: Colors.grey}}>{description}</Text>
                </View>
            </TouchableNative>
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

export const TextButton = (props) => {
    const centeredTextStyle = props.centeredText ? {textAlign: 'center'} : null;

    return (
        <TouchableOpacity {...props}>
            <Text style={[{fontWeight: 'bold', color: props.color}, centeredTextStyle]}>{props.children}</Text>
        </TouchableOpacity>
    )
};

TextButton.propTypes = {
    centeredText: PropTypes.bool,
    color: PropTypes.string
};
