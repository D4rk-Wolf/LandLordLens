import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";

export async function GET() {
  await requireAdmin();

  const payments = await prisma.payment.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  // Calculate summary stats
  const totalRevenue = payments.reduce(
    (sum, payment) => sum + Number(payment.amount ?? 0),
    0
  );

  const monthlyRevenue = payments
    .filter((payment) => {
      const paymentDate = new Date(payment.createdAt);
      const now = new Date();
      return (
        paymentDate.getMonth() === now.getMonth() &&
        paymentDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, payment) => sum + Number(payment.amount ?? 0), 0);

  const activeSubscriptions = await prisma.user.count({
    where: {
      currentPlan: {
        not: "free",
      },
    },
  });

  return NextResponse.json({
    payments,
    summary: {
      totalRevenue,
      monthlyRevenue,
      activeSubscriptions,
      totalPayments: payments.length,
    },
  });
}

