import { Topic } from '../../databases/models/Topic.js';

class TopicService {
    async createTopic(name) {
        const topic = await Topic.create({ name });
        return topic;
    }

    async updateTopic(id, newName) {
        const topic = await Topic.findByIdAndUpdate(id, { name: newName }, { new: true });
        return topic;
    }

    async deleteTopic(id) {
        await Topic.findByIdAndDelete(id);
    }
}

export default TopicService;