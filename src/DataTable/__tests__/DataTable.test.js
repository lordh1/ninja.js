import React from 'react';
import { mount } from 'enzyme';
import DataTable from '../index';
import Page from '../Page';

const rows = [
  {
    name1: 'Mads L. Klausen',
    email: 'MadsLKlausen@jourrapide.com',
    edit_path: 'http://google.com',
    per_id: 1,
  },
  {
    name1: 'Alfred K. Krogh',
    email: 'AlfredKKrogh@armyspy.com',
    edit_path: 'http://google.com',
    per_id: 2,
  },
  {
    name1: 'Silas L. Bertelsen',
    email: 'SilasLBertelsen@armyspy.com',
    edit_path: 'http://google.com',
    per_id: 3,
  },
  {
    name1: 'Mia A. Johnsen',
    email: 'MiaAJohnsen@dayrep.com',
    edit_path: 'http://google.com',
    per_id: 4,
  },
  {
    name1: 'Alfred S. Schou',
    email: 'AlfredSSchou@jourrapide.com',
    edit_path: 'http://google.com',
    per_id: 5,
  },
];

it('renders without crashing', () => {
  mount(<DataTable rows={[]} locale="da" rowsPerPage={5} />);
});

it('renders 5 rows', () => {
  //given
  const wrapper = mount(<DataTable rows={rows} locale="da" rowsPerPage={5} />);

  //when
  const rowsFound = wrapper.find('tr');

  //then
  expect(rowsFound.length).toBe(5);
});

it('renders 0 rows', () => {
  //given
  const wrapper = mount(<DataTable rows={[]} locale="da" rowsPerPage={0} />);

  //when
  const rowsFound = wrapper.find('tr');

  //then
  expect(rowsFound.length).toBe(0);
});

it('go to the second page', () => {
  //given
  const wrapper = mount(<DataTable rows={rows} locale="da" rowsPerPage={3} />);

  //when
  wrapper.find(Page).at(1).find('button').simulate('click');
  const rowsFound = wrapper.find('tr');

  //then
  expect(rowsFound.length).toBe(2);
});

it('filters rows based on input - results found', () => {
  //given
  const wrapper = mount(<DataTable rows={rows} locale="da" rowsPerPage={5} />);

  //when
  wrapper.find('input').simulate('change', { target: { value: 'k' } });
  const rowsFound = wrapper.find('tr');

  //then
  expect(rowsFound.length).toBe(2);
});

it('filters rows based on input - no results', () => {
  //given
  const wrapper = mount(<DataTable rows={rows} locale="da" rowsPerPage={5} />);

  //when
  wrapper.find('input').simulate('change', { target: { value: 'keweqweqwe' } });
  const rowsFound = wrapper.find('tr');

  //then
  expect(rowsFound.length).toBe(0);
});

it('filters rows based on input - reset filter', () => {
  //given
  const wrapper = mount(<DataTable rows={rows} locale="da" rowsPerPage={5} />);

  //when
  wrapper.find('input').simulate('change', { target: { value: '' } });
  const rowsFound = wrapper.find('tr');

  //then
  expect(rowsFound.length).toBe(5);
});
