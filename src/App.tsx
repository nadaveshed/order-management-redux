import React from 'react';
import OrderList from './components/OrderList';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => (
    <Provider store={store}>
        <div style={{ display: 'flex', gap: '16px' }}>
            <OrderList />
        </div>
    </Provider>
);

export default App;
