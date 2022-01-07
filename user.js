const mysql = require("mysql");
const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
    host:'localhost',
    user:'root',
    password:'cdac',
    database: 'project1',
};

async function connectionCheck(){
    const connection = mysql.createConnection(dbinfo);
   await connection.connectAsync();
    // console.log("Connection Successfully");
   await connection.endAsync();

}

// connectionCheck();
async function addUser(user){
    const connection = mysql.createConnection(dbinfo);
   await connection.connectAsync();
    console.log("Connection Successfully");

    const sql = `INSERT INTO MESSAGE (messages) values(?)`;

    await connection.queryAsync(sql,[user.messages]);
    await connection.endAsync();
   console.log("Record Added");
}

async function selectUser(){
    const connection = mysql.createConnection(dbinfo);
   await connection.connectAsync();
    console.log("Connection Successfully");

    let sql = `select * from message`;
    const list = await connection.queryAsync(sql,[]);
   await connection.endAsync();
   console.log(list);
   return list;
}
// const user = {messages:"whats app"};
// addUser(user);

//  selectUser();

module.exports={addUser,selectUser};



