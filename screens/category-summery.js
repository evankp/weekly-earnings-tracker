import React from 'react'
import {Container, H1} from 'native-base';
import {DateTime} from 'luxon';

import {StyledContent} from "../components/custom-styling";
import HeaderBar from '../components/header-bar';
import SummeryView from '../components/summery-view';

export default class CategorySummery extends React.Component {
    render() {
        const {category: {id, title}, date} = navigation.state.params;

        return (
            <Container>
                <HeaderBar
                    title={`${title} Earnings`}
                    addRoute="AddEntry"
                    addRouteParams={{category: id, date}}
                    leftBack
                />
                <StyledContent>
                    <H1 style={{textAlign: 'center', marginBottom: 20, fontWeight: 'bold'}}>
                        {DateTime.fromISO(date).toLocaleString()}
                    </H1>
                    <SummeryView
                        summeryType="category"
                        navigation={this.props.navigation}
                        categoryID={id}
                    />
                </StyledContent>
            </Container>
        )
    }
}
