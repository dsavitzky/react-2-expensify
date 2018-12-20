import React from 'react'
import { shallow } from 'enzyme'
import DashboardPage from '../../components/DashboardPage'
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}))

test('should render Dashboard Page correctly', () => {

    const wrapper = shallow(<DashboardPage />)
    expect(wrapper).toMatchSnapshot()

})