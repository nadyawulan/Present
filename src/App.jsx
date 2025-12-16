
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const imageList = [
  '/assets/pic1.png',
  '/assets/pic2.png',
  '/assets/pic4.png',
  '/assets/pic3.png',
  '/assets/pic5.png',
  '/assets/logo5.png',
];

const wishes = [
  "May God bless you with joy, health, and success!",
  "Wishing you a day filled with love and laughter.",
  "Happy Birthday! May all your dreams come true.",
  "Stay blessed and keep smiling always!",
];

const galleryImages = [
  '/assets/logo5.png',
  '/assets/pic1.png',
  '/assets/pic2.png',
  '/assets/pic4.png',
  '/assets/pic3.png',
  '/assets/pic5.png',
];

const allWishes = [
  "Wishing you the happiest of birthdays!",
  "Happy Birthday Wulan!! I hope your day is filled with cake and laughter!",
  "Cheers to another year of awesome adventures! Happy Birthday, Wulan!",
  "Sending you the biggest virtual hug today! Happy Birthday, superstar! 🎈",
  "May your birthday be sprinkled with joy, laughter, and lots of cake! 🍰",
  "Another year older, another year more fabulous! Happy Birthday, Wulan!",
];

export default function App() {
  const [showWish, setShowWish] = useState(false);
  const [selectedWish, setSelectedWish] = useState('');
  
  // Confetti on load
  useEffect(() => {
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 2;
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 0 },
        colors: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 1 },
        colors: ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const showRandomWish = () => {
    const random = allWishes[Math.floor(Math.random() * allWishes.length)];
    setSelectedWish(random);
    setShowWish(true);
  };

  const [memory, setMemory] = useState("No memories yet! Add one below 😊");
  const [newMemory, setNewMemory] = useState("");
  // Inside App.jsx
const [currentImageIndex, setCurrentImageIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImageIndex((prev) => (prev + 1) % imageList.length);
  }, 5000); // Change every 5 seconds

  return () => clearInterval(interval);
}, []);
  const addMemory = () => {
    if (newMemory.trim()) {
      setMemory(newMemory);
      setNewMemory("");
    }
  };

  const randomMemory = () => {
    const fake = [
      "That time we laughed until we cried!",
      "Your smile lights up every room!",
      "You’re the best friend anyone could ask for ❤️"
    ];
    setMemory(fake[Math.floor(Math.random() * fake.length)]);
  };

  return (
    <div>
      <div className="header">
        <h1>Happy Birthday, Wulan! 🎉</h1>
      </div>

      <div className="container">
        {/* Confetti space */}
        <div style={{ height: '60px' }}></div>

        {/* Carousel */}
        {/* <div className="section">
          <div className="carousel">
            <img src={imageList[0]} alt="Birthday" onError={(e) => e.target.src = '/assets/logo5.png'} />
          </div>
          {/* Simple auto-rotate could be added later — for now, static */}
        {/* </div> }*/ }
        <div className="carousel-wrapper">
  <img
    key={currentImageIndex}
    src={imageList[currentImageIndex]}
    alt="Birthday memory"
    className="carousel-img"
    onError={(e) => e.target.src = '/assets/logo5.png'}
  />
</div>

        {/* Memory Jar */}
        <div className="section">
          <h2 style={{ textAlign: 'center', color: '#be185d' }}>Memory Jar 🎁</h2>
          <div className="memory-jar">
            <textarea
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="Add a sweet memory..."
              rows="3"
            />
            <button onClick={addMemory}>Add to Jar</button>
            <button onClick={randomMemory} style={{ background: '#fb923c' }}>Pick Random</button>
            <div style={{ marginTop: '1rem', fontStyle: 'italic', color: '#be185d' }}>
              "{memory}"
            </div>
          </div>
        </div>

        {/* Wishes */}
        <div className="section">
          <h2 style={{ textAlign: 'center', color: '#be185d' }}>Birthday Wishes 💖</h2>
          {wishes.map((wish, i) => (
            <div key={i} className="wish-card" style={{ marginTop: '12px' }}>
              {wish}
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="section">
          <h2 style={{ textAlign: 'center', color: '#be185d' }}>Birthday Gallery 📸</h2>
          <div className="gallery">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i}`}
                onClick={showRandomWish}
                onError={(e) => e.target.src = '/assets/logo.png'}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showWish && (
        <div className="modal" onClick={() => setShowWish(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎂</div>
            <p>{selectedWish}</p>
            <button onClick={() => setShowWish(false)}>Close</button>
          </div>
        </div>
      )}

      <footer style={{ textAlign: 'center', padding: '2rem', color: '#be185d' }}>
        Made with 💖 for Wulan
      </footer>
    </div>
  );
}