import React from 'react'
import { shallow } from 'enzyme'
import NotFoundPage from '../../components/NotFoundPage'
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}))

test('should render Dashboard Page correctly', () => {

    const wrapper = shallow(<NotFoundPage />)
    expect(wrapper).toMatchSnapshot()

})