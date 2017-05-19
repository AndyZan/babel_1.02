import express from 'express';
import {MongoClient, ObjectId} from 'mongodb';
import bodyParser from 'body-parser';

const url = 'mongodb://localhost:27000/aphorisms';
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

router.get("/aphorisms", (req, res, next) => {
    MongoClient.connect(url, (connectError, db) => {
        if (connectError) {
            throw new Error(connectError);
        }

        const collection = db.collection('aphorisms');

        collection.find({}).toArray((findError, aphorisms) => {
            if (findError) {
                throw new Error(findError);
            }

            db.close();

            res.json(aphorisms);
            next();
        });
    });
});

router.param('aphorism_id', function(req, res, next, id) {
    // sample user, would actually fetch from DB, etc...
    req.aphorism = {

        id: id
    };
    next();
});


router.route('/aphorisms/:aphorism_id')
    .delete((req, res, next) => {
        MongoClient.connect(url, function (connectError, db) {
            if (connectError) {
                throw new Error(connectError);
            }

            console.log("id is %s", req.aphorism.id);

            db
                .collection('aphorisms')
                .remove(
                    {
                        _id: ObjectId(req.aphorism.id)
                    },
                    findError => {
                        if (findError) {
                            throw new Error(findError);
                        }

                        db.close();
                        res.json({ok: 'ok'});
                        next();
                    }
                )
        })
    });

app.use(router);

const port = 3000;

app.listen(port, () =>
    console.log('work on port ' + port)
);
