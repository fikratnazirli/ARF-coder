import { useState } from "react";

export default function HeaderLogin({ user, setUser, myAnimals }) {
  const [openLogin, setOpenLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.trim() && password.trim()) {
      setUser({ name: username });
      setOpenLogin(false);
      setUsername("");
      setPassword("");
    }
  };

  const initial = user ? user.name[0].toUpperCase() : "";

  return (
    <header className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white p-5 shadow-lg flex justify-between items-center relative z-50">
      <h1 className="text-2xl md:text-3xl font-bold tracking-wide">🐾 Heyvanlar</h1>

      {!user ? (
        <button
          onClick={() => setOpenLogin(!openLogin)}
          className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:scale-105 transition"
        >
          Login
        </button>
      ) : (
        <div className="relative">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setOpenLogin(!openLogin)}>
            <div className="w-12 h-12 bg-white text-purple-600 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
              {initial}
            </div>
            <p className="font-medium">{user.name}</p>
          </div>

          {openLogin && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded-xl shadow-xl p-3 w-32">
              <button
                onClick={() => setUser(null)}
                className="w-full py-1 rounded-lg text-center bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {!user && openLogin && (
        <div className="absolute top-full left-0 w-full flex justify-center mt-2">
          <div className="bg-white text-black w-80 p-5 rounded-2xl shadow-2xl flex flex-col gap-4 animate-fade-in">
            <h2 className="text-lg font-bold mb-2 text-purple-600">Login to Add Pets</h2>
            <input
              type="text"
              placeholder="Username"
              className="p-3 border border-purple-500 rounded-xl"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 border border-purple-500 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="w-full py-2 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
