import { z } from 'zod';

export const recruiterRegisterSchema = z
  .object({
    name: z.string().min(1, '담당자 이름을 입력해주세요.'),
    email: z
      .string()
      .min(1, '이메일을 입력해주세요.')
      .email('올바른 이메일 형식이 아닙니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d).+$/,
        '비밀번호는 영문과 숫자를 포함해야 합니다.'
      ),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
    companyName: z.string().min(1, '기업명을 입력해주세요.'),
    companyDesc: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export const recruiterListingSchema = z.object({
  company: z.string().min(1, '기업명을 입력해주세요.'),
  position: z.string().min(1, '직무를 입력해주세요.'),
  location: z.string().optional(),
  career: z.string().optional(),
  education: z.string().optional(),
  employType: z.string().optional(),
  salary: z.string().optional(),
  deadline: z.string().optional(),
  url: z.string().url('올바른 URL 형식이 아닙니다.').optional().or(z.literal('')),
  description: z.string().optional(),
  tags: z.string().optional(),
  source: z.literal('RECRUITER').default('RECRUITER'),
});

export type RecruiterRegisterInput = z.infer<typeof recruiterRegisterSchema>;
export type RecruiterListingInput = z.infer<typeof recruiterListingSchema>;
