const { ObjectId } = require("mongodb");
const dal = require("./m.auth_db.js");

async function getLogins() {
  if(DEBUG) console.log("Auth.mongo.dal.getLogins()");
  try {
    await dal.connect();
    const cursor = dal.db("Auth").collection("logins").find();
    const results = await cursor.toArray();
    return results;
  } catch(error) {
    console.log(error);
  } finally {
    dal.close();
  }
};

async function getLoginByLoginId(id) {
  if(DEBUG) console.log("Auth.mongo.dal.getLoginByLoginId()");
  try {
    await dal.connect();
    const database = dal.db("Auth");
    const collection = database.collection("logins");
    const result = await collection.find({ _id: new ObjectId(id) }).toArray();
    if(DEBUG) console.log(result);
    return result;
  } catch(error) {
    console.error('Error occurred while connecting to MongoDB:', error);
    throw error;
  } finally {
    dal.close();
  }
};
async function addLogin(username, password, email, uuid) {
  if(DEBUG) console.log("logins.mongo.dal.addLogin()");
//  let newLogin = JSON.parse(`{ "username": "` + username + `", "password": "` + password + `" }`);
  let newLogin = JSON.parse(`{ "username": "${username}", "password": "${password}" \
                              , "email": "${email}", "uuid": "${uuid}" }`);
  if(DEBUG) console.log(newLogin);
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("logins").insertOne(newLogin);
    return result.insertedId;
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
};
async function patchLogin(id, username, password, email) {
  if(DEBUG) console.log("logins.mongo.dal.patchLogin()");
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("logins")
      .updateOne({_id: new ObjectId(id)},
        {$set: {username: username, password: password, email: email}},
        {upsert: true, returnDocument: 'after'}
        );
    return result;
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
};

async function deleteLogin(id) {
  if(DEBUG) console.log("logins.mongo.dal.deleteLogin()");
  try {
    await dal.connect();
    const result = await dal.db("Auth").collection("logins").deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch(error) {
    console.log(error);
    throw error;
  } finally {
    dal.close();
  }
};

module.exports = {
  getLogins,
  getLoginByLoginId,
  addLogin,
  patchLogin,
  deleteLogin,
}