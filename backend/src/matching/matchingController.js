const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getMatchedDonations = async (req, res) => {
  try {
    const { area, maxDistance, volunteerId } = req.query;
    
    let where = { status: 'available' };
    
    if (area) {
      where.area = { contains: area, mode: 'insensitive' };
    }
    
    if (volunteerId) {
      where.suggestedVolunteerId = volunteerId;
    }

    const donations = await prisma.donation.findMany({
      where,
      orderBy: [
        { suggestedVolunteerId: volunteerId ? 'desc' : 'asc' },
        { preferredPickupTime: 'asc' },
        { createdAt: 'desc' }
      ],
      include: {
        photos: true,
        donor: { select: { name: true, phone: true } }
      }
    });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const suggestVolunteer = async (req, res) => {
  try {
    const { donationId, area } = req.body;
    
    // Find volunteers in the same area with good ratings
    const volunteers = await prisma.user.findMany({
      where: { role: 'volunteer' },
      include: {
        acceptances: {
          where: { status: 'completed' },
          take: 1
        },
        ratingsReceived: {
          select: { rating: true }
        }
      }
    });

    // Simple matching logic - can be enhanced
    const bestVolunteer = volunteers
      .filter(v => v.acceptances.length > 0)
      .sort((a, b) => {
        const avgA = a.ratingsReceived.reduce((sum, r) => sum + r.rating, 0) / a.ratingsReceived.length || 0;
        const avgB = b.ratingsReceived.reduce((sum, r) => sum + r.rating, 0) / b.ratingsReceived.length || 0;
        return avgB - avgA;
      })[0];

    if (bestVolunteer) {
      await prisma.donation.update({
        where: { id: donationId },
        data: { suggestedVolunteerId: bestVolunteer.id }
      });
    }

    res.json({ suggestedVolunteerId: bestVolunteer?.id || null });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getMatchedDonations, suggestVolunteer };