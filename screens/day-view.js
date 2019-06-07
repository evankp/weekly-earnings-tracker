import React from 'react'
import {Container, H1} from 'native-base';
import {DateTime} from 'luxon';

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import SummeryView from '../components/summery-view';

export default class DayView extends React.Component {
    render() {
        const {navigation} = this.props;

        return (
            <Container>
                <HeaderBar title="Past Day Earnings" navigation={navigation} leftBack/>
                <StyledContent>
                    <H1 style={{textAlign: 'center', marginBottom: 20, fontWeight: 'bold'}}>
                        {DateTime.fromISO(navigation.state.params.date).toLocaleString()}
                    </H1>
                    <SummeryView
                        summeryType="daily"
                        navigation={this.props.navigation}
                    />
                </StyledContent>
            </Container>
        )
    }
}
