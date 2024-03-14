const dal = require("./pg.auth_db");

//get all logins.
var getLogins = function() {
  if(DEBUG) console.log("logins.pg.dal.getLogins()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT id AS _id, username, password, email, uuid FROM public."Logins" \
        ORDER BY id DESC LIMIT 7;`
    dal.query(sql, [], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var getLoginByLoginId = function(id) {
  if(DEBUG) console.log("logins.pg.dal.getLoginByLoginId()");
  return new Promise(function(resolve, reject) {
    const sql = `SELECT id AS _id, username, password, email, uuid FROM public."Logins" WHERE id = $1`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
        // logging should go here
        if(DEBUG) console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    }); 
  }); 
};

var addLogin = function(username, password, email, uuid) {
  if(DEBUG) console.log("logins.pg.dal.addLogin()");
  return new Promise(function(resolve, reject) {
    const sql = `INSERT INTO public."Logins"(username, password, email, uuid) \
        VALUES ($1, $2, $3, $4);`;
    dal.query(sql, [username, password, email, uuid], (err, result) => {
      if (err) {
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var patchLogin = function(id, username, password, email) {
  if(DEBUG) console.log("logins.pg.dal.patchLogin()");
  return new Promise(function(resolve, reject) {
    const sql = `UPDATE public."Logins" SET username=$2, password=$3, email=$4 WHERE id=$1;`;
    dal.query(sql, [id, username, password, email], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

var deleteLogin = function(id) {
  if(DEBUG) console.log("logins.pg.dal.deleteLogin()");
  return new Promise(function(resolve, reject) {
    const sql = `DELETE FROM public."Logins" WHERE id = $1;`;
    dal.query(sql, [id], (err, result) => {
      if (err) {
          reject(err);
        } else {
          resolve(result.rows);
        }
    }); 
  });
};

module.exports = {
  getLogins,
  getLoginByLoginId,
  addLogin,
  patchLogin,
  deleteLogin,
}