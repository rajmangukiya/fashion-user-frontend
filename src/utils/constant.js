export const deliveryStatus = {
    pending: "PENDING",
    dispatched: "DISPATCHED",
    delivered: "DELIVERED",
    cancelled: "CANCELLED",
}

export const deliveryStatusColor = (status) => {
    switch (status) {
        case deliveryStatus.pending:
            return "bg-warning"

        case deliveryStatus.dispatched:
            return "bg-info"

        case deliveryStatus.delivered:
            return "bg-success"

        case deliveryStatus.cancelled:
            return "bg-danger"
    
        default:
            break;
    }
}