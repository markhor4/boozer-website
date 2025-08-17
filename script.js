document.addEventListener("DOMContentLoaded", function() {
  // 1. Get elements safely
  const drunkButton = document.getElementById("drunkButton");
  const boozSong = document.getElementById("boozSong");
  
  // 2. Verify elements exist before using them
  if (!drunkButton || !boozSong) {
    console.error("Critical elements missing!");
    console.log("drunkButton exists:", !!drunkButton);
    console.log("boozSong exists:", !!boozSong);
    return;
  }
  
  // 3. Initialize audio settings
  boozSong.loop = true;
  
  // 4. Toggle function
  function toggleDrunkMode() {
    document.body.classList.toggle("drunk-mode");
    
    // Update button text
    const isDrunkMode = document.body.classList.contains("drunk-mode");
    drunkButton.textContent = isDrunkMode ? "🍹 Sober Mode" : "🎶 Boozer Party Mode";
    
    // Handle audio
    if (isDrunkMode) {
      boozSong.play().catch(err => {
        console.log("Autoplay blocked:", err);
        drunkButton.textContent = "▶️ Click to Play";
      });
    } else {
      boozSong.pause();
      boozSong.currentTime = 0;
    }
  }
  
  // 5. Add event listener
  drunkButton.addEventListener("click", toggleDrunkMode);
  
  // 6. Make function available globally (for HTML onclick)
  window.toggleDrunkMode = toggleDrunkMode;
});

// Keep your existing scroll function
function scrollToSection(sectionId) {
  const section = document.querySelector(`.${sectionId}`);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    section.style.boxShadow = '0 0 0 3px #aa336a';
    setTimeout(() => {
      section.style.boxShadow = 'none';
    }, 1000);
  }
}
// Test if file exists on Vercel
fetch('boozer-song.mp3')
  .then(res => console.log('MP3 Status:', res.status))
  .catch(err => console.error('MP3 Fetch Error:', err));

// Fallback if audio fails
const boozSong = document.getElementById('boozSong');
boozSong.addEventListener('error', () => {
  console.error('Audio failed! Trying absolute path...');
  boozSong.src = '/boozer-song.mp3'; // Fallback to absolute path
});
