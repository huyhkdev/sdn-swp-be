import express from 'express';
import DocumentService from './DocumentService.js';
import { cloudinaryUploadMiddleware, uploadToCloudinary } from '../../utils/cloudinary.js';
import jwt from 'jsonwebtoken';

const documentRouter = express.Router();



documentRouter.post('/upload-document', cloudinaryUploadMiddleware, async (req, res) => {
    const { description, title, topicId } = req.body;
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    try {
      const token = req.headers.authorization.split(' ')[1];
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      //-> user -> role
      const fileUrls =  await uploadToCloudinary(files);
      console.log(fileUrls)
      fileUrls.forEach((fileUrl) => {
        DocumentService.uploadDocument(fileUrl, description, userId, topicId, title);
      });
      res.status(200).json({ message: 'Documents uploaded successfully', fileUrls });
  
    } catch (error) {
      res.status(500).json({ message: 'Error uploading documents', error: error.message });
    }
  });


// Upload a review for a document
documentRouter.post('/upload-review', async (req, res) => {
  const { documentId, review } = req.body;

  try {
    const document = await DocumentService.getDocumentById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    await DocumentService.uploadReview(document, ReviewState[review.toUpperCase()], req.userId);

    res.status(200).json({ message: 'Review uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading review', error: error.message });
  }
});

// Get document by ID
documentRouter.get('/document/:documentId', async (req, res) => {
  const { documentId } = req.params;

  try {
    const document = await DocumentService.getDocumentById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching document', error: error.message });
  }
});

// Get all documents
documentRouter.get('/documents', async (req, res) => {
  try {
    const documents = await DocumentService.getAllDocuments();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching documents', error: error.message });
  }
});

// Admin: Set document to active
documentRouter.put('/document/active', async (req, res) => {
  const { documentId } = req.body;

  try {
    const document = await DocumentService.getDocumentById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    await DocumentService.updateDocumentState(document, ResourceStatus.ACTIVE);
    res.status(200).json({ message: 'Document state updated to active successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating document state', error: error.message });
  }
});

export default documentRouter;
