import { Router } from "../deps.jsx";
import { hello, cat } from "./controllers/helloController.tsx";
import { authenticate, register, showLoginForm, showRegisterForm, logout } from "../auth/userService.tsx";
import { summary } from "./apis/summary.jsx";
import { getAllUsers } from "./apis/getallusers.tsx";
const router = new Router();

router.get('/', hello);
router.get('/cat', cat);

router.get('/auth/login', showLoginForm)
router.post('/auth/login', authenticate);
router.get('/auth/register', showRegisterForm);
router.post('/auth/register', register);
router.get('/auth/logout', logout);

router.post('/behavior/summary', register);
router.get('/api/users', getAllUsers);


/*
router.get('/sleep/', getsleep);
router.get('/sleep/:id/rhythm', getrhythm);
router.get('/sleep/:id/quality', getquality);



router.delete('/games/:id', deletegame);*/

export { router };