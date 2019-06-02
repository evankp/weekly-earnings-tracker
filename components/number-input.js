import React from "react";
import PropTypes from "prop-types";
import {TextInput} from "react-native-paper";

export default class NumberInput extends React.Component {
    static defaultProps = {
        step: 1,
        negative: true,
        value: 0
    };

    static propTypes = {
        onChange: PropTypes.func,
        step: PropTypes.number,
        negative: PropTypes.bool,
        onSubmit: PropTypes.func,
        style: PropTypes.object,
        mode: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.number
    };

    state = {
        value: String(this.props.value),
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
            if (this.props.onSubmit) this.props.onSubmit(Number(value))
        } else if (value === '') {
            this.setState({value: '0'});
            if (this.props.onChange) this.props.onChange(0);
            if (this.props.onSubmit) this.props.onSubmit(0);
        }
    };

    render() {
        return (
            <TextInput keyboardType="numeric" value={this.state.value} onChangeText={this.onChange}
                       onBlur={this.onBlur} style={this.props.style} mode={this.props.mode} label={this.props.label}/>
        )
    }
}
