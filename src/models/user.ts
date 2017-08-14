import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import * as jwt from 'jsonwebtoken';

(mongoose as any).Promise = global.Promise;

interface IUSerSchema extends mongoose.Document {
    username: string;
    nickname: string;
    jwt?: string,
    email?: string,
    password?: string,
    avatar?: string,
    socialType?: string,
    socialUid?: string,
    socialUrl?: string,
    isModerator?: boolean,
    isSuperUser?: boolean,
}

export interface IUserModel extends mongoose.Model<IUSerSchema> {
    findOneOrCreate: (conditions: any, userData: any, callback: (err: any, user: any) => any) => any
}

export const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, index: true},
    nickname: {type: String, required: true, index: true},
    jwt: {type: String, select: true},
    email: {type: String, select: false},
    password: {type: String, select: false},
    avatar: String,
    socialType: String,
    socialUid: {type: String, select: false},
    socialUrl: String,
    isModerator: {type: Boolean, default: false, select: false},
    isSuperUser: {type: Boolean, default: false, select: false},
    isActive: {type: Boolean, default: true, select: false},
    rating: {type: [mongoose.Schema.Types.ObjectId], default: []},

}, {collection: 'users'});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.getPayload = function() {
    return {
        id: this._id,
        nickname: this.nickname,
        avatar: this.avatar,
        socialType: this.socialType,
        socialUrl: this.socialUrl
    }
}

UserSchema.statics.findOneOrCreate = function(conditions: any, userData: any, callback: (err: any, user: any) => any) {
    const User = this.model('User');
    User.findOne(conditions).then(user => {
        if (user) {
            callback(null, user);
        }
        else {
            let newUser = new User(userData);
            newUser.password = Math.random() * 1000;
            newUser.save().then(() => {
                callback(null, newUser); 
            }).catch((err) => {
                callback(err, null);
            })
        }
    });
}

UserSchema.pre('save', function(next) {
    let payload =  this.getPayload();
    this.jwt = jwt.sign(payload, process.env.JWT_SECRET);
    next();
});

export const User = mongoose.model('User', UserSchema);