-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT,
    "sobrenome" TEXT,
    "telefone" TEXT,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "nomeResponsavel" TEXT,
    "telefoneResponsavel" TEXT,
    "sensei" BOOLEAN NOT NULL DEFAULT false,
    "atleta" BOOLEAN NOT NULL DEFAULT true,
    "faixa" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
