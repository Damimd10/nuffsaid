import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Header from './Header';

const mockedHandleClear = jest.fn();
const mockedToggleGenerator = jest.fn();

describe('<Header />', () => {
  let rerender;

  beforeEach(() => {
    ({ rerender } = render(
      <Header
        handleClear={mockedHandleClear}
        isStarted={true}
        toggleGenerator={mockedToggleGenerator}
      />,
    ));
  });

  it('should render a button with the label "Stop" by default', () => {
    expect(screen.getByRole('button', { name: /Stop/i })).toBeInTheDocument();
  });

  it('should render a button with the "Clear" label', () => {
    expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument();
  });

  describe('when the "Stop" button is pressed', () => {
    it('should call "toggleGenerator" function once', () => {
      fireEvent.click(screen.getByRole('button', { name: /Stop/i }));

      expect(mockedToggleGenerator).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the "Clear" button is pressed', () => {
    it('should call "handleClear" function once', () => {
      fireEvent.click(screen.getByRole('button', { name: /Clear/i }));

      expect(mockedHandleClear).toHaveBeenCalledTimes(1);
    });
  });

  describe('when isStarted is false', () => {
    it('should render a button with the label "Start"', () => {
      rerender(
        <Header
          handleClear={mockedHandleClear}
          isStarted={false}
          toggleGenerator={mockedToggleGenerator}
        />,
      );

      expect(
        screen.getByRole('button', { name: /Start/i }),
      ).toBeInTheDocument();
    });
  });
});
