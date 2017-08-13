import * as path from 'path';
import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';
import {User, IUserModel} from './models/user';

import {Strategy as VKStrategy} from 'passport-vkontakte';
import {baseRoutes} from './routes/BaseRouter';
import {authRoutes} from './routes/AuthRouter';
import {apiRoutes} from './routes/ApiRouter';

const redisStore = connectRedis(session);
const redisClient = redis.createClient();

class App {
    public express: express.Application;

    vkStrategy: VKStrategy = new VKStrategy({
        clientID: process.env.VK_APP_ID,
        clientSecret: process.env.VK_APP_SECRET,
        callbackURL: process.env.SITE + '/auth/vk/callback'
    }, (accessToken, refreshToken, params, profile, done) => {
        let socialType = 'vk';
        let username = socialType + profile.id;
        let avatar: string;
        try {
            avatar = profile.photos[0]['value'];
        }
        catch (error) {
            avatar = ''
        }

        (User as IUserModel).findOneOrCreate(
            {username: username}, {
                username: username,
                nickname: profile.displayName || username,
                avatar: avatar,
                socialType: socialType,
                socialUid: profile.id.toString(),
                socialUrl: profile.profileUrl,
            },  done);
    });

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // this.express.use(uploader.array());
        this.express.use(cookieParser());
        this.express.use(session({
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: true,
            store: new redisStore({
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT) || 6379,
                client: redisClient,
                db: parseInt(process.env.REDIS_SESSION_DB) || 0
            })
        }))

        this.express.use(passport.initialize());
        this.express.use(passport.session());

        passport.use(this.vkStrategy);
        passport.serializeUser((user: any, done) => {
            done(null, user._id); 
        });
        passport.deserializeUser((_id: any, done) => {
            User.findById(_id).then((user) => {
                done(null, user);
            }).catch((err) => {done(err, null)});
        });

        this.express.set('view engine', 'ejs');
        this.express.set('views', __dirname + '/views');
        this.express.use('/static', express.static(__dirname + '/static'));

    }

    private routes() {
        this.express.use('/', baseRoutes);   
        this.express.use('/auth', authRoutes);
        this.express.use('/api/v1', apiRoutes);
    }
}

export default new App().express;