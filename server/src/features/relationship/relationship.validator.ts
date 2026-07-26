import { z } from "zod"

export const acceptInvitationSchema = z.object({
  invitationCode: z.string().min(6, "Invitation code must be at least 6 characters")
})
