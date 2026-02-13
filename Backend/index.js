/*
//ทำการ import โมดูล http
const http = require('http');
const host = 'localhost';
const port = 8000;

//กำหนดค่าเซิร์ฟเวอร์

const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World! This is my first server.');
}
//run server
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 8000;

let users =[];
let counter = 1;

/*GET /users - ดึงข้อมูลผู้ใช้งานทั้งหมด
POST /users - เพิ่มผู้ใช้งาน
Get /users/:id - ดึงข้อมูลผู้ใช้ตาม ID
PUT /user/:id - เเก้ไขข้อมูลใช้ตาม ID ที่บันทึก
DELETE /user/:id - ลบผู้ใช้ตาม ID ที่บันทึก
*/

// path = GET /users
app.get('/users',(req, res)=>{
    res.json(users);
});

// path = POST /user
app.post('/user',(req, res)=>{
    let user = req.body;
    user.id = counter;
    counter += 1;

    users.push(user);
    res.json({
        massage: 'User added successfully', 
        user:user
    });
});

// path = PUT /user/:id
app.patch('/user/:id', (req, res)=>{
let id = req.params.id;
    let updateUser = req.body;
    // หา user จาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user =>user.id == id);
    res.send(selectedIndex + '');

    //update ข้อมูล users นั้น
    users[selectedIndex].firstname = 
    updateUser.firstname || users[selectedIndex].firstname;


    users[selectedIndex].lastname = 
    updateUser.lastname || users[selectedIndex].lastname;

    if(updateUser.firstname){
        users[selectedIndex].firstname =updateUser.firstname;
    }
    if(updateUser.lastname){
        users[selectedIndex].lastname =updateUser.lastname;
    }

    res.json({
        Message: ' User updates successfully',
        data: {
            user: updateUser,
            indexUpdate: selectedIndex
        }
    });
    //ส่ง users ที่ update กลับไป
});
app.delete('user/:id',(req, res)=>{
    let id = req-params.id;
    //หา index จาก id ที่ต้องลบ
    let selectedIndex = users.findIndex(user => user.id == id);
    user.splice(selectedIndex, 1);
    //ลบ user ออกจาก users
    delete users[selectedIndex];
    res.json({
        message: 'User deleted successfully',
        indexDelete: selectedIndex
    });
});

app.listen(port, ()=>{
    console.log('Server is runing on http://localhost:${port}');
});