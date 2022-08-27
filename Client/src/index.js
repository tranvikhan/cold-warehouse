import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ToastProvider} from 'react-toast-notifications'
//import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';

ReactDOM.render(
    <Provider store={configureStore()}>
        <ToastProvider placement ='bottom-right' autoDismissTimeout={5000}>
            <App />
        </ToastProvider> 
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
