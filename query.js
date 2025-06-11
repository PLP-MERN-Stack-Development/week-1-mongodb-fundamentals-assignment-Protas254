//CRUDE OPERATION

db.books.find({ genre: "Fiction" });

db.books.find({ published_year: { $gt: 2000 } });

db.books.find({ author: "George Orwell" });

db.books.updateOne({ title: "1984" },
    { $set: { price:16.99 } }
);

db.books.deleteOne({ title: "Moby Dick" });


//Advanced Queries

db.books.find({in_stock: true, published_year: {$gt:2010}});

db.books.find({},{ title: 1, author: 1, price:1, _id: 0 });

db.books.find().sort({ price: 1 });

db.books.find().sort({ price: -1 });

db.books.find().skip(5).limit(5);


//Aggregation Pipeline

db.books.aggregate([
    { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);

db.books.aggregate([
    { $group: { id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
]);

db.books.aggregate([
    { 
        $project: {
            decade:{
                $concat: [
                    { $substr: ["$published_year", 0, 3] },
                    "0s"
                ]
            }
        }
    },
    { $group: { _id: "$decade", count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
]);


//Indexing

db.books.createIndex({ title: 1 });

db.books.createIndex({ author: 1, published_year: -1 });

db.books.find({ title:"Wuthering Heights"}).explain("executionStats");

