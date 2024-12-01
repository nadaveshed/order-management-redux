export interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: number;
    customer: string;
    items: OrderItem[];
    status: string;
}

export interface OrderDetailsProps {
    orderId: number;
    onClose: () => void;
}