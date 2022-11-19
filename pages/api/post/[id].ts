// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Post } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { updatePost, getPost, deletePost } from '../../../repository/post.curd';

type Exception = {
    error: { message: string }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Post | Exception | undefined>
) {
    const id = req.query.id as string;

    if (req.method === 'PUT' && id) {
        try {
            await updatePost(req.body as Post, Number(id));
            res.status(204).json(undefined);
        } catch (err: unknown) {
            const e = err as unknown as Error;
            console.log(e.message);
            res.status(400).json({ error: { message: e.message || 'Failed to perform update operation.' } })
        }
        return;
    }

    if (req.method === 'DELETE' && id) {
        try {
            await deletePost(Number(id));
            res.status(204).json(undefined);
        } catch (err: unknown) {
            const e = err as unknown as Error;
            console.log(e.message);
            res.status(400).json({ error: { message: e.message || 'Failed to perform delete operation.' } })
        }
        return;
    }

    try {
        const response = await getPost(Number(id));
        if (!response) throw new Error('Nothing found.');
        res.status(200).json(response);
    } catch (err: unknown) {
        const e = err as unknown as Error;
        console.log(e.message);
        res.status(400).json({ error: { message: e.message || 'Failed to get the post.' } })
    }
}