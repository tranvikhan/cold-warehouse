import React from "react";
import { Provider } from 'react-redux';
import { configureStore } from './src/redux/store';
import Application from "./index";



export default function App() {
   return(
    <Provider store={configureStore()}>
      <Application />
    </Provider>
    );
}

