import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import Header from './components/Header';
import MessageList from './components/MessageList';
import Alert from '../components/Alert';

import Api from '../api';

const DEFAULT_MESSAGE_VALUE = { 1: [], 2: [], 3: [] };

const Home = () => {
  const [messages, setMessages] = useState(DEFAULT_MESSAGE_VALUE);
  const [snackbarOptions, setSnackbarOptions] = useState({
    isOpen: false,
    message: null,
  });
  const [isStarted, setIsStarted] = useState(false);

  const apiRef = useRef();

  useEffect(() => {
    apiRef.current = new Api({
      messageCallback: (currentMessage) => {
        if (currentMessage.priority === 1) {
          setSnackbarOptions({
            isOpen: true,
            message: currentMessage.message,
          });
        }

        setMessages((messages) => ({
          ...messages,
          [currentMessage.priority]: [
            currentMessage,
            ...messages[currentMessage.priority],
          ],
        }));
      },
    });

    apiRef.current.start();
    setIsStarted(apiRef.current.isStarted());
    return () => {
      apiRef.current.stop();
      setIsStarted(apiRef.current.isStarted());
    };
  }, []);

  const clearMessage = useCallback((id, priority) => {
    setMessages((messages) => ({
      ...messages,
      [priority]: messages[priority].filter((message) => message.id !== id),
    }));
  }, []);

  const toggleGenerator = useCallback(() => {
    if (apiRef.current.isStarted()) {
      apiRef.current.stop();
      setIsStarted(apiRef.current.isStarted());
    } else {
      apiRef.current.start();
      setIsStarted(apiRef.current.isStarted());
    }
  }, [apiRef, isStarted, setIsStarted]);

  const handleClear = () => setMessages(DEFAULT_MESSAGE_VALUE);

  const handleCloseSnackbar = () =>
    setSnackbarOptions({
      isOpen: false,
      message: null,
    });

  const ActionButton = useMemo(() => {
    return (
      <Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleCloseSnackbar}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Fragment>
    );
  }, [handleCloseSnackbar]);

  return (
    <main>
      <Header
        handleClear={handleClear}
        isStarted={isStarted}
        toggleGenerator={toggleGenerator}
      />
      <MessageList clearMessage={clearMessage} messages={messages} />
      <Snackbar
        action={ActionButton}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={2000}
        open={snackbarOptions.isOpen}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarOptions.message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Home;
