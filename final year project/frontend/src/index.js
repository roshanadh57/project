import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider} from "react-alert";
import AlertTemplate from "react-alert-template-basic";
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

const options={
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  
};

ReactDOM.render(
   <Provider store ={store}>
    {/* /* wrapping app js file into AlertProvider  */}
     <AlertProvider template = {AlertTemplate} {...options}>
      <App />
      {/* <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>}></Route>

          </Routes>

        
        </BrowserRouter>

      </React.StrictMode>, */}
      
    </AlertProvider> 

  
  </Provider>,
  document.getElementById('root')
);


