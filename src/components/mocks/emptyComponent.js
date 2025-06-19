import React from 'react';

export default Object.assign(
  ({ children, ...props }) => (
    <div>
      <code>
        <pre>{JSON.stringify(props, null, 4)}</pre>
      </code>
      {children}
    </div>
  ),
  {
    displayName: 'EmptyComponentMock',
  }
);
