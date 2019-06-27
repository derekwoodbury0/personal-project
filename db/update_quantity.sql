update cart_items
set quantity = ${quantity}
where product_id = ${product_id}
and cart_id = ${cart_id};
