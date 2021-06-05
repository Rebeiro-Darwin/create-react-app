import React, { useState } from 'react';
import Modal from './Modal';

function App() {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(true)}>Show Modal</button>
      <Modal title="My Modal" show={show} onClose={() => setShow(false)}>
        <p>This is Modal content</p>
      </Modal>
    </>
  );
}

export default App;