const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

//mongoose model based on mongoose schema
const Todo = new mongoose.model("Todo", todoSchema)

//*GET ALL THE TODOS (async await)
router.get('/', async (req, res) => {
    try {
        const data = await Todo.find({});
        res.status(200).json({
            result: data,
            message: "Success"
        })
    }
    catch (err) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
});

//or callback procedure
// router.get('/', (req, res) => {
/////      Todo.find({}, (err, data) => {
//         if (err) {
//             res.status(500).json({
//                 error: "There was a server side error"
//             });
//         }
//         else {
//             res.status(200).json({
//                 result: data,
//                 message: "success"
//             });
//         }
//     }).clone()
// });

//*If we want to get all the items but don't want to get all the field of the item(here we don't need id,date)(callback procedure)
router.get('/todo', (req, res) => {
    Todo.find({}).select({
        _id: 0,
        date: 0
    })
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error"
                });
            }
            else {
                res.status(200).json({
                    result: data,
                    message: "success"
                });
            }
        });

});

//*If we want to get items by implementing pagination. (here we use limit) (callback procedure)
router.get('/todolimit', (req, res) => {
    Todo.find({}).select({
        _id: 0,
        date: 0
    })
        .limit(2)
        .exec((err, data) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error"
                });
            }
            else {
                res.status(200).json({
                    result: data,
                    message: "success"
                });
            }
        });

});

//*GET A TODO BY ID (follow the async await process)
router.get('/:id', async (req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id });
        res.status(200).json({
            result: data,
            message: "success"
        });
    }
    catch (err) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
});

//*POST A TODO (follow the callback function process)
router.post('/', (req, res) => {
    const newTodo = new Todo(req.body);
    newTodo.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error"
            });
        }
        else {
            res.status(200).json({
                message: "Todo was inserted successfully"
            });
        }
    });
});

//*POST MULTIPLE TODOS (async await)
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: "Todo were inserted successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
});

//or callback procedure
// router.post('/all', (req, res) => {
/////     Todo.insertMany(req.body, (err) => {
//         if (err) {
//             res.status(500).json({
//                 error: "There was a server side error"
//             });
//         }
//         else {
//             res.status(200).json({
//                 message: "Todo were inserted successfully"
//             });
//         }
//     })
// });

//*PUT TODO (just update the item) (async await)
router.put('/:id', async (req, res) => {
    try {
        const data = await Todo.updateOne({ _id: req.params.id }, {
            $set: {
                description: req.body.description
            },
        });
        res.status(200).json({
            message: "Todo was updated successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
});

//*find by Id and update (when we want to update any item and get the updated item) (async await)
router.put('/update/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    description: req.body.description
                },
            },
            {
                new: true,
                useFindAndModify: false
            });
        res.status(200).json({
            message: "Todo was updated successfully",
            result: result
        });
    }
    catch (err) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
    console.log(result);
});


//*DELETE TODO (just delete the item) (async await)
router.delete('/:id', async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: "Todo was deleted successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
});

//*find by Id and delete (when we want to delete any item and get the deleted item) (async await)
router.delete('/delete/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({
            message: "Todo was deleted successfully"
        });
        console.log(result);
    }
    catch (err) {
        res.status(500).json({
            error: "There was a server side error"
        });
    }
});

module.exports = router;