import { GoogleGenerativeAI } from "@google/generative-ai"

export class AiService {
  private static getGeminiModel() {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) return null
    try {
      const genAI = new GoogleGenerativeAI(apiKey)
      return genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    } catch (e) {
      console.warn("[AiService] Failed to initialize Gemini API:", e)
      return null
    }
  }

  /**
   * Generates a fresh, deep romantic couple question using Gemini AI
   */
  static async generateRomanticQuestion(): Promise<{ questionText: string; category: string }> {
    const model = this.getGeminiModel()

    if (model) {
      try {
        const prompt = `Buatkan 1 pertanyaan hubungan romantis yang mendalam, hangat, dan bermakna untuk pasangan kekasih dalam Bahasa Indonesia. Pertanyaan harus memicu percakapan positif, hangat, dan emosional.
Kembalikan HANYA string JSON murni tanpa format markdown codeblock (\`\`\`json) dengan struktur berikut:
{
  "questionText": "teks pertanyaan disini",
  "category": "RELATIONSHIP"
}`

        const result = await model.generateContent(prompt)
        const responseText = result.response.text().trim()
        const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim()
        const parsed = JSON.parse(cleanJson)

        if (parsed.questionText) {
          return {
            questionText: parsed.questionText,
            category: parsed.category || "RELATIONSHIP"
          }
        }
      } catch (err) {
        console.warn("[AiService] Gemini question generation failed, using fallback pool:", err)
      }
    }

    // High quality fallback pool if API key is missing or rate limited
    const fallbackQuestions = [
      "Apa satu momen paling berharga dalam hubungan kita yang paling sering kamu ingat ketika rindu?",
      "Bagaimana cara terbaik menurutmu untuk saling mendukung saat salah satu dari kita sedang merasa lelah atau cemas?",
      "Jika kita bisa mengulang satu hari kencan paling berkesan, hari mana yang ingin kamu ulangi dan kenapa?",
      "Apa kebiasaan kecil dari pasanganmu yang tanpa disadari selalu membuatmu tersenyum sendiri?",
      "Impian besar apa untuk masa depan kita bersama yang paling ingin kamu wujudkan terlebih dahulu?"
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
    const model = this.getGeminiModel()

    if (model) {
      try {
        const prompt = `Buatkan 1 ide kencan kreatif dan seru untuk pasangan kekasih dalam Bahasa Indonesia dengan tema kencan '${category}'. Ide kencan harus berkesan dan praktis dilakukan.
Kembalikan HANYA string JSON murni tanpa format markdown codeblock (\`\`\`json) dengan struktur berikut:
{
  "title": "judul ide kencan yang menarik",
  "description": "deskripsi singkat dan seru tentang aktivitas kencan tersebut",
  "category": "${category.toUpperCase()}",
  "estimatedBudget": "estimasi biaya misal Rp 50.000 - Rp 100.000"
}`

        const result = await model.generateContent(prompt)
        const responseText = result.response.text().trim()
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
        console.warn("[AiService] Gemini date idea generation failed, using fallback pool:", err)
      }
    }

    // High quality fallback date ideas
    const fallbacks = [
      {
        title: "Kencan Nostalgia Foto & Jajanan Sekolah",
        description: "Beli jajanan masa kecil bersama, duduk di taman hangat sambil melihat foto-foto awal jadian.",
        category: "ROMANTIC",
        estimatedBudget: "Rp 30.000 - Rp 50.000"
      },
      {
        title: "Stargazing & Picnic Malam Berbintang",
        description: "Bawa tikar dan minuman hangat favorit ke area terbuka malam hari, nikmati pemandangan langit sambil mengobrol.",
        category: "OUTDOOR",
        estimatedBudget: "Rp 40.000 - Rp 70.000"
      },
      {
        title: "Maraton Memasak Resep Baru di Rumah",
        description: "Pilih 1 resep masakan unik di internet, belanja bahan bersama, lalu masak dan santap hasil karya berdua.",
        category: "INDOOR",
        estimatedBudget: "Rp 75.000 - Rp 120.000"
      }
    ]

    return fallbacks[Math.floor(Math.random() * fallbacks.length)]
  }
}
