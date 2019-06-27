import React from 'react';
import {connect} from 'react-redux';
import {Container} from 'native-base';
import {List} from 'react-native-paper';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

import {USER} from '../env-variables';
import {StyledContent} from '../components/custom-styling';
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
    );
});

SettingsLink.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    destination: PropTypes.string.isRequired,
    icon: PropTypes.string,
    style: PropTypes.object
};

const Settings = (props) => {
    return (
        <Container>
            <HeaderBar title="Settings"/>
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
                {(props.user && props.user === USER) && (
                    <SettingsLink
                        title="Data Options"
                        description="Pull data from database, update database, etc."
                        destination="DataOptions"
                        icon="sync"
                    />
                )}
            </StyledContent>
        </Container>
    );
};

function mapStateToProps({categories, entries, settings}) {
    return {
        categories,
        entries,
        user: settings.user
    };
}

export default connect(mapStateToProps)(Settings);
