import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './databases/mongoose.js';
import userRouter from './modules/User/UserController.js';
import documentRouter from './modules/document/DocumentController.js';
import expertRequestController from './modules/Expert/ExpertRequestController.js';
import topicRouter from './modules/Topic/TopicController.js';
export class App {
    app;
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use('/user',userRouter);
        this.app.use('/document', documentRouter);
        this.app.use('/expert-requests', expertRequestController);
        this.app.use('/topic', topicRouter);
    }

    async listen() {
        await connectDB();
        this.app.listen(4000, () => {
            console.log('Server is listening')
        })
    }

}
