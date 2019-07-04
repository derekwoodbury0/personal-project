update users
set name = ${name},
    email = ${email}
where user_id = ${user_id}
returning *