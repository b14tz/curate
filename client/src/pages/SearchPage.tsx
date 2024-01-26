import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPosts, searchUsers } from "~/api/routes/search";
import StyledNavLink from "~/components/StyledNavLink";

export default function SearchPage({ postsSearch = false }) {
    const [users, setUsers] = useState<User[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    const navigate = useNavigate();

    const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const searchTerm = e.target.value;
        if (!searchTerm) return;
        let data;
        if (postsSearch) {
            data = await searchPosts(searchTerm);
            setPosts(data);
        } else {
            data = await searchUsers(searchTerm);
            setUsers(data);
        }
        console.log(searchTerm);
    };

    const renderSearchResults = () => {
        if (postsSearch) {
            return (
                <div>
                    <ul className="space-y-2">
                        {posts.map((post) => (
                            <li key={post.id}>
                                <button
                                    onClick={() => navigate(`/post/${post.id}`)}
                                    className="flex space-x-4"
                                >
                                    <p> {post.title}</p>
                                    <p>-</p>
                                    <p>{post.author.displayName}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <div>
                    <ul className="space-y-2">
                        {users.map((user) => (
                            <li key={user.id}>
                                <button
                                    onClick={() => navigate(`/user/${user.id}`)}
                                >
                                    {user.displayName}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    return (
        <div className="space-y-4">
            <h3>Search</h3>
            <hr />

            <div className="flex space-x-4">
                <StyledNavLink
                    to="/search/users"
                    label="Users"
                    pendingClasses="text-black"
                    activeClasses="text-black border-b-2 border-salmon"
                />
                <StyledNavLink
                    to="/search/posts"
                    label="Posts"
                    pendingClasses="text-black"
                    activeClasses="text-black border-b-2 border-salmon"
                />
            </div>

            <label
                title="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
                Search
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Users, Playlists..."
                    onChange={(e) => handleSearch(e)}
                    required
                />
            </div>
            {renderSearchResults()}
        </div>
    );
}
