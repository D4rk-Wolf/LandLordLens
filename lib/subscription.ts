import { prisma } from "./prisma"

export async function checkPropertyLimit(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { currentPlan: true },
  })

  if (!user) {
    return false
  }

  // Pro plan has unlimited properties
  if (user.currentPlan === "pro") {
    return true
  }

  // Free plan is limited to 1 property
  const propertyCount = await prisma.property.count({
    where: { userId },
  })

  return propertyCount < 1
}

export async function getPropertyCount(userId: string): Promise<number> {
  return prisma.property.count({
    where: { userId },
  })
}

