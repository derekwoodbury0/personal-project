update users
set name = ${name},
    email = ${email},
    username = ${username}
where user_id = ${user_id}
returning *