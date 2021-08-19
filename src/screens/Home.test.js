import React from 'react';
import { screen, render } from '@testing-library/react';

import Home from './Home';
import Api from '../api';

const mockedStop = jest.fn();
const mockedStart = jest.fn(() => {
  console.log('HERE');
  expect(false).toBe(true);
  this.messageCallback({
    id: 21321,
    message: 'Hello',
    priority: 1,
  });
});
const mockedIsStarted = jest.fn();

jest.mock('../api.js');

describe('<Home />', () => {
  let debug;

  beforeEach(() => {
    Api.mockImplementation(({ messageCallback }) => ({
      messageCallback,
      stop: mockedStop,
      start: mockedStart,
      isStarted: mockedIsStarted,
    }));

    ({ debug } = render(<Home />));
  });

  it('should call to api.start() function once', () => {
    expect(mockedStart).toHaveBeenCalledTimes(1);
  });

  it('should', () => {
    // expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
