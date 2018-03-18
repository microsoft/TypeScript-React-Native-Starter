import React from 'react';
import { Text } from 'react-native';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Hello } from '../Hello';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
    const hello = shallow(<Hello name="World" />);
    expect(hello.find(Text).first().render().text()).toEqual("Hello World!");
})