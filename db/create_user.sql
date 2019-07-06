insert into users (name, email, password, username, is_admin)
VALUES (${name}, ${email}, ${hash}, ${username}, false)
RETURNING *;