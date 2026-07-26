const API_BASE_URL = "/api/v1"

class ApiClient {
  private getToken(): string | null {
    return localStorage.getItem("token")
  }

  public setToken(token: string) {
    localStorage.setItem("token", token)
  }

  public clearToken() {
    localStorage.removeItem("token")
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()
    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json"
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "API Request failed")
      }

      return data.data as T
    } catch (err: any) {
      console.warn(`[API] Call to ${endpoint} failed:`, err.message)
      throw err
    }
  }

  // ----------------------------------------------------
  // AUTH API
  // ----------------------------------------------------
  async register(fullName: string, email: string, password: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
    })
  }

  async login(email: string, password: string) {
    const data = await this.request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    if (data?.token) {
      this.setToken(data.token)
    }
    return data
  }

  async logout() {
    this.clearToken()
    return this.request("/auth/logout", { method: "POST" })
  }

  async getProfile() {
    return this.request<{ isConnected: boolean; user: any; relationship: any }>("/relationships/me")
  }

  // ----------------------------------------------------
  // RELATIONSHIP API
  // ----------------------------------------------------
  async getRelationshipStatus() {
    return this.request<{ isConnected: boolean; relationship: any }>("/relationships/me")
  }

  async createInvitation() {
    return this.request<{ invitationCode: string; expiresAt: string }>("/relationships/invite", {
      method: "POST",
    })
  }

  async acceptInvitation(invitationCode: string) {
    return this.request("/relationships/accept", {
      method: "POST",
      body: JSON.stringify({ invitationCode }),
    })
  }

  async updateProfile(fullName: string, profilePicture?: string, avatarFile?: Blob | File) {
    if (avatarFile) {
      const formData = new FormData()
      formData.append("fullName", fullName)
      formData.append("avatar", avatarFile, "avatar.webp")
      if (profilePicture) {
        formData.append("profilePicture", profilePicture)
      }
      return this.request<{ id: string; fullName: string; email: string; profilePicture?: string }>("/users/profile", {
        method: "PUT",
        body: formData,
      })
    }

    return this.request<{ id: string; fullName: string; email: string; profilePicture?: string }>("/users/profile", {
      method: "PUT",
      body: JSON.stringify({ fullName, profilePicture }),
    })
  }

  async updateConnectedDate(startedAt: string) {
    return this.request<{ id: string; startedAt: string }>("/relationships/started-at", {
      method: "PUT",
      body: JSON.stringify({ startedAt }),
    })
  }

  async updateRelationshipCover(coverFile: Blob | File) {
    const formData = new FormData()
    formData.append("cover", coverFile, "cover.webp")
    return this.request<{ id: string; coverImage: string }>("/relationships/cover", {
      method: "PUT",
      body: formData,
    })
  }

  // ----------------------------------------------------
  // NOTIFICATIONS API
  // ----------------------------------------------------
  async getNotifications() {
    return this.request<any[]>("/notifications")
  }

  async markNotificationRead(id: string) {
    return this.request<{ success: boolean }>(`/notifications/${id}/read`, {
      method: "PUT",
    })
  }

  async markAllNotificationsRead() {
    return this.request<{ success: boolean }>("/notifications/read-all", {
      method: "PUT",
    })
  }

  // ----------------------------------------------------
  // MEMORY API
  // ----------------------------------------------------
  async getMemories() {
    return this.request<any[]>("/memories")
  }

  async createMemory(formData: FormData) {
    return this.request("/memories", {
      method: "POST",
      body: formData,
    })
  }

  async deleteMemory(id: string) {
    return this.request(`/memories/${id}`, { method: "DELETE" })
  }

  // ----------------------------------------------------
  // QUESTION OF THE DAY API
  // ----------------------------------------------------
  async getTodayQuestion() {
    return this.request<any>("/questions/today")
  }

  async answerQuestion(questionId: string, answerText: string) {
    return this.request(`/questions/${questionId}/answer`, {
      method: "POST",
      body: JSON.stringify({ answerText }),
    })
  }

  async getQuestionHistory() {
    return this.request<any[]>("/questions/history")
  }

  // ----------------------------------------------------
  // DREAM BOARD API
  // ----------------------------------------------------
  async getDreams() {
    return this.request<any[]>("/dreams")
  }

  async createDream(formData: FormData) {
    return this.request("/dreams", {
      method: "POST",
      body: formData,
    })
  }

  async toggleDreamStatus(dreamId: string) {
    return this.request(`/dreams/${dreamId}/toggle`, {
      method: "PATCH",
    })
  }

  async deleteDream(id: string) {
    return this.request(`/dreams/${id}`, { method: "DELETE" })
  }

  // ----------------------------------------------------
  // IMPORTANT DAYS & COUNTDOWNS API
  // ----------------------------------------------------
  async getImportantDays() {
    return this.request<any[]>("/important-days")
  }

  async createImportantDay(data: { title: string; eventDate: string; category: string; repeatRule: string }) {
    return this.request("/important-days", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateImportantDay(id: string, data: any) {
    return this.request(`/important-days/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteImportantDay(id: string) {
    return this.request(`/important-days/${id}`, { method: "DELETE" })
  }

  async getCountdowns() {
    return this.request<any[]>("/countdowns")
  }

  // ----------------------------------------------------
  // TIME CAPSULE API
  // ----------------------------------------------------
  async getTimeCapsules() {
    return this.request<any[]>("/time-capsules")
  }

  async createTimeCapsule(data: { title: string; message: string; openDate: string }) {
    return this.request("/time-capsules", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async openTimeCapsule(id: string) {
    return this.request(`/time-capsules/${id}/open`, {
      method: "POST",
    })
  }

  // ----------------------------------------------------
  // OPEN WHEN API
  // ----------------------------------------------------
  async getOpenWhens() {
    return this.request<any[]>("/open-whens")
  }

  async createOpenWhen(data: { title: string; category: string; message: string }) {
    return this.request("/open-whens", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async openOpenWhen(id: string) {
    return this.request(`/open-whens/${id}/open`, {
      method: "POST",
    })
  }

  // ----------------------------------------------------
  // RANDOM DATE API
  // ----------------------------------------------------
  async getRandomDateStatus() {
    return this.request<{ activeProposal: any | null; completedHistory: any[] }>("/random-dates/status")
  }

  async getRandomDates() {
    return this.request<any[]>("/random-dates")
  }

  async rollRandomDate() {
    return this.request<any>("/random-dates/roll", {
      method: "POST",
    })
  }

  async generateAiDateIdea(category: string = "ROMANTIC") {
    return this.request<any>("/random-dates/ai-generate", {
      method: "POST",
      body: JSON.stringify({ category }),
    })
  }

  async proposeRandomDate(data: { title: string; category: string; duration?: string }) {
    return this.request("/random-dates/propose", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async approveRandomDate(proposalId: string) {
    return this.request(`/random-dates/propose/${proposalId}/approve`, {
      method: "PUT",
      body: JSON.stringify({ proposalId }),
    })
  }

  async declineRandomDate(proposalId: string) {
    return this.request(`/random-dates/propose/${proposalId}/decline`, {
      method: "PUT",
      body: JSON.stringify({ proposalId }),
    })
  }

  async completeRandomDate(title: string) {
    return this.request("/random-dates/complete", {
      method: "POST",
      body: JSON.stringify({ title }),
    })
  }

  // ----------------------------------------------------
  // CONSTELLATION API
  // ----------------------------------------------------
  async getConstellationStars() {
    return this.request<any[]>("/constellation")
  }
}

export const api = new ApiClient()
