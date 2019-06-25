select * from carts
join cart_items on cart_items.cart_id = carts.cart_id
where user_id = $1