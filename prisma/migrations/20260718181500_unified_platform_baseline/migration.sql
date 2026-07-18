-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "LicenseStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'EXPIRED', 'REVOKED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('LIFETIME', 'SIX_MONTHS', 'TWELVE_MONTHS', 'CUSTOM');

-- CreateEnum
CREATE TYPE "KasaEdition" AS ENUM ('STARTER', 'PLUS', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "ActivationStatus" AS ENUM ('ACTIVE', 'DEACTIVATED');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'CLOSED');

-- CreateEnum
CREATE TYPE "Marketplace" AS ENUM ('ENVATO');

-- CreateEnum
CREATE TYPE "InterviewDifficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'SYSTEM_DESIGN');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "InterviewVoteTarget" AS ENUM ('QUESTION', 'ANSWER', 'COMMENT');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'STUDENT');

-- CreateEnum
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "ArticleCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleTag" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ArticleTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT',
    "categoryId" TEXT,
    "authorId" TEXT,
    "authorName" TEXT,
    "coverImage" TEXT,
    "coverImageAlt" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "allowIndexing" BOOLEAN NOT NULL DEFAULT true,
    "focusKeyword" TEXT,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "canonicalUrl" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "schemaType" TEXT NOT NULL DEFAULT 'Article',
    "faqs" JSONB,
    "readingTimeMinutes" INTEGER NOT NULL DEFAULT 1,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleTagOnArticle" (
    "articleId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ArticleTagOnArticle_pkey" PRIMARY KEY ("articleId","tagId")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewRole" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewTopic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "group" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewTopic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewQuestion" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "context" TEXT,
    "shortAnswer" TEXT,
    "answer" TEXT NOT NULL,
    "expectedPoints" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "commonMistakes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "followUps" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "roleId" TEXT,
    "topicId" TEXT,
    "difficulty" "InterviewDifficulty" NOT NULL DEFAULT 'INTERMEDIATE',
    "experienceMin" INTEGER NOT NULL DEFAULT 0,
    "experienceMax" INTEGER,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "InterviewStatus" NOT NULL DEFAULT 'DRAFT',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "sourceNote" TEXT,
    "authorName" TEXT,
    "authorEmail" TEXT,
    "isCommunity" BOOLEAN NOT NULL DEFAULT false,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "voteScore" INTEGER NOT NULL DEFAULT 0,
    "createdById" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "authorName" TEXT,
    "authorEmail" TEXT,
    "userId" TEXT,
    "status" "InterviewStatus" NOT NULL DEFAULT 'REVIEW',
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "voteScore" INTEGER NOT NULL DEFAULT 0,
    "sourceNote" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewComment" (
    "id" TEXT NOT NULL,
    "questionId" TEXT,
    "answerId" TEXT,
    "body" TEXT NOT NULL,
    "authorName" TEXT,
    "authorEmail" TEXT,
    "userId" TEXT,
    "status" "InterviewStatus" NOT NULL DEFAULT 'REVIEW',
    "voteScore" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewVote" (
    "id" TEXT NOT NULL,
    "target" "InterviewVoteTarget" NOT NULL,
    "value" INTEGER NOT NULL,
    "voterKey" TEXT NOT NULL,
    "userId" TEXT,
    "questionId" TEXT,
    "answerId" TEXT,
    "commentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewCollection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "intro" TEXT,
    "roleId" TEXT,
    "topicId" TEXT,
    "difficulty" "InterviewDifficulty",
    "experienceMin" INTEGER,
    "experienceMax" INTEGER,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "InterviewStatus" NOT NULL DEFAULT 'DRAFT',
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "institute" TEXT,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'marketing-site',
    "leadType" TEXT NOT NULL DEFAULT 'enquiry',
    "ctaLabel" TEXT,
    "pageUrl" TEXT,
    "demoUrl" TEXT,
    "demoExpiresAt" TIMESTAMP(3),
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "assignedToId" TEXT,
    "notes" TEXT,
    "emailedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LeadActivity" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "status" "LeadStatus" NOT NULL,
    "contactMethod" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LeadActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPrice" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "edition" "KasaEdition" NOT NULL,
    "plan" "PlanType" NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "amount" DECIMAL(12,2) NOT NULL,
    "maxActivations" INTEGER NOT NULL DEFAULT 1,
    "userLimit" INTEGER,
    "courseLimit" INTEGER,
    "facultyLimit" INTEGER,
    "features" JSONB,
    "rules" JSONB,
    "envatoItemId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminSetting" (
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminSetting_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productPriceId" TEXT,
    "keyHash" TEXT NOT NULL,
    "keyPreview" TEXT NOT NULL,
    "keyEncrypted" TEXT,
    "buyerName" TEXT,
    "buyerEmail" TEXT NOT NULL,
    "platform" TEXT NOT NULL DEFAULT 'manual',
    "purchaseRef" TEXT,
    "saleAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "saleCurrency" TEXT NOT NULL DEFAULT 'INR',
    "saleChannel" TEXT NOT NULL DEFAULT 'direct',
    "marketingSource" TEXT,
    "soldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edition" "KasaEdition" NOT NULL DEFAULT 'ENTERPRISE',
    "plan" "PlanType" NOT NULL DEFAULT 'LIFETIME',
    "expiresAt" TIMESTAMP(3),
    "renewalUrl" TEXT,
    "expiryNoticeLastSentAt" TIMESTAMP(3),
    "expiryNoticeCount" INTEGER NOT NULL DEFAULT 0,
    "maxActivations" INTEGER NOT NULL DEFAULT 1,
    "userLimit" INTEGER,
    "courseLimit" INTEGER,
    "facultyLimit" INTEGER,
    "status" "LicenseStatus" NOT NULL DEFAULT 'ACTIVE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketplacePurchase" (
    "id" TEXT NOT NULL,
    "marketplace" "Marketplace" NOT NULL,
    "purchaseCodeHash" TEXT NOT NULL,
    "purchaseCodePreview" TEXT NOT NULL,
    "externalItemId" TEXT NOT NULL,
    "externalItemName" TEXT,
    "buyerUsername" TEXT,
    "buyerEmail" TEXT,
    "soldAt" TIMESTAMP(3),
    "supportedUntil" TIMESTAMP(3),
    "licenseId" TEXT NOT NULL,
    "rawSummary" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MarketplacePurchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicenseActivation" (
    "id" TEXT NOT NULL,
    "licenseId" TEXT NOT NULL,
    "instanceIdHash" TEXT NOT NULL,
    "instanceLabel" TEXT,
    "productVersion" TEXT,
    "metadata" JSONB,
    "status" "ActivationStatus" NOT NULL DEFAULT 'ACTIVE',
    "activatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deactivatedAt" TIMESTAMP(3),

    CONSTRAINT "LicenseActivation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "licenseId" TEXT,
    "action" TEXT NOT NULL,
    "actor" TEXT,
    "details" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ArticleCategory_slug_key" ON "ArticleCategory"("slug");

-- CreateIndex
CREATE INDEX "ArticleCategory_slug_idx" ON "ArticleCategory"("slug");

-- CreateIndex
CREATE INDEX "ArticleCategory_isActive_sortOrder_idx" ON "ArticleCategory"("isActive", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ArticleTag_slug_key" ON "ArticleTag"("slug");

-- CreateIndex
CREATE INDEX "ArticleTag_slug_idx" ON "ArticleTag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE INDEX "Article_status_publishedAt_idx" ON "Article"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "Article_categoryId_status_idx" ON "Article"("categoryId", "status");

-- CreateIndex
CREATE INDEX "Article_featured_status_idx" ON "Article"("featured", "status");

-- CreateIndex
CREATE INDEX "Article_allowIndexing_idx" ON "Article"("allowIndexing");

-- CreateIndex
CREATE INDEX "Article_focusKeyword_idx" ON "Article"("focusKeyword");

-- CreateIndex
CREATE INDEX "ArticleTagOnArticle_tagId_idx" ON "ArticleTagOnArticle"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewRole_slug_key" ON "InterviewRole"("slug");

-- CreateIndex
CREATE INDEX "InterviewRole_slug_idx" ON "InterviewRole"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewTopic_slug_key" ON "InterviewTopic"("slug");

-- CreateIndex
CREATE INDEX "InterviewTopic_slug_idx" ON "InterviewTopic"("slug");

-- CreateIndex
CREATE INDEX "InterviewTopic_group_idx" ON "InterviewTopic"("group");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewQuestion_slug_key" ON "InterviewQuestion"("slug");

-- CreateIndex
CREATE INDEX "InterviewQuestion_status_publishedAt_idx" ON "InterviewQuestion"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "InterviewQuestion_roleId_status_idx" ON "InterviewQuestion"("roleId", "status");

-- CreateIndex
CREATE INDEX "InterviewQuestion_topicId_status_idx" ON "InterviewQuestion"("topicId", "status");

-- CreateIndex
CREATE INDEX "InterviewQuestion_difficulty_status_idx" ON "InterviewQuestion"("difficulty", "status");

-- CreateIndex
CREATE INDEX "InterviewQuestion_experienceMin_experienceMax_idx" ON "InterviewQuestion"("experienceMin", "experienceMax");

-- CreateIndex
CREATE INDEX "InterviewQuestion_isCommunity_status_idx" ON "InterviewQuestion"("isCommunity", "status");

-- CreateIndex
CREATE INDEX "InterviewQuestion_voteScore_idx" ON "InterviewQuestion"("voteScore");

-- CreateIndex
CREATE INDEX "InterviewAnswer_questionId_status_voteScore_idx" ON "InterviewAnswer"("questionId", "status", "voteScore");

-- CreateIndex
CREATE INDEX "InterviewAnswer_userId_idx" ON "InterviewAnswer"("userId");

-- CreateIndex
CREATE INDEX "InterviewAnswer_status_createdAt_idx" ON "InterviewAnswer"("status", "createdAt");

-- CreateIndex
CREATE INDEX "InterviewComment_questionId_status_idx" ON "InterviewComment"("questionId", "status");

-- CreateIndex
CREATE INDEX "InterviewComment_answerId_status_idx" ON "InterviewComment"("answerId", "status");

-- CreateIndex
CREATE INDEX "InterviewComment_userId_idx" ON "InterviewComment"("userId");

-- CreateIndex
CREATE INDEX "InterviewComment_status_createdAt_idx" ON "InterviewComment"("status", "createdAt");

-- CreateIndex
CREATE INDEX "InterviewVote_userId_idx" ON "InterviewVote"("userId");

-- CreateIndex
CREATE INDEX "InterviewVote_questionId_idx" ON "InterviewVote"("questionId");

-- CreateIndex
CREATE INDEX "InterviewVote_answerId_idx" ON "InterviewVote"("answerId");

-- CreateIndex
CREATE INDEX "InterviewVote_commentId_idx" ON "InterviewVote"("commentId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewVote_target_questionId_voterKey_key" ON "InterviewVote"("target", "questionId", "voterKey");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewVote_target_answerId_voterKey_key" ON "InterviewVote"("target", "answerId", "voterKey");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewVote_target_commentId_voterKey_key" ON "InterviewVote"("target", "commentId", "voterKey");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewCollection_slug_key" ON "InterviewCollection"("slug");

-- CreateIndex
CREATE INDEX "InterviewCollection_status_idx" ON "InterviewCollection"("status");

-- CreateIndex
CREATE INDEX "InterviewCollection_roleId_status_idx" ON "InterviewCollection"("roleId", "status");

-- CreateIndex
CREATE INDEX "InterviewCollection_topicId_status_idx" ON "InterviewCollection"("topicId", "status");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_assignedToId_idx" ON "Lead"("assignedToId");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");

-- CreateIndex
CREATE INDEX "LeadActivity_leadId_occurredAt_idx" ON "LeadActivity"("leadId", "occurredAt");

-- CreateIndex
CREATE INDEX "LeadActivity_status_idx" ON "LeadActivity"("status");

-- CreateIndex
CREATE INDEX "LeadActivity_createdById_idx" ON "LeadActivity"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrice_envatoItemId_key" ON "ProductPrice"("envatoItemId");

-- CreateIndex
CREATE INDEX "ProductPrice_productId_isActive_idx" ON "ProductPrice"("productId", "isActive");

-- CreateIndex
CREATE INDEX "ProductPrice_envatoItemId_idx" ON "ProductPrice"("envatoItemId");

-- CreateIndex
CREATE INDEX "ProductPrice_edition_plan_currency_idx" ON "ProductPrice"("edition", "plan", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrice_productId_edition_plan_currency_key" ON "ProductPrice"("productId", "edition", "plan", "currency");

-- CreateIndex
CREATE UNIQUE INDEX "License_keyHash_key" ON "License"("keyHash");

-- CreateIndex
CREATE INDEX "License_buyerEmail_idx" ON "License"("buyerEmail");

-- CreateIndex
CREATE INDEX "License_productPriceId_idx" ON "License"("productPriceId");

-- CreateIndex
CREATE INDEX "License_productId_status_idx" ON "License"("productId", "status");

-- CreateIndex
CREATE INDEX "License_edition_status_idx" ON "License"("edition", "status");

-- CreateIndex
CREATE INDEX "License_expiresAt_status_idx" ON "License"("expiresAt", "status");

-- CreateIndex
CREATE INDEX "License_saleChannel_soldAt_idx" ON "License"("saleChannel", "soldAt");

-- CreateIndex
CREATE INDEX "License_marketingSource_soldAt_idx" ON "License"("marketingSource", "soldAt");

-- CreateIndex
CREATE INDEX "License_soldAt_idx" ON "License"("soldAt");

-- CreateIndex
CREATE UNIQUE INDEX "MarketplacePurchase_purchaseCodeHash_key" ON "MarketplacePurchase"("purchaseCodeHash");

-- CreateIndex
CREATE INDEX "MarketplacePurchase_marketplace_externalItemId_idx" ON "MarketplacePurchase"("marketplace", "externalItemId");

-- CreateIndex
CREATE INDEX "MarketplacePurchase_licenseId_idx" ON "MarketplacePurchase"("licenseId");

-- CreateIndex
CREATE INDEX "LicenseActivation_instanceIdHash_idx" ON "LicenseActivation"("instanceIdHash");

-- CreateIndex
CREATE INDEX "LicenseActivation_licenseId_status_idx" ON "LicenseActivation"("licenseId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "LicenseActivation_licenseId_instanceIdHash_key" ON "LicenseActivation"("licenseId", "instanceIdHash");

-- CreateIndex
CREATE INDEX "AuditLog_licenseId_idx" ON "AuditLog"("licenseId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ArticleCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTagOnArticle" ADD CONSTRAINT "ArticleTagOnArticle_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTagOnArticle" ADD CONSTRAINT "ArticleTagOnArticle_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ArticleTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "InterviewRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "InterviewTopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewQuestion" ADD CONSTRAINT "InterviewQuestion_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewAnswer" ADD CONSTRAINT "InterviewAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewAnswer" ADD CONSTRAINT "InterviewAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewComment" ADD CONSTRAINT "InterviewComment_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewComment" ADD CONSTRAINT "InterviewComment_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "InterviewAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewComment" ADD CONSTRAINT "InterviewComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewVote" ADD CONSTRAINT "InterviewVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewVote" ADD CONSTRAINT "InterviewVote_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "InterviewQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewVote" ADD CONSTRAINT "InterviewVote_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "InterviewAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewVote" ADD CONSTRAINT "InterviewVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "InterviewComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewCollection" ADD CONSTRAINT "InterviewCollection_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "InterviewRole"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewCollection" ADD CONSTRAINT "InterviewCollection_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "InterviewTopic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadActivity" ADD CONSTRAINT "LeadActivity_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeadActivity" ADD CONSTRAINT "LeadActivity_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrice" ADD CONSTRAINT "ProductPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_productPriceId_fkey" FOREIGN KEY ("productPriceId") REFERENCES "ProductPrice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketplacePurchase" ADD CONSTRAINT "MarketplacePurchase_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LicenseActivation" ADD CONSTRAINT "LicenseActivation_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_licenseId_fkey" FOREIGN KEY ("licenseId") REFERENCES "License"("id") ON DELETE SET NULL ON UPDATE CASCADE;

