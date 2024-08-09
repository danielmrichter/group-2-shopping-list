const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');


// GET Route
router.get('/', (req, res) => {
    const queryText = `SELECT * from "shoppingList"
                        ORDER BY "isBought","itemName"`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((dbErr) => {
        console.log(`Error in GET/api/list`, dbErr);
        res.sendStatus(500);
    })
});

// POST Route
router.post(`/`, (req, res) => {
    // console.log(`We just got a letter in GET/list`, req.body)
    const sqlText = `
    INSERT INTO "shoppingList"
        ("itemName", "itemQuantity", "itemUnit")
	    VALUES
	    ($1, $2, $3);`
    const sqlValues = [req.body.itemName, req.body.itemQuantity, req.body.itemUnit]
    pool.query(sqlText, sqlValues)

    .then(dbRes =>{
        res.sendStatus(201)
    })
    .catch(dbErr => {
        console.log(`Error in POST/list`, dbErr)
        res.sendStatus(500)
    })
})
// PUT Route
router.put('/:id', (req, res) => {
    const data = req.params.id;
    const sqlText = `UPDATE "shoppingList"
                    SET "isBought" = NOT "isBought"
                    WHERE "id" = $1;`
    const sqlValues = [data];
    pool.query(sqlText, sqlValues) 
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('Database error in PUT data:', err);
        res.sendStatus(500);
    })
})


// DELETE Route
router.delete(`/:id`, (req, res) => {
    // console.log(`Uh-oh! DELETE req in /api/list!`, req.params.id)
    const sqlText = `
    DELETE FROM "shoppingList"
        WHERE "id" = $1`
    const sqlValues = [req.params.id]
    pool.query(sqlText, sqlValues)
    .then(dbRes => {
        res.sendStatus(200)
    })
    .catch(dbErr => {
        console.log(`SQL Error in DELETE/api/list!`, dbErr)
        res.sendStatus(500)
    })
})

// PATCH Route
router.patch(`/:id`, (req, res) => {
    // console.log(`PATCHY The pirate reporting for duty!`, req.params.id, req.body)
    const sqlText = `UPDATE "shoppingList"
                        SET "itemName" = $1, "itemQuantity" = $2, "itemUnit" = $3
                        WHERE "id" = $4`
    const sqlValues = [req.body.itemName, req.body.itemQuantity, req.body.itemUnit, req.params.id]
    pool.query(sqlText, sqlValues)
        .then(dbRes => {res.sendStatus(200)})
        .catch(dbErr => {
            console.log(`SQL Error in PATCH/api/list!`, dbErr)
            res.sendStatus(500)
        })
})  

module.exports = router;