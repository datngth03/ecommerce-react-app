// import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './core/store'; // Chúng ta sẽ tạo file này ở bước sau
import AppRouter from './router/AppRouter';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
