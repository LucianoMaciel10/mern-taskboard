import { Routes, Route, RouterProvider } from "react-router";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme } = useTheme();

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 ${
          theme === "lemonade"
            ? "[background:radial-gradient(125%_125%_at_50%_10%,#F8FDEF_60%,#419426_100%)]"
            : "[background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#E87952_100%)]"
        }`}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
