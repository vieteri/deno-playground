import { Router } from "../deps.js";
import { hello, cat } from "./controllers/helloController.js";

const router = new Router();

router.get('/', hello);
router.get('/cat', cat);

//router.post('/behavior/summary', postusersummary);
/*outer.get('/api/hello', api.getHello);
router.post('/api/hello', api.setHello);

router.get('/sleep/', getsleep);
router.get('/sleep/:id/rhythm', getrhythm);
router.get('/sleep/:id/quality', getquality);



router.delete('/games/:id', deletegame);*/

export { router };