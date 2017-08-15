import {Router, Request, Response, NextFunction} from 'express';
import {User, UserSchema} from '../models/user';
import {normalizeRatingIds} from '../utils';

/*function normalizeRatingIds(ids: any[]): string[]  {
    let ratingData = {};
    let normalizedIds = [];
    ids.forEach((id) => {
        if (!ratingData[id.toString()]) {
            normalizedIds.push(id.toString());
            ratingData[id.toString()] = true;
        }
    });
    return normalizedIds;
}*/

class BaseRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    handleCookie(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated() && req.user) {
            res.cookie('jwt', req.user.jwt);
            next();
        }
        else {
            res.clearCookie('jwt');
            res.redirect('/');
        }
    }

    normalizeRatings(req: Request, res: Response, next: NextFunction) {
        User.find((err, users) => {
            let promises = [];
            let userIds = users.map((u) => { return u._id.toString(); });
            users.forEach((user: any) => {
                promises.push(new Promise((resolve, reject) => {
                    let rating =  user.rating.map((id) => {
                        if (userIds.indexOf(id.toString()) != -1) {
                            return id;
                        }
                        return null;
                    });
                    
                    let normalizedIds = normalizeRatingIds(rating, user._id);
                    User.update({_id: user._id}, {rating: normalizedIds}, () => {
                        resolve();
                    })
                }));
            });
            Promise.all(promises).then(() => {
                res.redirect('/');
            })


        });
    }

    logout(req: Request, res: Response, next: NextFunction) {
        res.clearCookie('jwt');
        req.logOut();
        res.redirect('/');
    }
    
    getIndex(req: Request, res: Response, next: NextFunction) {
        res.render('index.ejs');
    }

    private init() {
        this.router.get('/my', this.handleCookie, this.getIndex);
        this.router.get('/u/:userName', this.handleCookie, this.getIndex);
        this.router.get('/u', this.handleCookie, this.getIndex);
        this.router.get('/norm', this.handleCookie, this.normalizeRatings);
        this.router.get('/', this.getIndex);
        this.router.get('/logout', this.logout);
    }

}

export const baseRoutes = new BaseRouter().router;