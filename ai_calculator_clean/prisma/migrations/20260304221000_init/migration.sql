-- CreateTable
CREATE TABLE "calculator_results" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "monthlyRevenue" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "teamSize" TEXT NOT NULL,
    "clientSources" TEXT[],
    "marketingSetup" TEXT NOT NULL,
    "monthlyAdSpend" TEXT NOT NULL,
    "leadFollowUpTime" TEXT NOT NULL,
    "noShowRate" TEXT NOT NULL,
    "biggestBottleneck" TEXT NOT NULL,
    "monthlyLeak" DOUBLE PRECISION NOT NULL,
    "annualLeak" DOUBLE PRECISION NOT NULL,
    "systemScore" INTEGER NOT NULL,
    "weeksToFix" INTEGER NOT NULL,
    "followUpLeakPct" INTEGER NOT NULL,
    "noShowLeakPct" INTEGER NOT NULL,
    "systemLeakPct" INTEGER NOT NULL,
    "recommendations" TEXT[],
    "severityLevel" TEXT NOT NULL,
    "ghlContactId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calculator_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_captures" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "calculatorResultId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_captures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_captures_email_key" ON "email_captures"("email");
