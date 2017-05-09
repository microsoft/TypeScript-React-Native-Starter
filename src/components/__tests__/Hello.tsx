import * as React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import Hello from '../Hello';

it('renders correctly with defaults', () => {
    const hello = shallow(<Hello name="World" />);
    expect(hello.find(Text).render().text()).toEqual("Hello World!");
})