import axiosInstance from "../axios";

export const savePlaylist = async ({
    title,
    description,
    origin,
    originId,
    destination,
    destinationUserToken,
}: {
    title: string;
    description: string;
    origin: string;
    originId: string;
    destination: string;
    destinationUserToken: string;
}) => {
    const res = await axiosInstance.post(`/playlist/save`, {
        title,
        description,
        origin,
        originId,
        destination,
        destinationUserToken,
    });
    return res.data;
};
