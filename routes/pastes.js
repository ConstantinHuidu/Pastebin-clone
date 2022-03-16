const express = require('express')
const router = express.Router()

const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testbin'
})

connection.connect()

//get all pastes
router.get('/', (req, res) => {
    connection.query(
        "SELECT * FROM pastes",
        (err, result) => {
            res.render('paste_list', { pasteList: result });
        }
    )
});

//render new paste form
router.get('/new', (req, res) => {
    res.render('new_paste')
})

//add paste to db
router.post('/new', (req, res) => {
    const pName = req.body.paste_name;
    const pBody = req.body.paste_body;

    connection.query(
        "INSERT INTO pastes (paste_title, paste_body) VALUES (?, ?)",
        [pName, pBody],
        (err, result) => {
            res.redirect('/pastes');
        }
    )
});


//DELETE PASTE
router.get('/delete', (req, res) => {
    connection.query(
        "DELETE FROM pastes WHERE paste_id = ?", req.query.id, 
        (err, result) => {
            connection.query(
                "SELECT * FROM pastes",
                (err, result) => {
                    res.render('paste_list', { pasteList: result })
                }
            )
        }
    ) 
});
module.exports = router