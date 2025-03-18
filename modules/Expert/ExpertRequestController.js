import dotenv from 'dotenv';
import { Router } from 'express';
import ExpertRequestService from './ExpertRequestService.js';
import { getUser } from '../../utils/getUser.js';
import UserService from '../User/UserService.js';
import { isAdminMiddleware, isUserMiddleware } from '../../middleware/user.middleware.js';


dotenv.config();
const expertRequestRouter = Router();
const expertRequestService = new ExpertRequestService();
const userService = new UserService();

// expertRequestRouter.post("/", multerUpload.single('cv'), async (req, res) => {
//     const { userId } = await getUser(req.headers.authorization);
//     const isAllowRequest = userService.getUserLegit(userId) >= 10;
//     res.status(200).send("Success");

expertRequestRouter.get("/all", isAdminMiddleware, async (req, res) => {
    try {
        const expertRequests = await expertRequestService.getAll();
        res.status(200).json(expertRequests);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

expertRequestRouter.get("/my-request", isUserMiddleware, async (req, res) => {
    try {
        const user = await getUser(req.headers.authorization);
        const myExpertRequests = await expertRequestService.getMyRequest(user.id);
        console.log(myExpertRequests);
        res.status(200).json(myExpertRequests);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

expertRequestRouter.put("/accept/:id", isAdminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await expertRequestService.acceptExpertRequest(id);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

expertRequestRouter.put("/reject/:id", isAdminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await expertRequestService.rejectExpertRequest(id);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

export default expertRequestRouter;