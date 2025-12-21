import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from '../../../src/lib/stripe';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).end('Method Not Allowed');
    }

    try {
        const { customerId } = req.body;

        if (!customerId) {
            return res.status(400).json({ error: 'Customer ID required' });
        }

        // Create portal session
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/settings`,
        });

        res.status(200).json({ url: session.url });
    } catch (error: any) {
        console.error('Error creating portal session:', error);
        res.status(500).json({ error: error.message });
    }
}
