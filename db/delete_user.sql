delete from carts where user_id = $1;

delete from users where user_id = $1;