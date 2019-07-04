update orders
set status = 'Refunded'
where order_id = $1;