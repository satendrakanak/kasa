import { z } from "zod";

export const askInterviewQuestionSchema = z.object({
  question: z.string().trim().min(12).max(260),
  context: z.string().trim().max(1200).optional(),
  roleTitle: z.string().trim().min(2).max(80),
  topicTitle: z.string().trim().min(2).max(80),
});

export const answerInterviewQuestionSchema = z.object({
  questionId: z.string().min(8),
  slug: z.string().min(2),
  body: z.string().trim().min(40).max(6000),
});

export const commentInterviewSchema = z.object({
  questionId: z.string().min(8).optional().or(z.literal("")),
  answerId: z.string().min(8).optional().or(z.literal("")),
  slug: z.string().min(2),
  body: z.string().trim().min(6).max(1200),
});

export const voteInterviewSchema = z.object({
  target: z.enum(["QUESTION", "ANSWER", "COMMENT"]),
  targetId: z.string().min(8),
  slug: z.string().min(2),
  value: z.coerce.number().int().refine((value) => value === 1 || value === -1),
});

export const moderateInterviewContentSchema = z.object({
  type: z.enum(["QUESTION", "ANSWER", "COMMENT"]),
  id: z.string().min(8),
  status: z.enum(["PUBLISHED", "ARCHIVED"]),
});
