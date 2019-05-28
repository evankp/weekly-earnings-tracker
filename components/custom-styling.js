import React from 'react';
import {View, TextInput} from 'react-native';
import {Content, Button, Icon} from "native-base";
import Styled from 'styled-components';

import * as Colors from '../utils/colors'

export const StyledContent = Styled(Content)`
    margin: 20px 15px;
`;

export const RowView = Styled(View)`
    flex-direction: row;
`;
