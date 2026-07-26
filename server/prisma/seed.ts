import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const DEFAULT_INDONESIAN_QUESTIONS = [
  "Apa satu kebiasaan kecil dariku yang diam-diam paling kamu sukai?",
  "Bagaimana kesan pertamamu saat pertama kali kita bertemu?",
  "Apa kenangan paling berkesan dari hubungan kita sepanjang tahun ini?",
  "Lagu apa yang selalu membuatmu teringat padaku saat mendengarnya?",
  "Jika besok kita bisa liburan ke mana saja secara gratis, ke mana kamu ingin pergi?",
  "Apa hal sederhana yang baru saja kubuat yang membuatmu merasa sangat dicintai?",
  "Seperti apa gambaran kencan akhir pekan yang paling sempurna menurutmu?",
  "Impian besar apa yang paling ingin kita capai bersama dalam 5 tahun ke depan?",
  "Apa satu hal yang paling kamu syukuri dari hubungan kita saat ini?",
  "Momen lucu apa tentang kita berdua yang sampai sekarang masih membuatmu tertawa?",
  "Makanan apa yang paling ingin kamu masak berdua denganku di rumah?",
  "Bagaimana perasaanmu setiap kali kita berpegangan tangan di tempat umum?",
  "Film atau serial apa yang menurutmu jalan ceritanya mirip dengan kisah cinta kita?",
  "Momen spesifik mana saat kamu pertama kali sadar bahwa kamu jatuh cinta padaku?",
  "Apa satu perhatian kecil yang bisa kubuat hari ini untuk membuat harimu lebih bahagia?",
  "Jika kamu bisa menggambarkan hubungan kita dalam 3 kata, kata apa saja itu?",
  "Apa panggilan sayang atau lelucon internal favoritmu tentang kita?",
  "Bagaimana cara favoritmu untuk menghabiskan malam minggu bersamaku?",
  "Apa sifat dari diriku yang paling membuatmu merasa aman dan tenang?",
  "Tempat mana yang sudah pernah kita kunjungi yang paling ingin kamu kunjungi lagi?",
  "Apa satu hal tentangku yang belum pernah kamu ceritakan ke orang lain?",
  "Bagaimana perasaanmu saat pertama kali kita saling bertukar pesan dulu?",
  "Foto berdua kita mana yang paling kamu sukai dan kenapa?",
  "Apa hal paling romantis yang pernah kita lakukan bersama menurutmu?",
  "Jika kita buat janji kecil untuk tahun depan, janji apa yang ingin kamu buat?",
  "Apa hal yang paling kamu rindukan saat kita sedang berjauhan beberapa hari?",
  "Bagaimana caraku yang paling efektif untuk menenangkanmu saat kamu merasa cemas?",
  "Kado atau kejutan kecil apa dari pasangan yang paling berkesan untukmu?",
  "Pelajaran terbaik apa yang kamu dapatkan tentang cinta dari hubungan kita?",
  "Apa harapan terbesar untuk perjalanan cinta kita ke depannya?"
]

async function main() {
  console.log("🌱 Seeding 30+ default Indonesian questions...")

  for (const questionText of DEFAULT_INDONESIAN_QUESTIONS) {
    const exists = await prisma.question.findFirst({
      where: { questionText }
    })

    if (!exists) {
      await prisma.question.create({
        data: {
          questionText,
          category: "Relationship",
          isActive: true
        }
      })
    }
  }

  console.log(`✅ Seeded ${DEFAULT_INDONESIAN_QUESTIONS.length} daily questions.`)
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
