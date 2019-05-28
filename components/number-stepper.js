import Styled from "styled-components";
import {TextInput, View} from "react-native";
import React from "react";
import PropTypes from "prop-types";
import {Button, Icon} from "native-base";

import * as Colors from "../utils/colors";

const BorderedTextInput = Styled(TextInput)`
    border: 0.8px solid ${Colors.black};
    padding: 5px;
    text-align: center;
    font-size: 20;
    width: 60px;
`;

export default class NumberStepper extends React.Component {
    static defaultProps = {
        step: 1,
        negative: true,
        buttonStyles: {
            borderColor: Colors.black
        },
        iconStyles: {
            color: Colors.black
        }
    };

    static propTypes = {
        onChange: PropTypes.func,
        step: PropTypes.number,
        negative: PropTypes.bool,
        buttonStyles: PropTypes.object,
        onSubmit: PropTypes.func.isRequired
    };

    state = {
        value: '0',
    };

    onChange = (value) => {
        if (Number(value)) {
            this.setState({value});
            if (this.props.onChange) this.props.onChange(Number(value))
        } else if (value === '') {
            this.setState({value});
            if (this.props.onChange) this.props.onChange(0);
        }
    };

    onBlur = () => {
        const {value} = this.state;
        if (Number(value)) {
           this.props.onSubmit(Number(value))
        } else if (value === '') {
            this.setState({value: '0'});
            if (this.props.onChange) this.props.onChange(0);
            this.props.onSubmit(0);
        }
    };

    increment = () => {
        const currNumber = Number(this.state.value);
        const adjustedNumber = currNumber + this.props.step;

        this.setState({value: String(adjustedNumber)});
        this.props.onSubmit(adjustedNumber)
    };

    decrement = () => {
        const currNumber = Number(this.state.value);

        if ((!this.props.negative && currNumber > 0) || this.props.negative) {
            const adjustedNumber = currNumber - this.props.step;

            this.setState({value: String(adjustedNumber)});
            this.props.onSubmit(adjustedNumber)
        }
    };

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <Button onPress={this.decrement} style={this.props.buttonStyles} bordered>
                    <Icon name="minus" type="MaterialCommunityIcons" style={this.props.iconStyles}/>
                </Button>

                <BorderedTextInput keyboardType="numeric" value={this.state.value} onChangeText={this.onChange}
                                   onBlur={this.onBlur}/>

                <Button onPress={this.increment} style={this.props.buttonStyles} bordered>
                    <Icon name="plus" type="MaterialCommunityIcons" style={this.props.iconStyles}/>
                </Button>
            </View>
        )
    }
}
