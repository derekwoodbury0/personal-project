insert into orders (user_id, product_id, order_id, quantity, stripe_id, status)
values (${user_id}, ${product_id}, ${order_id}, ${quantity}, ${stripe_id}, 'Complete');

