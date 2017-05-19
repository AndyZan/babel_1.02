const MongoClient = require('mongodb').MongoClient;
const aphorisms = require('./aphorisms');

const url = 'mongodb://localhost:27000/aphorisms';

MongoClient.connect(url, function(connectError, db) {
  if (connectError) throw new Error(connectError);

  console.log("Connected correctly to server");

  const collection = db.collection('aphorisms');

  collection.count(function (countError, result) {
      console.log(result);

      if (result == 0) {
          console.log("Collection is empty, insert new aphorisms");
          collection.insertMany(aphorisms, function(insertError, result) {
              if (insertError) throw  new Error(insertError);

              console.log('Insertion is completed');
              db.close();
          });
      } else {
          console.log("Collection is not empty, do nothing");
          db.close();
      }
  });


});
