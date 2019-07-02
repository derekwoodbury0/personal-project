select users.user_id, name, email, order_id, product_name, price, quantity from products
inner join orders on orders.product_id = products.product_id
inner join users on users.user_id = orders.user_id
order by order_id asc;