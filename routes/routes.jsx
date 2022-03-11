import { Router } from "../deps.jsx";
import { hello, cat } from "./controllers/helloController.jsx";
import { authenticate, register, showLoginForm, showRegisterForm, logout } from "../auth/userService.jsx";
const router = new Router();

router.get('/', hello);
router.get('/cat', cat);

router.get('/auth/login', showLoginForm)
router.post('/auth/login', authenticate);
router.get('/auth/register', showRegisterForm);
router.post('/auth/register', register);
router.get('/auth/logout', logout);

router.post('/behavior/summary', register);
/*outer.get('/api/hello', api.getHello);
router.post('/api/hello', api.setHello);

router.get('/sleep/', getsleep);
router.get('/sleep/:id/rhythm', getrhythm);
router.get('/sleep/:id/quality', getquality);



router.delete('/games/:id', deletegame);*/

export { router };