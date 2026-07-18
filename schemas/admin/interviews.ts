import { InterviewDifficulty, InterviewStatus } from "@prisma/client";
import { z } from "zod";

export const interviewQuestionSchema = z.object({
  id: z.string().optional(),
  roleTitle: z.string().min(2),
  roleAliases: z.string().optional(),
  topicTitle: z.string().min(2),
  topicGroup: z.string().optional(),
  question: z.string().min(12),
  context: z.string().optional(),
  shortAnswer: z.string().optional(),
  answer: z.string().min(40),
  expectedPoints: z.string().optional(),
  commonMistakes: z.string().optional(),
  followUps: z.string().optional(),
  difficulty: z.nativeEnum(InterviewDifficulty),
  experienceMin: z.coerce.number().int().min(0).max(30),
  experienceMax: z.coerce.number().int().min(0).max(30).optional(),
  tags: z.string().optional(),
  status: z.nativeEnum(InterviewStatus),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  sourceNote: z.string().optional(),
});

export const interviewQuestionDraftSchema = z.object({
  question: z.string().trim().min(12).max(260),
  roleId: z.string().trim().optional(),
  topicId: z.string().trim().optional(),
});

export const interviewQuestionContentSchema = z.object({
  id: z.string().min(1),
  question: z.string().trim().min(12).max(260),
  context: z.string().optional(),
  shortAnswer: z.string().optional(),
  answer: z.string().optional(),
});

export const interviewQuestionGuidanceSchema = z.object({
  id: z.string().min(1),
  expectedPoints: z.string().optional(),
  commonMistakes: z.string().optional(),
  followUps: z.string().optional(),
});

export const interviewQuestionClassificationSchema = z.object({
  id: z.string().min(1),
  roleTitle: z.string().trim().min(2),
  roleAliases: z.string().optional(),
  topicTitle: z.string().trim().min(2),
  topicGroup: z.string().optional(),
  difficulty: z.nativeEnum(InterviewDifficulty),
  experienceMin: z.coerce.number().int().min(0).max(30),
  experienceMax: z.coerce.number().int().min(0).max(30).optional(),
  tags: z.string().optional(),
});

export const interviewQuestionSeoSchema = z.object({
  id: z.string().min(1),
  seoTitle: z.string().max(80).optional(),
  seoDescription: z.string().max(220).optional(),
  sourceNote: z.string().max(300).optional(),
});

export const interviewQuestionPublishingSchema = z.object({
  id: z.string().min(1),
  status: z.nativeEnum(InterviewStatus),
});
