import React from 'react'
import {connect} from 'react-redux'
import {Container} from 'native-base';
import {List} from "react-native-paper";
import {withNavigation} from 'react-navigation'

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';

const SettingsLink = withNavigation((props) => {
    return (
        <List.Item
            title={props.title}
            description={props.description}
            left={(leftProps) => <List.Icon icon={props.icon} {...leftProps}/>}
            right={(rightProps) => <List.Icon icon="keyboard-arrow-right" {...rightProps}/>}
            onPress={() => props.navigation.navigate(props.destination)}
            style={props.style}
        />
    )
});

class Settings extends React.Component {
    render() {
        const {navigation} = this.props;

        return (
            <Container>
                <HeaderBar title="Settings" navigation={navigation}/>
                <StyledContent>
                    <SettingsLink
                        title="Categories"
                        destination="Categories"
                        icon="list"
                    />
                    <SettingsLink
                        title="Goals"
                        description="How much you want to earn"
                        destination="Goals"
                        icon="playlist-add-check"
                    />
                </StyledContent>
            </Container>
        )
    }
}

function mapStateToProps({categories, entries}) {
    return {
        categories,
        entries
    }
}

export default connect(mapStateToProps)(Settings)
