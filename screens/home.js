import React from 'react'
import {Container, H1} from 'native-base';
import {DateTime} from 'luxon';

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import SummeryView from "../components/summery-view";

export default class Home extends React.Component {
    render() {
        const {navigation} = this.props;

        return (
            <Container>
                <HeaderBar title="Today's Earnings" navigation={navigation} addRoute="AddEntry"/>
                <StyledContent>
                    <H1 style={{textAlign: 'center', marginBottom: 20, fontWeight: 'bold'}}>
                        {DateTime.local().toLocaleString()}
                    </H1>

                    <SummeryView
                        summeryType="today"
                        navigation={navigation}
                    />
                </StyledContent>
            </Container>
        )
    }
}
