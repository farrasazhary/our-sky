import { Response, Router } from "express"
import { authenticate } from "../../middleware/authenticate"
import { RelationshipRequest, authorizeRelationship } from "../../middleware/authorize"
import { ApiResponse } from "../../shared/responses/ApiResponse"
import { asyncHandler } from "../../shared/utils/asyncHandler"
import { prisma } from "../../config/database"
import { z } from "zod"

const locationSchema = z.object({
  latitude: z.number({ required_error: "Latitude is required" }).min(-90).max(90),
  longitude: z.number({ required_error: "Longitude is required" }).min(-180).max(180),
  locationName: z.string().optional()
})

/**
 * Calculates straight-line sphere distance between two lat/lon coordinates in kilometers
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return Math.round(d * 10) / 10
}

export class LocationService {
  static async updateUserLocation(userId: bigint, latitude: number, longitude: number, locationName?: string) {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        latitude,
        longitude,
        locationName: locationName?.trim() || null,
        lastLocationUpdate: new Date()
      },
      select: {
        id: true,
        fullName: true,
        latitude: true,
        longitude: true,
        locationName: true,
        lastLocationUpdate: true
      }
    })

    return {
      userId: updated.id.toString(),
      latitude: updated.latitude,
      longitude: updated.longitude,
      locationName: updated.locationName,
      lastLocationUpdate: updated.lastLocationUpdate
    }
  }

  static async getCoupleDistance(relationshipId: bigint, userId: bigint) {
    const rel = await prisma.relationship.findUnique({
      where: { id: relationshipId },
      include: {
        userOne: {
          select: {
            id: true,
            fullName: true,
            profilePicture: true,
            latitude: true,
            longitude: true,
            locationName: true,
            lastLocationUpdate: true
          }
        },
        userTwo: {
          select: {
            id: true,
            fullName: true,
            profilePicture: true,
            latitude: true,
            longitude: true,
            locationName: true,
            lastLocationUpdate: true
          }
        }
      }
    })

    if (!rel) {
      return {
        myLocation: null,
        partnerLocation: null,
        distanceKm: null,
        distanceFormatted: "Not Connected",
        statusText: "Belum terhubung dengan pasangan"
      }
    }

    const me = rel.userOne.id === userId ? rel.userOne : rel.userTwo
    const partner = rel.userOne.id === userId ? rel.userTwo : rel.userOne

    const hasMyLocation = me.latitude !== null && me.longitude !== null
    const hasPartnerLocation = partner.latitude !== null && partner.longitude !== null

    let distanceKm: number | null = null
    let distanceFormatted = "Lokasi Belum Disetel"
    let statusText = "Aktifkan lokasi untuk melihat jarak cinta kalian"

    if (hasMyLocation && hasPartnerLocation) {
      distanceKm = calculateHaversineDistance(
        me.latitude!,
        me.longitude!,
        partner.latitude!,
        partner.longitude!
      )

      if (distanceKm < 0.1) {
        distanceFormatted = "Bersama ❤️"
        statusText = "Kalian sedang berada di lokasi yang sama! ❤️"
      } else if (distanceKm < 1) {
        const meters = Math.round(distanceKm * 1000)
        distanceFormatted = `${meters} Meter`
        statusText = `Kalian terpisah sejauh ${meters} meter`
      } else {
        distanceFormatted = `${distanceKm} km`
        statusText = `Kalian terpisah sejauh ${distanceKm} km`
      }
    } else if (hasMyLocation && !hasPartnerLocation) {
      statusText = `Menunggu ${partner.fullName} memperbarui lokasi`
    } else if (!hasMyLocation && hasPartnerLocation) {
      statusText = "Perbarui lokasimu untuk menghitung jarak"
    }

    return {
      myLocation: {
        userId: me.id.toString(),
        fullName: me.fullName,
        profilePicture: me.profilePicture,
        latitude: me.latitude,
        longitude: me.longitude,
        locationName: me.locationName,
        lastLocationUpdate: me.lastLocationUpdate
      },
      partnerLocation: {
        userId: partner.id.toString(),
        fullName: partner.fullName,
        profilePicture: partner.profilePicture,
        latitude: partner.latitude,
        longitude: partner.longitude,
        locationName: partner.locationName,
        lastLocationUpdate: partner.lastLocationUpdate
      },
      distanceKm,
      distanceFormatted,
      statusText
    }
  }
}

export class LocationController {
  static update = async (req: RelationshipRequest, res: Response) => {
    const userId = BigInt(req.user!.userId)
    const validated = locationSchema.parse(req.body)
    const data = await LocationService.updateUserLocation(
      userId,
      validated.latitude,
      validated.longitude,
      validated.locationName
    )
    return ApiResponse.success(res, "Location updated successfully.", data)
  }

  static distance = async (req: RelationshipRequest, res: Response) => {
    const relationshipId = req.relationshipId!
    const userId = BigInt(req.user!.userId)
    const data = await LocationService.getCoupleDistance(relationshipId, userId)
    return ApiResponse.success(res, "Couple distance calculated.", data)
  }
}

const router = Router()
router.use(authenticate)
router.use(authorizeRelationship)

router.post("/update", asyncHandler(LocationController.update))
router.get("/distance", asyncHandler(LocationController.distance))

export { router as locationRoutes }
