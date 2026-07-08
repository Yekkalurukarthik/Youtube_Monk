let sessionStart = null;
let isMonkMode = false;

function enableMonkMode() {
  if (isMonkMode) return;

  toggleElements("none");
  addSearchToggleButton();
  addStatsButton();

  const btn = document.getElementById("monk-toggle");
  if (btn) {
    btn.innerText = "Monk Mode: ON";
    btn.style.backgroundColor = "#11bb1f";
  }

  sessionStart = Date.now();
  isMonkMode = true;
}

async function disableMonkMode() {
  if (!isMonkMode) return;
  toggleElements("block");
  removeSearchToggleButton();
  removeStatsButton();
  const btn = document.getElementById("monk-toggle");
  if (btn) {
    btn.innerText = "Monk Mode: OFF";
    btn.style.backgroundColor = "cyan";
  }

  const duration = Math.floor((Date.now() - sessionStart) / 1000);

  sessionStart = null;
  isMonkMode = false;

  // Send to backend
  console.log("Inside disable monkmode");
  try {
    chrome.storage.local.get(["token"], async ({ token }) => {
      if (!token) {
        console.log("No token found, not sending session data");
        return
      };
      try {
        console.log("Sending session data with token:", token);
        await fetch("http://localhost:5000/api/monk/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ duration }),
        });


        console.log("Session sent:", duration);
      } catch (err) {
        console.error("Error sending session:", err);
      }
    });
  } catch (err) {
    console.log("Error :", err.message);
  }
}

window.addEventListener("message", (event) => {
  if (event.source !== window) return;

  if (event.data.type === "SAVE_TOKEN") {
    chrome.runtime.sendMessage({
      action: "SAVE_TOKEN",
      token: event.data.token,
    });
    console.log("Forwarded token:", event.data.token);
  }
});


document.addEventListener("visibilitychange", () => {
  if (document.hidden && isMonkMode) {
    disableMonkMode();
  }
});

// When tab is closed / refreshed
window.addEventListener("beforeunload", () => {
  if (isMonkMode) disableMonkMode();
});

/* ------------------ UI FUNCTIONS ------------------ */
function toggleElements(display) {
  const selectors = [
    "ytd-rich-grid-renderer",
    "ytd-watch-next-secondary-results-renderer",
    "#comments",
    "ytd-mini-guide-renderer",
    "ytd-reel-shelf-renderer",
    "ytd-guide-renderer"
  ];

  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.style.display = display;
    });
  });

  const guide = document.getElementById("guide-button");
  if (guide) guide.style.display = display;
}

/* ------------------ MONK BUTTON ------------------ */
function addToggleButton() {
  if (document.getElementById("monk-toggle")) return;

  const btn = document.createElement("button");
  btn.id = "monk-toggle";
  btn.innerText = "Monk Mode: OFF";

  Object.assign(btn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "15px",
    backgroundColor: "cyan",
    borderRadius: "15px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    zIndex: "9999",
  });

  document.body.appendChild(btn);

  btn.onclick = () => {
    if (!isMonkMode) enableMonkMode();
    else disableMonkMode();
  };
}

/* ------------------ SEARCH BUTTON ------------------ */
function addSearchToggleButton() {
  if (document.getElementById("search-toggle")) return;

  const btn = document.createElement("button");
  btn.id = "search-toggle";
  btn.innerText = "Hide Search Suggestions";

  Object.assign(btn.style, {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    padding: "10px",
    backgroundColor: "#3e90e9",
    color: "white",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    zIndex: "9999",
  });

  let visible = true;

  btn.onclick = () => {
    const suggestions = document.querySelector(
      ".ytSearchboxComponentSuggestionsContainer"
    );

    if (!suggestions) return;

    visible = !visible;
    suggestions.style.filter = visible ? "none" : "blur(8px)";

    btn.innerText = visible
      ? "Hide Search Suggestions"
      : "Show Search Suggestions";
  };

  document.body.appendChild(btn);
}

function removeSearchToggleButton() {
  const btn = document.getElementById("search-toggle");
  if (btn) btn.remove();
}

/* ------------------ STATS BUTTON ------------------ */
function addStatsButton() {
  if (document.getElementById("stats-btn")) return;

  const btn = document.createElement("button");
  btn.id = "stats-btn";
  btn.innerText = "Show Stats";

  Object.assign(btn.style, {
    position: "fixed",
    bottom: "140px",
    right: "20px",
    padding: "10px",
    backgroundColor: "#ff8800",
    color: "white",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    zIndex: "9999",
  });

  btn.onclick = () => {
    chrome.runtime.sendMessage({
      action: "openSignup"
    });
  };
  document.body.appendChild(btn);
}

function removeStatsButton() {
  const btn = document.getElementById("stats-btn");
  if (btn) btn.remove();
}

function filterEntertainmentVideos() {
  const blockedKeywords = [
    "prank",
    "movie",
    "trailer",
    "roast",
    "comedy",
    "vlog",
    "shorts",
    "mrbeast",
    "gaming",
    "reaction",
    "song",
    "music",
    "live match"
  ];

  const videos = document.querySelectorAll("ytd-rich-item-renderer");

  videos.forEach((video) => {
    const titleEl = video.querySelector("#video-title");

    if (!titleEl) return;

    const title = titleEl.innerText.toLowerCase();

    const isEntertainment = blockedKeywords.some((word) =>
      title.includes(word)
    );

    if (isEntertainment) {
      video.style.display = "none";
    }
  });
}
/* ------------------ INIT ------------------ */
addToggleButton();

// addStatsButton();

// ✅ THIS GOES HERE (NOT inside disableMonkMode)
// chrome.storage.local.get(["MonkModeEnabled", "sessionStart"], (res) => {
//   if (res.MonkModeEnabled) {
//     isMonkMode = true;
//     sessionStart = res.sessionStart || Date.now();

//     toggleElements("none");
//     addSearchToggleButton();

//     const btn = document.getElementById("monk-toggle");
//     if (btn) {
//       btn.innerText = "Monk Mode: ON";
//       btn.style.backgroundColor = "#11bb1f";
//     }
//   }
// });
window.addEventListener("message", (event) => {

  if (event.source !== window) return;

  // SAVE TOKEN
  if (event.data.type === "SAVE_TOKEN") {

    chrome.runtime.sendMessage({
      action: "SAVE_TOKEN",
      token: event.data.token,
    });

  }

  // GET TOKEN
  if (event.data.type === "GET_TOKEN") {

    chrome.storage.local.get(["token"], ({ token }) => {

      window.postMessage({
        type: "TOKEN_RESPONSE",
        token,
      }, "*");

    });

  }

});

const observer = new MutationObserver(() => {
  addToggleButton();
  filterEntertainmentVideos();
});
observer.observe(document.body, { childList: true, subtree: true });