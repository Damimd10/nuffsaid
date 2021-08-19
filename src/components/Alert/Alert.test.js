import React from 'react';
import { render } from '@testing-library/react';

import Alert from './Alert';

test('should render a MuiAlert element', () => {
  const { container } = render(<Alert />);
  expect(container.getElementsByClassName('MuiAlert-root').length).toBe(1);
});
