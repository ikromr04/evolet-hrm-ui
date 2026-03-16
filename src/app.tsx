import type { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App(): ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
