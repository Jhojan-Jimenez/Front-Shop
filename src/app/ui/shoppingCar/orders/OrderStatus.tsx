import {
	FaCheckCircle,
	FaTimesCircle,
	FaTruck,
	FaCalendarCheck,
} from 'react-icons/fa';

export default function OrderStatus({ orderStatus }: { orderStatus: string }) {
	switch (orderStatus) {
		case 'not_processed':
			return <FaTimesCircle />;
		case 'processed':
			return <FaCheckCircle />;
		case 'shipping':
			return <FaTruck />;
		case 'delivered':
			return <FaCalendarCheck />;
		case 'cancelled':
			return <FaTimesCircle />;
		default:
			return null;
	}
}
