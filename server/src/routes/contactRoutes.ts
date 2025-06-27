import { Router, Request, Response } from 'express';

const router = Router();

// POST /api/v1/contact - Submit contact form
router.post('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Contact form submitted',
    data: null
  });
});

// GET /api/v1/contact - Get all contact messages (admin only)
router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Contact messages',
    data: []
  });
});

export default router;
