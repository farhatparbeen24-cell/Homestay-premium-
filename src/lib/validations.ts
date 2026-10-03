import { z } from 'zod';

export const enquirySchema = z.object({
  name: z.string().min(2, 'Please enter your full name').max(100, 'Name is too long'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number with country code')
    .max(20, 'Phone number is too long')
    .regex(/^[0-9+\s\-().]+$/, 'Please enter a valid contact number'),
  checkin: z.string().optional().or(z.literal('')),
  checkout: z.string().optional().or(z.literal('')),
  guests: z.coerce.number().int().min(1, 'At least 1 guest required').max(20, 'Maximum 20 guests').default(2),
  room: z.string().optional().or(z.literal('')),
  message: z.string().max(1000, 'Message cannot exceed 1000 characters').optional().or(z.literal('')),
  honeypot: z.string().max(0, 'Bot submission rejected').optional().or(z.literal('')),
  source: z.string().optional().default('website_enquiry'),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address').max(255),
  honeypot: z.string().max(0, 'Bot submission rejected').optional().or(z.literal('')),
  source: z.string().optional().default('footer_newsletter'),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
