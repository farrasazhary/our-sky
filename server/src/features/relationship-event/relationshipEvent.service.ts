import { prisma } from "../../config/database"
import { EventType } from "../../shared/constants/eventTypes"

export class RelationshipEventRepository {
  static async createEvent(data: {
    relationshipId: bigint
    eventType: EventType
    sourceEntity: string
    sourceId: bigint
    description: string
    eventDate?: Date
  }) {
    return prisma.relationshipEvent.create({
      data: {
        relationshipId: data.relationshipId,
        eventType: data.eventType,
        sourceEntity: data.sourceEntity,
        sourceId: data.sourceId,
        description: data.description,
        eventDate: data.eventDate || new Date()
      }
    })
  }

  static async findEventsByRelationship(relationshipId: bigint) {
    return prisma.relationshipEvent.findMany({
      where: { 
        relationshipId,
        eventType: {
          notIn: ["DATE_PROPOSED", "DATE_REJECTED"]
        }
      },
      orderBy: { eventDate: "desc" }
    })
  }
}

export class RelationshipEventService {
  static async recordEvent(data: {
    relationshipId: bigint
    eventType: EventType
    sourceEntity: string
    sourceId: bigint
    description: string
    eventDate?: Date
  }) {
    return RelationshipEventRepository.createEvent(data)
  }

  static async getConstellationEvents(relationshipId: bigint) {
    const events = await RelationshipEventRepository.findEventsByRelationship(relationshipId)
    return events.map(e => {
      let cleanDescription = e.description
      try {
        if (e.description.startsWith("{")) {
          const parsed = JSON.parse(e.description)
          cleanDescription = parsed.title || parsed.description || e.description
        }
      } catch (err) {
        cleanDescription = e.description
      }

      return {
        id: e.id.toString(),
        eventType: e.eventType,
        sourceEntity: e.sourceEntity,
        sourceId: e.sourceId.toString(),
        description: cleanDescription,
        eventDate: e.eventDate
      }
    })
  }
}
