import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, Axe, LoaderIcon } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import api from "../lib/axios.js";
import { themeToastError, themeToastSuccess } from "../utils/toast.js";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);

  const params = useParams();

  const navigate = useNavigate();

  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      return themeToastError("All fields are required", theme);
    }

    setSubmitLoading(true);

    try {
      if (!params.id) {
        await api.post("/notes", { title, content });
        themeToastSuccess("Note created successfully", theme);
      } else {
        await api.put(`/notes/${params.id}`, { title, content });
        themeToastSuccess("Note updated successfully", theme);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 429) {
        themeToastError("Slow down! You're creating notes too fast", theme);
      } else {
        if (!params.id) {
          themeToastError("Failed to create note", theme);
        } else {
          themeToastError("Failed to update note", theme);
        }
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      (async () => {
        setFetchLoading(true);

        try {
          const res = await api.get(`/notes/${params.id}`);
          setTitle(res.data.title);
          setContent(res.data.content);
        } catch (error) {
          console.log(error);
          themeToastError("Error in fetching note", theme);
        } finally {
          setFetchLoading(false);
        }
      })();
    }
  }, [params, theme]);

  if (fetchLoading)
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );

  return (
    <div
      className={`min-h-screen flex items-center ${
        theme === "lemonade" ? "bg-base-200" : "bg-base-300"
      }`}
    >
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6 absolute -top-5">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              {params.id ? (
                <h2 className="card-title text-2xl mb-4">
                  Update selected note
                </h2>
              ) : (
                <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              )}
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="flex flex-col gap-2">
                  <label className="label text-lg font-bold">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input rounded-2xl w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label text-lg font-bold">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea rounded-2xl h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitLoading}
                  >
                    {params.id
                      ? submitLoading
                        ? "Saving..."
                        : "Save Changes"
                      : submitLoading
                      ? "Creating..."
                      : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
