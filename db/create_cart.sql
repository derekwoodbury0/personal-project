insert into carts (user_id)
values (${user_id})
returning *;