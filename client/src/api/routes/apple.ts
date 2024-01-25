import axiosInstance from "../axios";

export const getAppleDeveloperToken = async () => {
    const res = await axiosInstance.get(`/apple/devtoken`);
    return res.data;
};

export const fetchAllPlaylistsByMusicUserToken = async (
    musicUserToken: string
) => {
    const res = await axiosInstance.get(`/apple/playlists`, {
        headers: {
            "Music-User-Token": musicUserToken,
        },
    });
    return res.data;
};

export const fetchTopApplePlaylists = async () => {
    const res = await axiosInstance.get(`/apple/playlists/top`);
    return res.data;
};
