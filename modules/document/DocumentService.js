import Document from "../../databases/models/Document.js";
import DocumentReview, { ReviewState } from "../../databases/models/DocumentReview.js";


class DocumentService {
  async uploadDocument(url, description, userId, topicId, title) {
    const document = new Document({ 
      fileUrl: url, 
      description, 
      userId, 
      topicId, 
      title 
    });
    await document.save();
  }

  async getDocumentById(documentId) {
    return await Document.findById(documentId);
  }

  async getAllDocuments() {
    const documents = await Document.find();
    return documents.sort((a, b) => {
      const countHelpful1 = a.reviews.filter((review) => review.state === ReviewState.HELPFUL).length;
      const countHelpful2 = b.reviews.filter((review) => review.state === ReviewState.HELPFUL).length;
      return countHelpful2 - countHelpful1;  
    });
  }

  // Upload review for a document
//   async uploadReview(document, reviewState, userId) {
//     let existingReview = await DocumentReview.findOne({ document, userId });

//     if (existingReview) {
//       if (existingReview.state === reviewState) {
//         // If the review state is the same, delete it
//         await DocumentReview.deleteOne({ _id: existingReview._id });
//       } else {
//         // Otherwise, update the review state
//         existingReview.state = reviewState;
//         await existingReview.save();
//       }
//     } else {
//       // Create a new review
//       const documentReview = new DocumentReview({ state: reviewState, userId, document });
//       await documentReview.save();
//     }
//   }

//   // Update document state (e.g., active, pending)
//   async updateDocumentState(document, state) {
//     document.state = state;
//     await document.save();
//   }
}

export default new DocumentService();
