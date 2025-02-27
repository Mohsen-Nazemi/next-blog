-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "siteName" TEXT NOT NULL,
    "siteUrl" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "favicon" TEXT,
    "defaultTitle" TEXT,
    "defaultDescription" TEXT,
    "robotsTxt" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "postsPath" TEXT NOT NULL DEFAULT 'posts',
    "categoriesPath" TEXT NOT NULL DEFAULT 'categories',
    "timezone" TEXT NOT NULL DEFAULT 'Asia/Tehran',
    "dateFormat" TEXT NOT NULL DEFAULT 'DD MMMM YYYY',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);
