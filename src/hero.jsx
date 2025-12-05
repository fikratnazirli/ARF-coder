import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const getRandomDog = () => `https://placedog.net/600/480?random&t=${Date.now()}`;
const getRandomCat = () => `https://cataas.com/cat?timestamp=${Date.now()}`;

export default function Hero({ user, myAnimals, setMyAnimals }) {
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [selectedAnimalImage, setSelectedAnimalImage] = useState("");
  const [name, setName] = useState("");
  const [km, setKm] = useState(5); // default for slider
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);

  const handleSelectAnimal = (type) => {
    setSelectedAnimal(type);
    setImgLoading(true);
    if (type === "Dog") setSelectedAnimalImage(getRandomDog());
    else if (type === "Cat") setSelectedAnimalImage(getRandomCat());
    setOpenAddModal(true);
  };

  const handleSubmit = () => {
    if (!name) return alert("Heyvanın adını daxil edin!");
    if (!user && myAnimals.length >= 1) {
      alert("Login olmadan yalnız 1 heyvan əlavə edə bilərsiniz!");
      setOpenAddModal(false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const price = Number(km) * 5;
      setMyAnimals([
        ...myAnimals,
        { type: selectedAnimal, name, km: Number(km), price, image: selectedAnimalImage },
      ]);

      setName("");
      setKm(5);
      setSelectedAnimal("");
      setSelectedAnimalImage("");
      setOpenAddModal(false);
      setLoading(false);
      setImgLoading(true);
    }, 350);
  };

  const handleDelete = (index) => {
    const copy = myAnimals.filter((_, i) => i !== index);
    setMyAnimals(copy);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center px-6 py-12">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ background: "linear-gradient(270deg,#6b73ff,#4b55ff,#000dff)", backgroundSize: "600% 600%" }}
      />

      {/* Floating shapes */}
      <motion.div className="absolute w-64 h-64 bg-white/8 rounded-full" animate={{ y: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity }} />
      <motion.div className="absolute w-80 h-80 bg-white/6 rounded-full bottom-0 right-0" animate={{ y: [0, -40, 0] }} transition={{ duration: 12, repeat: Infinity }} />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-6xl">
        {/* Left */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">Choose Your Pet</h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">Select a pet, set km (slider or input), and get instant price.</p>

          {/* Animal selection */}
          <div className="flex justify-center md:justify-start gap-4">
            {[
              { id: "Dog", emoji: "🐶" },
              { id: "Cat", emoji: "🐱" },
            ].map((a) => (
              <motion.button
                key={a.id}
                whileHover={{ scale: 1.12 }}
                className={`px-6 py-3 bg-white/90 text-black font-bold rounded-3xl shadow-md border border-gray-200 
                  flex flex-col items-center gap-1 w-28 ${selectedAnimal === a.id ? "ring-4 ring-white/30" : ""}`}
                onClick={() => handleSelectAnimal(a.id)}
              >
                <span className="text-4xl animate-bounce">{a.emoji}</span>
                <span className="text-sm">{a.id}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex flex-col items-center gap-6">
          {/* Add Modal */}
          <AnimatePresence>
            {openAddModal && (
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md"
              >
                <div className="bg-white dark:bg-[#071025] p-5 rounded-2xl shadow-2xl border border-gray-200/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-24 h-24 rounded-xl bg-gray-200 dark:bg-gray-800 overflow-hidden flex items-center justify-center">
                      {imgLoading && (
                        <div className="w-full h-full animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                      )}
                      <img
                        src={selectedAnimalImage}
                        alt={selectedAnimal}
                        onLoad={() => setImgLoading(false)}
                        className={`w-full h-full object-cover transition-all ${imgLoading ? "hidden" : "block"}`}
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{selectedAnimal || "Pet"}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Fill name and km, then add to your list.
                      </p>
                    </div>
                  </div>

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Pet name"
                    className="w-full mb-3 p-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  />

                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Distance: <span className="font-bold">{km} km</span></label>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Price: <span className="font-bold">${Number(km) * 5}</span></div>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="200"
                      value={km}
                      onChange={(e) => setKm(e.target.value)}
                      className="w-full"
                    />

                    <div className="mt-2">
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={km}
                        onChange={(e) => setKm(e.target.value)}
                        className="w-28 p-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                      {loading ? "Adding..." : "Add Pet"}
                    </button>
                    <button
                      onClick={() => {
                        setOpenAddModal(false);
                        setSelectedAnimal("");
                        setSelectedAnimalImage("");
                        setImgLoading(true);
                      }}
                      className="py-2 px-4 bg-gray-200 dark:bg-gray-700 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animal Cards List */}
          {myAnimals.length > 0 ? (
            <div className="mt-6 w-80 space-y-3">
              <h2 className="text-white font-bold">Your Animals</h2>

              {myAnimals.map((a, idx) => (
                <motion.div
                  key={idx}
                  layout
                  whileHover={{ scale: 1.02, rotateX: 0.5 }}
                  className="p-3 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center gap-3 transform-gpu perspective-1000 hover:shadow-2xl transition"
                >
                  <img src={a.image} alt={a.type} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-bold">{a.name}</p>
                    <p className="text-sm text-gray-600">{a.type} — {a.km} km — ${a.price}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="ml-2 py-1 px-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    title="Delete"
                  >
                    ❌
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="mt-6 w-80 p-4 rounded-xl bg-white/20 backdrop-blur-md text-center">
              <p className="text-white/90">Heç bir heyvan əlavə edilməyib. Əlavə et!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
