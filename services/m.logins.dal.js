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

module.exports = {
  getLogins,
  getLoginByLoginId,
}