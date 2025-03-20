import express from 'express';
import TopicService from './TopicService.js';
import { isAdminMiddleware } from '../../middleware/user.middleware.js';

const topicRouter = express.Router();
const topicService = new TopicService();

topicRouter.post('/', isAdminMiddleware, async (req, res) => {
    try {
        const { name } = req.body;
        const topic = await topicService.createTopic(name);
        res.json(topic);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

topicRouter.put('/:id', isAdminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { name: newName } = req.body;
        const updatedTopic = await topicService.updateTopic(id, newName);
        res.json(updatedTopic);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

topicRouter.delete('/:id', isAdminMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        await topicService.deleteTopic(id);
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});

export default topicRouter;
