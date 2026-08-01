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
   * Tries Groq AI (Llama 3.3 70B / Mixtral) via OpenAI-compatible REST API
   */
  private static async generateWithGroq(prompt: string): Promise<string | null> {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.warn("⚠️ [AiService] GROQ_API_KEY is not set in environment.")
      return null
    }

    const groqModels = [
      "llama-3.3-70b-versatile",
      "llama3-70b-8192",
      "mixtral-8x7b-32768"
    ]

    for (const modelName of groqModels) {
      try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: modelName,
            messages: [
              {
                role: "system",
                content: "You are an expert romantic relationship assistant. Output ONLY valid raw JSON matching requested structure without markdown formatting."
              },
              {
                role: "user",
                content: prompt
              }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
          })
        })

        if (!response.ok) {
          const errText = await response.text()
          console.warn(`[AiService] Groq model '${modelName}' HTTP ${response.status}:`, errText)
          continue
        }

        const data: any = await response.json()
        const content = data?.choices?.[0]?.message?.content?.trim()
        if (content) {
          console.log(`⚡ [Groq AI] Generated content using model '${modelName}'`)
          return content
        }
      } catch (err: any) {
        console.warn(`[AiService] Groq model '${modelName}' error:`, err?.message || err)
      }
    }

    return null
  }

  /**
   * Primary Dual-Engine Cascading Router: Gemini AI -> Groq AI Failover
   */
  private static async generateContentWithAiCascade(prompt: string): Promise<string | null> {
    // 1. Try Gemini AI
    const geminiResult = await this.generateWithGemini(prompt)
    if (geminiResult) return geminiResult

    // 2. Failover to Groq AI if Gemini is rate limited or unavailable
    console.log("⚡ [AiService] Gemini unavailable or rate limited. Falling back to Groq AI (Llama 3.3 70B)...")
    const groqResult = await this.generateWithGroq(prompt)
    if (groqResult) return groqResult

    return null
  }

  /**
   * Generates a fresh, deep romantic couple question using 100% Full AI (Gemini + Groq Backup)
   */
  static async generateRomanticQuestion(): Promise<{ questionText: string; category: string }> {
    const randomSeed = Math.floor(Math.random() * 100000)
    const prompt = `Buatkan 1 pertanyaan hubungan romantis yang unik, mendalam, hangat, dan bermakna untuk pasangan kekasih dalam Bahasa Indonesia (Seed: ${randomSeed}). Pertanyaan harus memicu percakapan positif, hangat, dan emosional.
Kembalikan HANYA string JSON murni tanpa format markdown codeblock (\`\`\`json) dengan struktur berikut:
{
  "questionText": "teks pertanyaan disini",
  "category": "RELATIONSHIP"
}`

    // 1. Try Dual-Engine Cascade (Gemini -> Groq)
    let responseText = await this.generateContentWithAiCascade(prompt)

    // 2. Direct Groq retry if initial cascade failed
    if (!responseText) {
      console.log("⚡ [AiService] Retrying question generation via direct Groq AI...")
      responseText = await this.generateWithGroq(prompt)
    }

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
        console.warn("[AiService] Failed to parse AI question JSON:", err)
      }
    }

    // Emergency fallback AI attempt with simplified prompt
    const simpleGroq = await this.generateWithGroq("Buatkan 1 pertanyaan romantis mendalam untuk pasangan kekasih dalam format JSON {\"questionText\": \"...\", \"category\": \"RELATIONSHIP\"}")
    if (simpleGroq) {
      try {
        const cleanJson = simpleGroq.replace(/```json/g, "").replace(/```/g, "").trim()
        const parsed = JSON.parse(cleanJson)
        if (parsed.questionText) {
          return {
            questionText: parsed.questionText,
            category: "RELATIONSHIP"
          }
        }
      } catch (e) {}
    }

    return {
      questionText: "Apa satu momen paling indah yang pernah kita lewati bersama yang selalu membuatmu tersenyum setiap kali mengingatnya?",
      category: "RELATIONSHIP"
    }
  }

  /**
   * Generates a creative, unique date idea using 100% Full AI (Gemini + Groq Backup)
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

    const responseText = await this.generateContentWithAiCascade(prompt)

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
        console.warn("[AiService] Failed to parse AI date idea JSON:", err)
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
