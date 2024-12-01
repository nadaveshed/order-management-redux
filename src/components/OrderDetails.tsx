import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { selectOrder } from '../store/ordersSlice';
import { Box, Paper, Typography, Button } from '@mui/material';
import { OrderDetailsProps } from '../types/order';
import styles from '../styles/OrderDetails.module.scss';

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderId, onClose }) => {
    const dispatch: AppDispatch = useDispatch();
    const { selectedOrder, loading } = useSelector((state: RootState) => state.orders);

    useEffect(() => {
        if (orderId) {
            dispatch(selectOrder(orderId));
        }
    }, [dispatch, orderId]);

    const handleNextStep = () => {
        alert('Next step clicked');
        onClose();
    };

    if (loading) {
        return <Typography variant="h6">Loading order details...</Typography>;
    }

    if (!selectedOrder) {
        return <Typography variant="h6">Order not found.</Typography>;
    }

    return (
        <Box sx={{ marginTop: 4 }}>
            <Typography variant="h5">Order Details</Typography>
            <Paper sx={{ padding: 2, marginTop: 2, boxShadow: 3 }}>
                <Typography variant="h6">Customer: {selectedOrder.customer}</Typography>
                <Typography variant="body1">Status: {selectedOrder.status}</Typography>
                <Typography variant="body1">Items:</Typography>
                <Box sx={{ marginLeft: 2 }}>
                    {selectedOrder.items.map((item, index) => (
                        <Typography key={index} variant="body2">
                            {item.name} - Quantity: {item.quantity}, Price: ${item.price}
                        </Typography>
                    ))}
                </Box>
                <Box className={styles.buttonDiv}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNextStep}
                    >
                        Next Step
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default OrderDetails;
