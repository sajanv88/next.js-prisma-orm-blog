import { Post } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { createPost, getPosts } from '../../../repository/post.curd';

type Data = {
    data: Post[]
}

type Exception = {
    error: { message: string }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data | Exception>
) {
    if (req.method === 'POST') {
        try {
            const response = await createPost(req.body as Post);
            res.status(201).json({ data: [{ title: response.title, description: response.description, id: response.id }] })
        } catch (err: unknown) {
            const e = err as unknown as Error;
            console.log(e.message);
            res.status(400).json({ error: { message: e.message } })
        }
        return;
    }

    const response = await getPosts();
    res.status(200).json({ data: response })
}