select * from carts
Join cart_items on cart_items.cart_id = carts.cart_id
join products on products.product_id = cart_items.product_id
where user_id = $1