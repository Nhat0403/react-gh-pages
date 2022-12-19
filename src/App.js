import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/react-gh-pages" element={<Browse />} />
        <Route path="/react-gh-pages/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
