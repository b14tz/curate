import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPosts, searchUsers } from "@/api/routes/search";
import StyledNavLink from "@/components/StyledNavLink";
import { Input } from "@/components/ui/input";

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
                                    <p>●</p>
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
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex space-x-4">
                    <StyledNavLink
                        to="/search/users"
                        label="Users"
                        pendingClasses=""
                        activeClasses="border-b-2 border-primary"
                    />
                    <StyledNavLink
                        to="/search/posts"
                        label="Posts"
                        pendingClasses=""
                        activeClasses="border-b-2 border-primary"
                    />
                </div>
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
                <Input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 "
                    placeholder="Search Users, Playlists..."
                    onChange={(e) => handleSearch(e)}
                    required
                />
            </div>
            {renderSearchResults()}
        </div>
    );
}
