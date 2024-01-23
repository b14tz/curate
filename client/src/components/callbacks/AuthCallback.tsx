import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "~/redux/features/user/userSlice";

export default function AuthCallback({}: {}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        if (token) {
            const data: { user: {} } = jwtDecode(token);
            dispatch(setUser(data.user));
            navigate("/");
        }
    }, []);

    return (
        <div className="w-full h-[400px] flex items-center justify-center">
            <p>Redirecting...</p>
        </div>
    );
}
