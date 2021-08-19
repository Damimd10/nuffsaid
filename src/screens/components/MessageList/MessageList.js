import React from 'react';

import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import { COLORS, LABELS } from '../../../constants';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: ;
  grid-column-gap: 10px;
  justify-items: center;
  margin-top: 20px;
  width: 100%;
`;

const MessageListContainer = styled.div`
  margin: 20px;
  width: 100%;
`;

const Message = styled.div`
  background-color: ${({ type }) => COLORS[type]};
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-top: 10px;
`;

const ClearButton = styled(Button)`
  align-self: end;
`;

const MessageList = ({ clearMessage, messages }) => (
  <Container>
    {Object.keys(messages).map((priority) => (
      <MessageListContainer key={priority} data-testid="message-list">
        <h1>{LABELS[priority]}</h1>
        <p>{`Count ${messages[priority].length}`}</p>
        {messages[priority].map(({ id, message, priority }) => (
          <Message
            key={message}
            data-testid={`message-list-item-priority-${priority}`}
            type={priority}
          >
            <p>{message}</p>
            <ClearButton onClick={() => clearMessage(id, priority)}>
              Clear
            </ClearButton>
          </Message>
        ))}
      </MessageListContainer>
    ))}
  </Container>
);

export default MessageList;
