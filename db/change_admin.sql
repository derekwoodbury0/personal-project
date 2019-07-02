update users
set is_admin = $1
where user_id = $2
returning *;