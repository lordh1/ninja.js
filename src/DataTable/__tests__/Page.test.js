import React from 'react'
import { mount, shallow } from 'enzyme'
import Page from '../Page'

const props = {
  pageNumber: 1,
  currentPageNumber: 1,
  onChange: jest.fn(),
}

it('renders without crashing', () => {
  shallow(<Page {...props} />)
})

it('should call onChange handler when click on component', () => {
  //given
  const wrapper = mount(<Page {...props} />)
  const spyOnClick = jest.spyOn(props, 'onChange')

  //when
  wrapper.find('button').simulate('click')

  //then
  expect(spyOnClick).toHaveBeenCalled()
})

it.each`
  pageNumber | currentPageNumber | pageNumberExpected | activePage
  ${1}       | ${1}              | ${'2'}             | ${true}
  ${1}       | ${2}              | ${'2'}             | ${false}
`(
  'Page number should be $expected and activePage should be $activePage when pageNumber is $pageNumber and currentPageNumber is $currentPageNumber',
  ({ pageNumber, currentPageNumber, pageNumberExpected, activePage }) => {
    //given
    const wrapper = mount(
      <Page
        pageNumber={pageNumber}
        currentPageNumber={currentPageNumber}
        onChange={props.onChange}
      />
    )

    //when
    const button = wrapper.find('button')

    //then
    expect(button.text()).toMatch(pageNumberExpected)
    expect(button.hasClass('button-outline')).toBe(activePage)
  }
)
