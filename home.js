function showWhatsNew() {
  const whatsNewPopup = document.createElement("div");
  whatsNewPopup.className = "whats-new-popup";
  whatsNewPopup.innerHTML = `
    <div class="whats-new-content">
      <h2>🎉 What's New!</h2>
      <ul>
        <li>✨ New Statistics Dashboard</li>
        <li>📊 Detailed Performance Analysis</li>
        <li>🎯 Accuracy Tracking</li>
      </ul>
      <button class="close-whats-new">Got it!</button>
    </div>
  `;

  document.body.appendChild(whatsNewPopup);

  // Close button functionality
  const closeButton = whatsNewPopup.querySelector(".close-whats-new");
  closeButton.addEventListener("click", () => {
    whatsNewPopup.style.opacity = "0";
    setTimeout(() => whatsNewPopup.remove(), 300);
  });
}

// Show the popup when the home page loads
document.addEventListener("DOMContentLoaded", showWhatsNew);
