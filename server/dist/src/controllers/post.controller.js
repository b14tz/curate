"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFollowerPosts = exports.getAllPosts = exports.deletePost = exports.updatePost = exports.getPost = exports.createPost = void 0;
const db_server_1 = require("../utils/db.server");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    try {
        const result = yield db_server_1.db.post.create({
            data: Object.assign(Object.assign({}, data), { downloads: 0 }),
        });
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error creating post`);
    }
});
exports.createPost = createPost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield db_server_1.db.post.findFirst({ where: { id } });
        return res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send(`Error getting user data`);
    }
});
exports.getPost = getPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    try {
        yield db_server_1.db.post.update({ where: { id }, data: Object.assign({}, data) });
        return res.status(200).send("Successfully updated post");
    }
    catch (error) {
        return res.status(500).send("Error updating user");
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield db_server_1.db.post.delete({ where: { id } });
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error deleting user`);
    }
});
exports.deletePost = deletePost;
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield db_server_1.db.post.findMany({
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
                    imageUrl: "https://www.udiscovermusic.com/wp-content/uploads/2017/08/Beatles-Sgt-Pepper-Cover-1536x1536.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.nme.com/wp-content/uploads/2016/10/254.TheSmiths_MeatIsMurder_141013-1.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.nme.com/wp-content/uploads/2016/10/2014Oasis_DefinitelyMaybe_150414-5.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.nme.com/wp-content/uploads/2016/10/2014TVU_Thevelvetunderground_120614.png",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.adobe.com/express/learn/blog/media_1e8a63b9d1a2b3d394f6ebf94bec8c98cfe63ab9b.jpeg?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.adobe.com/express/learn/blog/media_1641ddda7495afa88619c450b75adbe9e538423e4.png?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.adobe.com/express/learn/blog/media_10feefa5f209429a5b3d182bc02dc015acd83d7d9.jpeg?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.adobe.com/express/learn/blog/media_1c091733891f85121b950e0ffb0125ffb7706cfac.png?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://media.architecturaldigest.com/photos/60747f8968ffd789bbaac1a3/16:9/w_2240,c_limit/TheNewAbnormal.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://cdn.musebycl.io/2021-04/cream_disraeligears.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://cdn.musebycl.io/2021-04/theblackcrowes_lions.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://cdn.musebycl.io/2021-04/thecrystalmethod_tweekend.jpg",
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all posts`);
    }
});
exports.getAllPosts = getAllPosts;
const getAllFollowerPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const follows = yield db_server_1.db.follow.findMany({
            where: { followerId: id },
        });
        const followingIds = follows.map((follow) => follow.followingId);
        followingIds.push(id);
        const posts = yield db_server_1.db.post.findMany({
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
                    imageUrl: "https://www.udiscovermusic.com/wp-content/uploads/2017/08/Beatles-Sgt-Pepper-Cover-1536x1536.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.nme.com/wp-content/uploads/2016/10/254.TheSmiths_MeatIsMurder_141013-1.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.nme.com/wp-content/uploads/2016/10/2014Oasis_DefinitelyMaybe_150414-5.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.nme.com/wp-content/uploads/2016/10/2014TVU_Thevelvetunderground_120614.png",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.adobe.com/express/learn/blog/media_1e8a63b9d1a2b3d394f6ebf94bec8c98cfe63ab9b.jpeg?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.adobe.com/express/learn/blog/media_1641ddda7495afa88619c450b75adbe9e538423e4.png?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.adobe.com/express/learn/blog/media_10feefa5f209429a5b3d182bc02dc015acd83d7d9.jpeg?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://www.adobe.com/express/learn/blog/media_1c091733891f85121b950e0ffb0125ffb7706cfac.png?width=2000&format=webply&optimize=medium",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://media.architecturaldigest.com/photos/60747f8968ffd789bbaac1a3/16:9/w_2240,c_limit/TheNewAbnormal.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://cdn.musebycl.io/2021-04/cream_disraeligears.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://cdn.musebycl.io/2021-04/theblackcrowes_lions.jpg",
                },
                {
                    title: "Stairway to Heaven",
                    artist: "Jimmy Choo Choo",
                    imageUrl: "https://cdn.musebycl.io/2021-04/thecrystalmethod_tweekend.jpg",
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).send(`Error getting all follower posts`);
    }
});
exports.getAllFollowerPosts = getAllFollowerPosts;
