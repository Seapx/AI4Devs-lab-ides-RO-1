import { Request, Response } from 'express';
import prisma from '../index';
import path from 'path';
import fs from 'fs';

// Interface for candidate data
interface CandidateData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: string;
  education?: string;
  experience?: string;
}

export const getCandidates = async (_req: Request, res: Response) => {
  try {
    const candidates = await prisma.candidate.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    return res.status(200).json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCandidate = async (req: Request, res: Response) => {
  try {
    // Extract candidate data from request body
    const { firstName, lastName, email, phone, address, education, experience } = req.body;
    let resumePath: string | undefined = undefined;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'First name, last name, and email are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if email is already in use
    const existingCandidate = await prisma.candidate.findUnique({
      where: { email }
    });

    if (existingCandidate) {
      return res.status(400).json({ error: 'Email already in use by another candidate' });
    }

    // Handle resume file if present
    if (req.file) {
      // Get file extension
      const fileExt = path.extname(req.file.originalname).toLowerCase();

      // Validate file type
      if (fileExt !== '.pdf' && fileExt !== '.docx') {
        return res.status(400).json({ error: 'Resume must be a PDF or DOCX file' });
      }

      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(__dirname, '../../uploads/cvs');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Generate unique filename
      const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
      const filePath = path.join(uploadsDir, fileName);

      // Save file to disk
      fs.writeFileSync(filePath, req.file.buffer);
      resumePath = `/uploads/cvs/${fileName}`;
    }

    // Create candidate in database
    const newCandidate = await prisma.candidate.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        address: address || null,
        education: education || null,
        experience: experience || null,
        resumePath: resumePath || null
      }
    });

    // Return success response
    return res.status(201).json(newCandidate);

  } catch (error) {
    console.error('Error creating candidate:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
