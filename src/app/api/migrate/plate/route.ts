import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { migrateToPlate } from '@/db/migrate-to-plate';

export async function POST(req: NextRequest) {
    try {
        const user = await stackServerApp.getUser({ or: 'return-null' });
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log('🚀 Starting Plate.js migration for user:', user.id);
        const result = await migrateToPlate();

        return NextResponse.json({
            success: true,
            message: 'Migration completed successfully',
            migratedEntries: result.migratedEntries
        });
    } catch (error) {
        console.error('Migration API error:', error);
        return NextResponse.json(
            { error: 'Migration failed', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}