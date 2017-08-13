import {Router, Request, Response, NextFunction} from 'express';

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
        this.router.get('/', this.getIndex);
        this.router.get('/logout', this.logout);
    }

}

export const baseRoutes = new BaseRouter().router;