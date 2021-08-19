import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';

import MessageList from './MessageList';

const mockedClearMessage = jest.fn();
const mockedMessages = {
  1: [
    { message: 'Hello', priority: 1 },
    { message: 'Good bye', priority: 1 },
  ],
  2: [
    { message: 'Ciao', priority: 2 },
    { message: 'Hola', priority: 2 },
  ],
  3: [
    { message: 'Quote', priority: 3 },
    { message: 'Random', priority: 3 },
  ],
};

describe('<MessageList />', () => {
  beforeEach(() => {
    render(
      <MessageList
        clearMessage={mockedClearMessage}
        messages={mockedMessages}
      />,
    );
  });

  it('should render three lists', () => {
    expect(screen.getAllByTestId('message-list')).toHaveLength(3);
  });

  describe('first list', () => {
    it('should render the label "Error Type 1" for the first list', () => {
      expect(screen.getByText('Error Type 1')).toBeInTheDocument();
    });

    it('should render two items', () => {
      expect(
        screen.getAllByTestId('message-list-item-priority-1'),
      ).toHaveLength(2);
    });

    it('should render the first message', () => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });

    it('should render the second message', () => {
      expect(screen.getByText('Good bye')).toBeInTheDocument();
    });
  });

  describe('second list', () => {
    it('should render the label "Warning Type 2" for the second list', () => {
      expect(screen.getByText('Warning Type 2')).toBeInTheDocument();
    });

    it('should render two items', () => {
      expect(
        screen.getAllByTestId('message-list-item-priority-2'),
      ).toHaveLength(2);
    });

    it('should render the first message', () => {
      expect(screen.getByText('Ciao')).toBeInTheDocument();
    });

    it('should render the second message', () => {
      expect(screen.getByText('Hola')).toBeInTheDocument();
    });
  });

  describe('third list', () => {
    it('should render the label "Info Type 3", for the third list', () => {
      expect(screen.getByText('Info Type 3')).toBeInTheDocument();
    });

    it('should render two items', () => {
      expect(
        screen.getAllByTestId('message-list-item-priority-3'),
      ).toHaveLength(2);
    });

    it('should render the first message', () => {
      expect(screen.getByText('Quote')).toBeInTheDocument();
    });

    it('should render the second message', () => {
      expect(screen.getByText('Random')).toBeInTheDocument();
    });
  });

  describe('when the "Clear" button is pressed', () => {
    it('should call the clearMessage function', () => {
      const [firstElement, ...rest] = screen.getAllByRole('button', {
        name: /Clear/i,
      });

      fireEvent.click(firstElement);
      expect(mockedClearMessage).toHaveBeenCalledTimes(1);
    });
  });
});
