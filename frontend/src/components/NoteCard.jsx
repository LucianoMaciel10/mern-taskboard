import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import { useTheme } from "../hooks/useTheme";
import api from "../lib/axios.js";
import { themeToastSuccess, themeToastError } from "../utils/toast.js";

function NoteCard({ note, setNotes }) {
  const { theme } = useTheme();

  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter(note => note._id !== id))
      themeToastSuccess("Note deleted successfully", theme);
    } catch (error) {
      console.log("Error in handleDelete", error);
      themeToastError("Failed to delete note", theme);
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className={`card h-fit hover:shadow-lg transition-all duration-200 border-t-4 border-solid ${
        theme === "lemonade"
          ? "border-[#419426] bg-base-200 shadow-[#41942679]"
          : "border-[#E87952] bg-base-100 shadow-[#e87a5271]"
      }`}
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              onClick={(e) => handleDelete(e, note._id)}
              className={`btn btn-ghost btn-xs ${
                theme === "lemonade" ? "text-red-400" : "text-error"
              }`}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NoteCard;
