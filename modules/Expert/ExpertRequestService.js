import { ExpertRequest } from "../../databases/models/ExpertRequest.js";

class ExpertRequestService {
    async getAll() {
        return await ExpertRequest.find();
    }

    async getMyRequest(uid) {
        const myExpertRequests = await ExpertRequest.find({ userId: uid });
        console.log(myExpertRequests);
        return myExpertRequests;
    }

    async acceptExpertRequest(id) {
        await ExpertRequest.findByIdAndUpdate(id, { state: "ACCEPTED" });
    }

    async rejectExpertRequest(id) {
        await ExpertRequest.findByIdAndUpdate(id, { state: "REJECTED" });
    }
}

export default ExpertRequestService;