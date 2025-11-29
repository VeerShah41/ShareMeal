const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getMetrics = async (req, res) => {
  try {
    const [totalMeals, activeDonations, completedDonations, areaStats] = await Promise.all([
      prisma.donation.aggregate({
        where: { status: 'completed' },
        _sum: { approxQuantity: true }
      }),
      
      prisma.donation.count({
        where: { status: { in: ['available', 'accepted'] } }
      }),
      
      prisma.donation.count({
        where: { status: 'completed' }
      }),
      
      prisma.donation.groupBy({
        by: ['area'],
        _count: { _all: true },
        _sum: { approxQuantity: true },
        where: { status: 'completed' }
      })
    ]);

    res.json({
      totalMealsServed: totalMeals._sum.approxQuantity || 0,
      activeDonations,
      completedDonations,
      areaStats: areaStats.map(stat => ({
        area: stat.area,
        donationsCount: stat._count._all,
        mealsServed: stat._sum.approxQuantity || 0
      }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getDonorStats = async (req, res) => {
  try {
    const stats = await prisma.donation.aggregate({
      where: { donorId: req.params.donorId },
      _count: { _all: true },
      _sum: { approxQuantity: true }
    });

    const completedCount = await prisma.donation.count({
      where: { donorId: req.params.donorId, status: 'completed' }
    });

    res.json({
      totalDonations: stats._count._all,
      totalMealsShared: stats._sum.approxQuantity || 0,
      completedDonations: completedCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getMetrics, getDonorStats };