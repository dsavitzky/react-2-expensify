import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../components/Header'
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}))

test('should render Header correctly', () => {

    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()

})