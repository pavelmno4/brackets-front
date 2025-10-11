import { error, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import fs from 'fs/promises';
import path from 'path';

const ALLOWED_EXTENSIONS = new Set(['.zip']);

const contentTypes: Record<string, string> = {
    '.zip': 'application/zip',
} as const;

interface ErrorWithStatus extends Error {
    status?: number;
}

export const GET: RequestHandler = async ({ params }) => {
    const { filename } = params;

    if (!filename) {
        throw error(400, 'Filename is required');
    }

    try {
        if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            throw error(400, 'Invalid filename');
        }

        const ext = path.extname(filename).toLowerCase();
        if (!ALLOWED_EXTENSIONS.has(ext)) {
            throw error(403, 'File type not allowed');
        }

        const filePath = path.join(env.FILES_BASE_DIR, filename);

        const resolvedPath = path.resolve(filePath);
        const resolvedBaseDir = path.resolve(env.FILES_BASE_DIR);

        if (!resolvedPath.startsWith(resolvedBaseDir)) {
            throw error(403, 'Access denied');
        }

        const fileBuffer = await fs.readFile(filePath);
        const fileStats = await fs.stat(filePath);

        const contentType = contentTypes[ext] || 'application/octet-stream';

        return new Response(fileBuffer, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': fileStats.size.toString(),
                'Cache-Control': 'no-cache'
            }
        });

    } catch (err) {
        const errorWithStatus = err as ErrorWithStatus;
        if (errorWithStatus.status) {
            throw errorWithStatus;
        }

        if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
            throw error(404, 'File not found');
        }

        console.error('File download error:', err);
        throw error(500, 'Internal server error');
    }
};