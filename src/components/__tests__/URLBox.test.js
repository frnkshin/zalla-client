import React from 'react';
import {mount} from 'enzyme';
import URLBox from "components/Form";
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';


it('has a Text Field and a Button', () => {
  const wrapped = mount(<URLBox />);
  expect(wrapped.find(TextField).length).toEqual(1);
  expect(wrapped.find(Button).length).toEqual(1);
});
