import { GoogleGenerativeAI } from "@google/generative-ai"
import { DATE_IDEAS_365 } from "../random-date/dateIdeas365"

export class AiService {
  private static last429Time = 0

  /**
   * Tries Google Generative AI with valid model names & 15s cooldown protection
   */
  private static async generateWithGemini(prompt: string): Promise<string | null> {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.warn("⚠️ [AiService] GEMINI_API_KEY is not set in environment.")
      return null
    }

    // Cooldown check (15 seconds)
    if (Date.now() - this.last429Time < 15000) {
      return null
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      // Standard models order: gemini-1.5-flash first
      const modelNames = [
        "gemini-1.5-flash",
        "gemini-2.0-flash",
        "gemini-1.5-pro",
        "gemini-pro"
      ]

      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName })
          const result = await model.generateContent(prompt)
          const text = result.response.text().trim()
          if (text) {
            console.log(`🤖 [Gemini AI] Generated content using model '${modelName}'`)
            return text
          }
        } catch (err: any) {
          const errMsg = err?.message || String(err)
          console.warn(`[AiService] Model '${modelName}' failed:`, errMsg)
          if (errMsg.includes("429") || errMsg.includes("Quota")) {
            this.last429Time = Date.now()
            break
          }
        }
      }
    } catch (globalErr: any) {
      console.warn("[AiService] Global Gemini execution error:", globalErr?.message || globalErr)
    }

    return null
  }

  /**
   * Generates a fresh, deep romantic couple question using Gemini AI or rich 40+ curated pool
   */
  static async generateRomanticQuestion(): Promise<{ questionText: string; category: string }> {
    const randomSeed = Math.floor(Math.random() * 10000)
    const prompt = `Buatkan 1 pertanyaan hubungan romantis yang unik, mendalam, hangat, dan bermakna untuk pasangan kekasih dalam Bahasa Indonesia (Seed: ${randomSeed}). Pertanyaan harus memicu percakapan positif, hangat, dan emosional.
Kembalikan HANYA string JSON murni tanpa format markdown codeblock (\`\`\`json) dengan struktur berikut:
{
  "questionText": "teks pertanyaan disini",
  "category": "RELATIONSHIP"
}`

    const responseText = await this.generateWithGemini(prompt)

    if (responseText) {
      try {
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim()
        const parsed = JSON.parse(cleanJson)

        if (parsed.questionText) {
          return {
            questionText: parsed.questionText,
            category: parsed.category || "RELATIONSHIP"
          }
        }
      } catch (err) {
        console.warn("[AiService] Failed to parse Gemini question JSON:", err)
      }
    }

    // Rich 40+ curated romantic Indonesian questions fallback pool
    const fallbackQuestions = [
      "Apa satu momen paling berharga dalam hubungan kita yang paling sering kamu ingat ketika rindu?",
      "Bagaimana cara terbaik menurutmu untuk saling mendukung saat salah satu dari kita sedang merasa lelah atau cemas?",
      "Jika kita bisa mengulang satu hari kencan paling berkesan, hari mana yang ingin kamu ulangi dan kenapa?",
      "Apa kebiasaan kecil dari pasanganmu yang tanpa disadari selalu membuatmu tersenyum sendiri?",
      "Impian besar apa untuk masa depan kita bersama yang paling ingin kamu wujudkan terlebih dahulu?",
      "Apa satu kebiasaan kecil dariku yang diam-diam paling kamu sukai?",
      "Bagaimana kesan pertamamu saat pertama kali kita bertemu?",
      "Lagu apa yang selalu membuatmu teringat padaku saat mendengarnya?",
      "Jika besok kita bisa liburan ke mana saja secara gratis, ke mana kamu ingin pergi?",
      "Apa hal sederhana yang baru saja kubuat yang membuatmu merasa sangat dicintai?",
      "Seperti apa gambaran kencan akhir pekan yang paling sempurna menurutmu?",
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
      "Apa harapan terbesar untuk perjalanan cinta kita ke depannya?",
      "Kapan momen terakhir kali kamu merasa sangat bangga kepadaku?",
      "Apa hal baru yang ingin kamu coba lakukan bersama pasanganmu tahun ini?",
      "Bagaimana perasaanmu saat mendengarkanku menceritakan tentang hariku?",
      "Apa satu kata yang selalu menggambarkan perasaanmu ketika memelukku?",
      "Jika hubungan kita dijadikan buku kisah cinta, apa judul buku yang cocok?",
      "Apa yang membuatmu yakin bahwa kita bisa melewati rintangan bersama?",
      "Momen sederhana apa di rumah yang menurutmu terasa paling romantis?"
    ]

    const randomChoice = fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)]
    return {
      questionText: randomChoice,
      category: "RELATIONSHIP"
    }
  }

  /**
   * Generates a creative, unique date idea using Gemini AI based on category
   */
  static async generateCustomDateIdea(category: string = "ROMANTIC"): Promise<{
    title: string
    description: string
    category: string
    estimatedBudget: string
  }> {
    const prompt = `Buatkan 1 ide kencan kreatif dan seru untuk pasangan kekasih dalam Bahasa Indonesia dengan tema kencan '${category}'. Ide kencan harus berkesan dan praktis dilakukan.
Kembalikan HANYA string JSON murni tanpa format markdown codeblock (\`\`\`json) dengan struktur berikut:
{
  "title": "judul ide kencan yang menarik",
  "description": "deskripsi singkat dan seru tentang aktivitas kencan tersebut",
  "category": "${category.toUpperCase()}",
  "estimatedBudget": "estimasi biaya misal Rp 50.000 - Rp 100.000"
}`

    const responseText = await this.generateWithGemini(prompt)

    if (responseText) {
      try {
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim()
        const parsed = JSON.parse(cleanJson)

        if (parsed.title && parsed.description) {
          return {
            title: parsed.title,
            description: parsed.description,
            category: parsed.category || category.toUpperCase(),
            estimatedBudget: parsed.estimatedBudget || "Terjangkau"
          }
        }
      } catch (err) {
        console.warn("[AiService] Failed to parse Gemini date idea JSON:", err)
      }
    }

    // High quality fallback using 365 Date Ideas pool
    const pool = DATE_IDEAS_365
    const randomChoice = pool[Math.floor(Math.random() * pool.length)]

    return {
      title: randomChoice.title,
      description: `Aktivitas seru kencan ${randomChoice.title.toLowerCase()} bersama pasangan tercinta.`,
      category: randomChoice.category.toUpperCase(),
      estimatedBudget: randomChoice.duration || "Terjangkau"
    }
  }
}
