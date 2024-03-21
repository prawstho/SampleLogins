const dal = require("./pg.auth_db");

//get all logins.
async function getUsers() {
  if(DEBUG) console.log("users.pg.dal.getUsers()");
  const sql = `SELECT _id, first_name, last_name, username, sms_phone, \ 
                    gender, profile_url, birth_date, join_date \
	              FROM public.users ORDER BY username DESC LIMIT 7;`
  try {
    let results = await dal.query(sql);
    return results.rows;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

async function getUserByUserId(id) {
  if(DEBUG) console.log("users.pg.dal.getUserByUserId()");
  const sql = `SELECT _id, first_name, last_name, username, sms_phone, \ 
          gender, profile_url, birth_date, join_date \
          FROM public.users WHERE _id = $1`;
  try {
    let result = await dal.query(sql, [id]);
    return result.rows[0];
  } catch (error) { 
    console.log(error);
    throw error; 
  }; 
};

module.exports = {
  getUsers,
  getUserByUserId,
}