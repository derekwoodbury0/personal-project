update users
set profile_image = ${profile_image}
where user_id = ${user_id};

select * from users
where user_id = ${user_id};