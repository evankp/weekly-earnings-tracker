import React from 'react';
import {View} from 'react-native';
import {Container, Label, Toast} from 'native-base';
import {Button, Checkbox} from 'react-native-paper';
import {connect} from 'react-redux';
import Styled from 'styled-components';

import {StyledContent} from '../components/custom-styling';
import HeaderBar from '../components/header-bar';
import {initCategories} from '../redux/actions/categories';
import {initEntries} from '../redux/actions/entries';
import {adjustSetting} from '../redux/actions/settings';
import {getAPIData, overWriteAPIData} from '../utils/api';

async function getInitData(dispatch, user) {
    Toast.show({
        text: 'Retrieving Data',
        buttonText: 'Close'
    });

    const data = await getAPIData(user);

    dispatch(initCategories(data.categories));
    dispatch(initEntries(data.entries));

    Toast.show({
        text: 'Data Retrieved',
        buttonText: 'Close'
    });
}

const ButtonLabel = Styled(Label)`
    margin-bottom: 10px;
`;

const Section = Styled(View)`
    margin-bottom: 20px;
`;

class DataOptions extends React.Component {
    state = {
        useDatabase: this.props.databaseSync
    };

    submitSettingChange = (setting, value) => {
        this.props.dispatch(adjustSetting(setting, value));
    };

    checkboxOnChange = () => {
        this.setState((state) => ({useDatabase: !state.useDatabase}), () => {
            this.submitSettingChange('databaseSync', this.state.useDatabase);
        });
    };

    render() {
        const {user, entries, categories, dispatch} = this.props;

        return (
            <Container>
                <HeaderBar title="Data Options" leftBack/>
                <StyledContent>
                    <Section style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Checkbox
                            status={this.state.useDatabase ? 'checked' : 'unchecked'}
                            onPress={() => this.checkboxOnChange()}
                        />
                        <Label>Sync data to database/web</Label>
                    </Section>
                    <Section>
                        <ButtonLabel>Get Data from Database (will overwrite data)</ButtonLabel>
                        <Button mode='contained'
                                onPress={() => getInitData(dispatch, user)}
                                disabled={!user || !this.state.useDatabase}>
                            Get Data
                        </Button>
                    </Section>
                    <Section>
                        <ButtonLabel>Push Data to database</ButtonLabel>
                        <Button mode='contained'
                                onPress={() => overWriteAPIData({entries: entries, categories: categories}, user)}
                                disabled={!user || !this.state.useDatabase}>
                            Overwrite Data
                        </Button>
                    </Section>
                </StyledContent>
            </Container>
        );
    }
};

function mapStateToProps({entries, categories, settings}) {
    return {
        entries,
        categories,
        user: settings.user,
        databaseSync: settings.databaseSync
    };
}

export default connect(mapStateToProps)(DataOptions);