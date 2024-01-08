import { useAuth } from "../contexts/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function ErrorMessage() {
  const { error, setError } = useAuth();

  return (
    error && (
      <div className="flex justify-center">
        <div className="rounded-md max-w-md w-full bg-red-50 p-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <IconButton
                onClick={() => setError("")}
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              >
                <CloseIcon />
              </IconButton>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error: {error}
              </h3>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
