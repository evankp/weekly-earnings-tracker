import React from 'react';
import {Platform, Text, TouchableNativeFeedback, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Content, H2, H3} from "native-base";
import PropTypes from 'prop-types'
import Styled from 'styled-components';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import * as Colors from '../utils/colors';
import {IconButton} from "react-native-paper";
import {removeEntry} from "../redux/actions/entries";

export const StyledContent = Styled(Content)`
    margin: 20px 15px;
`;

const CenteredItemView = Styled(View)`
   align-items: center;
   padding: 15px;
`;

const TouchableNative = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export const EntryButtons = withNavigation((props) => {
    const {entry, navigation, deleteEntry, style} = props;
    return (
        <View style={[{flexDirection: 'row'}, style]}>
            <IconButton icon='edit' onPress={() => navigation.navigate('EditEntry', {id: entry.id})}/>
            <IconButton icon='delete' onPress={() => deleteEntry(entry.id)}/>
        </View>
    )
});
export const CenteredListItem = connect()((props) => {
    const ContentStyles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        text: {
            fontWeight: '100',
            color: Colors.grey
        }
    });

    const Content = (
        <View style={[ContentStyles.container, props.style]}>
            <CenteredItemView>
                <H3>${props.title}</H3>
                <Text style={ContentStyles.text}>{props.description}</Text>
            </CenteredItemView>
            {props.showButtons && (
                <EntryButtons
                    entry={props.entry}
                    deleteEntry={(id) => props.dispatch(removeEntry(id))}
                    style={{marginLeft: 'auto'}}
                />
            )}
        </View>
    );

    if (props.onPress || props.onLongPress) {
        return (
            <TouchableNative onPress={props.onPress} onLongPress={props.onLongPress}>
                {Content}
            </TouchableNative>
        );
    }

    return Content
});

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

export const NavigationView = Styled(View)`
    flex-direction: row;
    margin-bottom: 20;
    align-items: center;
    justify-content: center;
`;

export const DayHeading = Styled(H2)`
    text-align: center;
    font-weight: bold;
`;
