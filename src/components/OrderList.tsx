import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchOrders, selectOrder } from '../store/ordersSlice';
import { Box, Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import OrderDetails from './OrderDetails';
import styles from '../styles/OrderList.module.scss';

const OrderList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { orders, loading} = useSelector((state: RootState) => state.orders);

    const [openModal, setOpenModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleSelectOrder = (id: number) => {
        dispatch(selectOrder(id));
        setSelectedOrderId(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedOrderId(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, width: '100%' }}>
            <Box sx={{ flex: 1 }}>
                {loading ? (
                    <Typography variant="h6">Loading orders...</Typography>
                ) : orders.length === 0 ? (
                    <Typography variant="h6">No orders available</Typography>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {orders.map((order) => (
                            <Box
                                key={order.id}
                                sx={{
                                    width: { xs: '100%', sm: '45%', md: '30%' },
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Card className={styles.orderCard} sx={{ width: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6">{order.customer}</Typography>
                                        <Typography variant="body2">Status: {order.status}</Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleSelectOrder(order.id)}
                                            className={styles.selectButton}
                                        >
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>

            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogContent>
                    {selectedOrderId ? (
                        <OrderDetails orderId={selectedOrderId} onClose={handleCloseModal} />
                    ) : (
                        <Typography variant="body1">No order selected.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderList;
