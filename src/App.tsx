import * as React from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import {store} from './store/index'


export default function App() {
  return (
    <>
      <Provider store={store}>
        <Routes>
          <Route path="/:p" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/create" replace />} />
        </Routes>
      </Provider>
    </>
  );
}
