import { Request, Response } from "express";

import { db } from "../utils/db.server";

export const createPost = async (req: Request, res: Response) => {
    const data = req.body;
    console.log(data);
    try {
        const result = await db.post.create({
            data: { ...data, downloads: 0 },
        });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error creating post`);
    }
};

export const getPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await db.post.findFirst({ where: { id } });
        return res.status(200).send(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send(`Error getting user data`);
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
        await db.post.update({ where: { id }, data: { ...data } });
        return res.status(200).send("Successfully updated post");
    } catch (error) {
        return res.status(500).send("Error updating user");
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        await db.post.delete({ where: { id } });
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error deleting user`);
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await db.post.findMany({
            include: {
                author: true,
                likes: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        const formattedPosts = posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            songs: [
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.udiscovermusic.com/wp-content/uploads/2017/08/Beatles-Sgt-Pepper-Cover-1536x1536.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.nme.com/wp-content/uploads/2016/10/254.TheSmiths_MeatIsMurder_141013-1.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.nme.com/wp-content/uploads/2016/10/2014Oasis_DefinitelyMaybe_150414-5.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.nme.com/wp-content/uploads/2016/10/2014TVU_Thevelvetunderground_120614.png",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.adobe.com/express/learn/blog/media_1e8a63b9d1a2b3d394f6ebf94bec8c98cfe63ab9b.jpeg?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.adobe.com/express/learn/blog/media_1641ddda7495afa88619c450b75adbe9e538423e4.png?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.adobe.com/express/learn/blog/media_10feefa5f209429a5b3d182bc02dc015acd83d7d9.jpeg?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.adobe.com/express/learn/blog/media_1c091733891f85121b950e0ffb0125ffb7706cfac.png?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://media.architecturaldigest.com/photos/60747f8968ffd789bbaac1a3/16:9/w_2240,c_limit/TheNewAbnormal.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://cdn.musebycl.io/2021-04/cream_disraeligears.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://cdn.musebycl.io/2021-04/theblackcrowes_lions.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://cdn.musebycl.io/2021-04/thecrystalmethod_tweekend.jpg",
                },
            ],
            origin: post.origin,
            downloads: post.downloads,
            createdAt: post.createdAt,
            author: post.author,
            likes: post.likes || [],
            comments: post.comments || [],
        }));
        return res.status(200).send(formattedPosts);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all posts`);
    }
};

export const getAllFollowerPosts = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const follows = await db.follow.findMany({
            where: { followerId: id },
        });
        const followingIds = follows.map((follow) => follow.followingId);
        followingIds.push(id);

        const posts = await db.post.findMany({
            where: { authorId: { in: followingIds } },
            include: {
                author: true,
                likes: true,
                comments: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const formattedPosts = posts.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            songs: [
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.udiscovermusic.com/wp-content/uploads/2017/08/Beatles-Sgt-Pepper-Cover-1536x1536.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.nme.com/wp-content/uploads/2016/10/254.TheSmiths_MeatIsMurder_141013-1.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.nme.com/wp-content/uploads/2016/10/2014Oasis_DefinitelyMaybe_150414-5.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.nme.com/wp-content/uploads/2016/10/2014TVU_Thevelvetunderground_120614.png",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.adobe.com/express/learn/blog/media_1e8a63b9d1a2b3d394f6ebf94bec8c98cfe63ab9b.jpeg?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.adobe.com/express/learn/blog/media_1641ddda7495afa88619c450b75adbe9e538423e4.png?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.adobe.com/express/learn/blog/media_10feefa5f209429a5b3d182bc02dc015acd83d7d9.jpeg?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://www.adobe.com/express/learn/blog/media_1c091733891f85121b950e0ffb0125ffb7706cfac.png?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://media.architecturaldigest.com/photos/60747f8968ffd789bbaac1a3/16:9/w_2240,c_limit/TheNewAbnormal.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://cdn.musebycl.io/2021-04/cream_disraeligears.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://cdn.musebycl.io/2021-04/theblackcrowes_lions.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl:
                        "https://cdn.musebycl.io/2021-04/thecrystalmethod_tweekend.jpg",
                },
            ],
            origin: post.origin,
            downloads: post.downloads,
            createdAt: post.createdAt,
            author: post.author,
            likes: post.likes || [],
            comments: post.comments || [],
        }));

        return res.status(200).send(formattedPosts);
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all follower posts`);
    }
};
