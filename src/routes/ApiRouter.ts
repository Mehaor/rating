import {Router, Request, Response, NextFunction} from 'express';
import {User, UserSchema} from '../models/user';
import {normalizeRatingIds, getPointsByIndex, getRatedList} from '../utils';


class ApiRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    checkUserIsAuthenticated(req: Request, res: Response, next: NextFunction) {    
        let error = {message: 'Not authorized'};
        if (!req.isAuthenticated() || !req.user) {
            res.status(403).send(error);
        }
        else {
            User.findById(req.user._id).then((foundUser: any) => {
                if (req.user.jwt == foundUser.jwt) {
                    next();
                }
                else {
                    res.status(403).send(error);
                }
            }).catch((error) => {
                res.status(403).send(error);
            })
        }        
    }


    getMyRatingData(req: Request, res: Response, next: NextFunction) {
        let ratingIds: string[] = req.user.rating;
        User.find({isActive: true}).exec((err, users: any[]) => {
            if (err) {
                return res.status(400).send({'msg': 'error'});
            }

            let unrated: any[] = [];
            let rating: any[] = [];

            users.forEach((user: any, index) => {
                let userData = {_id: user.id, nickname: user.nickname, avatar: user.avatar};
                if (user._id.toString() == req.user._id.toString()) {

                }
                else if (ratingIds.indexOf(user._id) == -1) {
                    unrated.push(userData);
                }
                else {
                    rating.push(userData);
                }
            });

            rating.sort((a, b) => { return ratingIds.indexOf(a._id) - ratingIds.indexOf(b._id);});
            res.send({rating, unrated});
        })
    }

    updateMyRating(req: Request, res: Response, next: NextFunction) {
        if (!req.body.rating) {
            return res.status(400).send({'msg': 'error'});
        };
        let ratingError = false;
        let previousIds = normalizeRatingIds(req.user.rating, req.user._id);
        let ratingIds: string[] = normalizeRatingIds(req.body.rating, req.user._id);
        previousIds.forEach((id) => {
            if (ratingIds.indexOf(id) == -1) {
                ratingError = true;
            }
        });
        if (ratingError) {
            return res.status(400).send({'msg': 'error'});
        }
        User.update({_id: req.user._id}, {rating: ratingIds}, (err, raw) => {
            if (err) {
                return res.status(400).send({'msg': 'error'});
            }
            res.send({});
        });
    }

    getUsers(req: Request, res: Response, next:  NextFunction) {
        User.find({isActive: true}, (err, users) => {
            res.send(getRatedList(users, true));
        })
    }

    getOverallRatingData(req: Request, res: Response, next:  NextFunction) {
        User.find({isActive: true}, (err, users: any) => {
            if (err) {
                return res.status(400).send({'msg': 'error'});
            }
            res.send(getRatedList(users, Boolean(req.query.rating)));
        })
        // res.send({});
    }

    init() {
        this.router.get('/my', this.checkUserIsAuthenticated, this.getMyRatingData);
        this.router.patch('/my', this.checkUserIsAuthenticated, this.updateMyRating);
        this.router.get('/users', this.checkUserIsAuthenticated, this.getUsers);
        this.router.get('/overall', this.checkUserIsAuthenticated, this.getOverallRatingData);
        
    }
}

export const apiRoutes = new ApiRouter().router;