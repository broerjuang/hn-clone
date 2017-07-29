// @flow
import React from 'react';
import {render} from 'react-dom';

function App() {
  return (
    <div className="gray">
      <h1>Hello</h1>
    </div>
  );
}

render(<App />, document.getElementById('root'));
