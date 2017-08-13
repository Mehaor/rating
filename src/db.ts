import * as mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_CONNECTION_URL, { server:{ auto_reconnect:true }});

let db = mongoose.connection;

db.on('error', (err) => { 
    console.log('mongo error: ' + err); 
});
db.on('open', () => { console.log('mongo opened') });
db.on('connected', () => { console.log('mongo connected') });
db.on('reconnected', function () {
    console.log('mongo reconnected');
});
db.on('disconnected', function () {
    console.log('mongo disconnected');
});


export default db;