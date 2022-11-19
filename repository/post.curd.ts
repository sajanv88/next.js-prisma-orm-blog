import { Post } from "@prisma/client"
import prisma from "../prisma/prisma"

export const createPost = async function (payload: Post) {
    try {
        const response = await prisma.post.create({ data: payload });
        return response;
    } catch (err: unknown) {
        const e = err as unknown as Error;
        console.error(e.stack);
        throw e.message;
    }
}

export const updatePost = async function (payload: Post, postId: number) {
    try {
        const response = await prisma.post.update({ where: { id: postId }, data: payload });
        return response;
    } catch (err: unknown) {
        const e = err as unknown as Error;
        console.error(e.stack);
        throw e.message;
    }
}

export const getPosts = async function () {
    try {
        const response = await prisma.post.findMany();
        return response;
    } catch (err: unknown) {
        const e = err as unknown as Error;
        console.error(e.stack);
        throw e.message;
    }
}

export const getPost = async function (postId: number) {
    try {
        const response = await prisma.post.findUnique({ where: { id: postId } });
        return response;
    } catch (err: unknown) {
        const e = err as unknown as Error;
        console.error(e.stack);
        throw e.message;
    }
}

export const deletePost = async function (postId: number) {
    try {
        const response = await prisma.post.delete({ where: { id: postId } });
        return response;
    } catch (err: unknown) {
        const e = err as unknown as Error;
        console.error(e.stack);
        throw e.message;
    }
}