import React from 'react';
import './App.css';
import AuthenticationContextApiProvider from './Context-API/AuthenticationContextApiProvider';
import React_Router from './Router/React_Router';

function App() {

  return (
    <>
      <React.StrictMode>
        <AuthenticationContextApiProvider>
          <React_Router />
        </AuthenticationContextApiProvider>
      </React.StrictMode>
    </>
  )
}

export default App;