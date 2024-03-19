const dal = require("./pg.auth_db");

//get all logins.
async function getLogins() {
  if(DEBUG) console.log("logins.pg.dal.getLogins()");
  const sql = `SELECT id AS _id, username, password, email, uuid FROM public."Logins" \
        ORDER BY id DESC LIMIT 7;`
  try {
    let results = await dal.query(sql);
    return results.rows;
  } catch (error) {
    console.log(error);
    throw error; 
  }
};

async function getLoginByLoginId(id) {
  if(DEBUG) console.log("logins.pg.dal.getLoginByLoginId()");
  const sql = `SELECT id AS _id, username, password, email, uuid FROM public."Logins" WHERE id = $1`;
  try {
    let result = await dal.query(sql, [id]);
    return result.rows[0];
  } catch (error) { 
    console.log(error);
    throw error; 
  }; 
};

async function addLogin(username, password, email, uuid) {
  if(DEBUG) console.log("logins.pg.dal.addLogin()");
  const sql = `INSERT INTO public."Logins"(username, password, email, uuid) \
        VALUES ($1, $2, $3, $4) RETURNING id;`;
  try {
    let result = await dal.query(sql, [username, password, email, uuid]);
    if(DEBUG) console.log(result);
    return result.rows[0].id;
  } catch (error) { 
    if(error.code === '23505') // unique_violation
      return error.code;
    console.log(error);
    throw error;
  }
};

async function patchLogin(id, username, email) {
  if(DEBUG) console.log("logins.pg.dal.patchLogin()");
  const sql = `UPDATE public."Logins" SET username=$2, email=$3 WHERE id=$1;`;
  try { 
    let result = await dal.query(sql, [id, username, email]);
    // if(DEBUG) console.log(result);
    return result.rowCount;
  } catch (error) { 
    console.log(error);
    throw error;
  }
};

async function deleteLogin(id) {
  if(DEBUG) console.log("logins.pg.dal.deleteLogin()");
  const sql = `DELETE FROM public."Logins" WHERE id = $1;`;
  try {
    let result = await dal.query(sql, [id]);
    // if(DEBUG) console.log(result);
    return result.rowCount;
  } catch (error) { 
    console.log(error);
    throw error;
  }
};

module.exports = {
  getLogins,
  getLoginByLoginId,
  addLogin,
  patchLogin,
  deleteLogin,
}