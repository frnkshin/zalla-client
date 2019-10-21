import React from 'react';
import {shallow} from 'enzyme';
import Root from 'controller/Root/Root';
import URLBox from "components/Form";
import {NotificationBar} from "components/MainBar";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it('shows a URL Box', () => {
  expect(wrapped.find(URLBox).length).toEqual(1);
});

it('shows NotificationBar if error', () => {
  wrapped.setState({bar: {show: true, msg: ""}}, () => {
    expect(wrapped.find(NotificationBar).length).toEqual(1);
  })
});
