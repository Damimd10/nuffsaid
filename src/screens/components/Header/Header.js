import React from 'react';

import { Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

import { COLORS } from '../../../constants';

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(COLORS[3]),
    backgroundColor: COLORS[3],
    '&:hover': {
      backgroundColor: COLORS[3],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  '& > *': {
    margin: theme.spacing(1);
  }
`;

const Header = ({ handleClear, isStarted, toggleGenerator }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <ColorButton onClick={toggleGenerator} variant="contained">
        {isStarted ? 'Stop' : 'Start'}
      </ColorButton>
      <ColorButton onClick={handleClear} variant="contained">
        Clear
      </ColorButton>
    </Container>
  );
};

export default Header;
