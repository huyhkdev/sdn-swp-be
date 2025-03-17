import dotenv from 'dotenv';
import { Router } from 'express';
import ExpertRequestService from './ExpertRequestService.js';
import { multerUpload } from '../../utils/upload.multer.js';
import { getUser } from '../../utils/getUser.js';
dotenv.config();
const expertRequestRouter = Router();
const expertRequestService = new ExpertRequestService();

expertRequestRouter.get("/test", multerUpload.single('cv'), async (req, res) => {
    const { userId } = await getUser(req.headers.authorization);
    const isAllowRequest = userService.getUserLegit(userId) >= 10;
    res.status(200).send("Success");
});

export default expertRequestRouter;