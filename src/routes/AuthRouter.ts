import {Router, Request, Response, NextFunction} from 'express';
import * as passport from 'passport';


class AuthRouter {
    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    handleCookie(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated() && req.user) {
            res.cookie('jwt', req.user.jwt);
        }
        res.redirect('/');
    }

    logout(req: Request, res: Response, next: NextFunction) {
        res.clearCookie('jwt');
        req.logOut();
        res.redirect('/');
        // req.user.save();
    }

    init() {
        this.router.get('/vk', passport.authenticate('vkontakte'));
        this.router.get('/vk/callback', passport.authenticate('vkontakte', {
            // successRedirect: '/',
            failureRedirect: '/' 
        }), this.handleCookie);

        this.router.get('/logout', this.logout);
    }
}

export const authRoutes = new AuthRouter().router;