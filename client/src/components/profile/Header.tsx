export default function Header({
    user,
    isCurrentUser,
}: {
    user: User;
    isCurrentUser: boolean;
}) {
    return (
        <div className="flex flex-row rounded-xl drop-shadow-xl py-6 px-8 bg-white items-center justify-between">
            <div className="flex flex-row items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-salmon"></div>
                <div className="flex flex-col space-y-2">
                    <h3>{user?.displayName}</h3>
                    <div className="flex flex-row">
                        {isCurrentUser ? (
                            <button
                                className="bg-salmon rounded shadow px-4 py-1 text-white"
                                onClick={() => console.log("handle follow")}
                            >
                                Follow
                            </button>
                        ) : (
                            <button
                                className="bg-salmon rounded shadow px-4 py-1 text-white"
                                onClick={() => console.log("handle settings")}
                            >
                                Settings
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-row space-x-4">
                <div className="flex flex-col items-center">
                    <h3>{user?.posts?.length || 0}</h3>
                    <p>Posts</p>
                </div>
                <div className="border-l" />
                <div className="flex flex-col items-center">
                    <h3>{user?.saves?.length || 0}</h3>
                    <p>Saves</p>
                </div>
                <div className="border-l" />
                <div className="flex flex-col items-center">
                    <h3>{user?.followers?.length || 0}</h3>
                    <p>Followers</p>
                </div>
                <div className="border-l" />
                <div className="flex flex-col items-center">
                    <h3>{user?.following?.length || 0}</h3>
                    <p>Following</p>
                </div>
            </div>
        </div>
    );
}
