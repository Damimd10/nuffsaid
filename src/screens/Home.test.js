import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';

import Home from './Home';
import Api from '../api';

const mockedStop = jest.fn();
const mockedIsStarted = jest.fn();
const mockedStart = jest.fn();

jest.mock('../api.js', () => jest.fn());

describe('<Home />', () => {
  let debug;

  beforeEach(() => {
    Api.mockImplementation(({ messageCallback }) => ({
      messageCallback,
      stop: mockedStop,
      start: mockedStart.mockImplementation(() => {
        messageCallback({
          id: 324,
          message: 'Hello',
          priority: 1,
        });
      }),
      isStarted: mockedIsStarted,
    }));

    ({ debug } = render(<Home />));
  });

  it('should call to api.start() function once', () => {
    expect(mockedStart).toHaveBeenCalledTimes(1);
  });

  it('should render a snackbar with the error message', () => {
    expect(screen.getByRole('alert', { text: /Hello/i })).toBeInTheDocument();
  });

  it('should have just one element with the text "Hello"', () => {
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.getByText('Hello')).toBeInTheDocument(1);
  });
});
