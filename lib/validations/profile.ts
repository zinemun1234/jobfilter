import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().optional(),
  major: z.string().optional(),
  targetJob: z.string().optional(),
  skills: z.array(z.string()),
});

export type ProfileInput = z.infer<typeof profileSchema>;
