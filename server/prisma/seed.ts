import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const DEFAULT_QUESTIONS = [
  "What is a small habit of mine that you secretly love?",
  "What was your first impression of me when we first met?",
  "What is your favorite memory of us together this year?",
  "What song always reminds you of me when you hear it?",
  "If we could travel anywhere tomorrow, where would you want to go?",
  "What is something I did recently that made you feel deeply loved?",
  "What is your idea of a perfect weekend date together?",
  "What dream do you want us to accomplish together in the next 5 years?",
  "What is one thing you appreciate about our relationship the most?",
  "What is a funny moment of us that still makes you laugh out loud?",
  "What meal would you love for us to cook together this week?",
  "How do you feel when we hold hands in public?",
  "What is a movie or show that reminds you of our story?",
  "What was the moment you realized you were falling in love with me?",
  "What is one small thing I can do to make your day easier today?",
]

async function main() {
  console.log("🌱 Seeding database...")

  // Seed default questions
  for (const questionText of DEFAULT_QUESTIONS) {
    const exists = await prisma.question.findFirst({
      where: { questionText }
    })

    if (!exists) {
      await prisma.question.create({
        data: {
          questionText,
          category: "General",
          isActive: true
        }
      })
    }
  }

  console.log(`✅ Seeded ${DEFAULT_QUESTIONS.length} daily questions.`)
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
