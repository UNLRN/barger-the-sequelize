const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', function (req, res) {
    db.burgers.findAll({order: [['burgerName', 'DESC']]}).then(results => {
        res.render('index', { results });
    }).catch(err => {
        console.log(err)
    })
});

router.post('/', function (req, res) {
    let burger = req.body.burgerName
    db.burgers.create({
        burgerName: burger
    }).then(() => {
        res.redirect('/')
    }).catch(err => {
        console.log(err)
    })
})

router.put('/:id', function (req, res) {
    if (req.query.devoured == 'true') {
        db.burgers.update(
            {
                devoured: 0
            },
            {
                where: {
                    id: req.params.id
                }
            }).then(() => res.redirect('/'))
            .catch(err => console.log(err))
    } else {
        db.burgers.update(
            {
                devoured: 1
            },
            {
                where: {
                    id: req.params.id
                }
            }).then(() => res.redirect('/'))
            .catch(err => console.log(err))
    }
})

router.delete('/:id', function (req, res) {
    db.burgers.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    ).then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router;