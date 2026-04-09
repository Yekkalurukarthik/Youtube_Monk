// // document.getElementById("sidebar").style.backgroundColor="red";
// // document.body.onmouseenter = function (_){
// //     document.body.style.backgroundColor = "yellow";}
// // // document.body.style.color="red";
// // document.body.onmouseleave = function (_){
// //     document.body.style.backgroundColor = "cyan";}

// // document.getElementById("comments").onmouseover=function (){
// //     document.getElementById("comments").style.backgroundColor="blue";
// // }    

// // document.getElementById("comments").onmouseout=function (){
// //     document.getElementById("comments").style.backgroundColor="yellow";
// // }    
// function makeYellow() {
//   document.documentElement.style.backgroundColor = "yellow";
//   document.body.style.backgroundColor = "yellow";
//   document.body.style.color = "red";
// }

// makeYellow();

// // In case site loads dynamically (YouTube, etc.)
// const observer = new MutationObserver(makeYellow);
// observer.observe(document.documentElement, {
//   childList: true,
//   subtree: true
// });

// function monkMode() {

//   //button green color
//   let buttonn = document.getElementById("monk-toggle");
//   buttonn.style.backgroundColor = "#11bb1f";
//   // Hide homepage feed
//   const homeFeed = document.querySelector("ytd-rich-grid-renderer");
//   if (homeFeed) homeFeed.style.display = "none";

//   // Hide sidebar recommendations (watch page)
//   const sidebar = document.querySelector("ytd-watch-next-secondary-results-renderer");
//   if (sidebar) sidebar.style.display = "none";

//   // Hide comments
//   const comments = document.querySelector("#comments");
//   if (comments) comments.style.display = "none";

//   const hide = document.getElementById("guide-button");
//   hide.style.display = "none";

//   const side = document.querySelector(".style-scope .ytd-mini-guide-renderer");
//   if (side) side.style.display = "none";



//   const create = document.querySelector(".yt-spec-touch-feedback-shape__fill");
//   if (create) create.style.display = "none";
//   // Hide Shorts section
//   const shorts = document.querySelectorAll("ytd-reel-shelf-renderer");
//   shorts.forEach(section => section.style.display = "none");

//   if (document.getElementById("search-toggle")) { return } else {
//     addSearchToggleButton();
//   };


// }

// function showMonkDialog() {

//   // Prevent duplicate dialog
//   if (document.getElementById("monk-dialog-overlay")) return;

//   // Create overlay
//   const overlay = document.createElement("div");
//   overlay.id = "monk-dialog-overlay";

//   overlay.style.position = "fixed";
//   overlay.style.inset = "0";
//   overlay.style.background = "rgba(0,0,0,0.6)";
//   overlay.style.display = "flex";
//   overlay.style.alignItems = "center";
//   overlay.style.justifyContent = "center";
//   overlay.style.zIndex = "1000000";

//   // Create dialog box
//   const box = document.createElement("div");
//   box.style.background = "#111";
//   box.style.color = "white";
//   box.style.padding = "25px";
//   box.style.borderRadius = "12px";
//   box.style.textAlign = "center";
//   box.style.width = "280px";

//   box.innerHTML = `
//     <h3>Enter Focus Time</h3>
//     <input type="number" id="monk-minutes" placeholder="Minutes" min="1"
//       style="width:100%; padding:8px; margin:15px 0; border-radius:6px; border:none;">
//     <button id="monk-start-btn"
//       style="padding:8px 14px; border:none; border-radius:6px; background:#ff4e50; color:white; cursor:pointer;">
//       Start
//     </button>
//     <button id="monk-cancel-btn"
//       style="padding:8px 14px; border:none; border-radius:6px; background:#ffffff; color:red; cursor:pointer;">
//       Cancel
//     </button>
//   `;

//   overlay.appendChild(box);
//   document.body.appendChild(overlay);

//   // Close when clicking outside
//   overlay.addEventListener("click", function (e) {
//     if (e.target === overlay) {
//       document.getElementById("monk-toggle").innerText = `Monk Mode: ON (2 min)`;
//       document.getElementById("monk-toggle").disabled = true; // disable toggle during countdown
//       document.getElementById("monk-toggle").style.backgroundColor = "#777"; // gray out button
//       document.getElementById("monk-toggle").style.cursor = "not-allowed";
//       overlay.remove();
//       startFocusTimer(2);
//     }
//   });

//   // Start button click
//   document.getElementById("monk-start-btn").addEventListener("click", function () {
//     const minutes = parseInt(document.getElementById("monk-minutes").value);
//     chrome.storage.local.set({monkMinutes:minutes});
//     if (!minutes || minutes <= 0) return;
//     startFocusTimer(minutes);

//     document.getElementById("monk-toggle").innerText = `Monk Mode: ON (${minutes} min)`;
//     document.getElementById("monk-toggle").disabled = true; // disable toggle during countdown
//     document.getElementById("monk-toggle").style.backgroundColor = "#777"; // gray out button
//     document.getElementById("monk-toggle").style.cursor = "not-allowed";

//     overlay.remove();
//   });

//   //cancel button click
//   document.getElementById("monk-cancel-btn").addEventListener("click", function () {
//     chrome.storage.local.get(["MonkModeEnabled"],(result) => {
//       let MonkModeEnabled = !result.MonkModeEnabled;
//       chrome.storage.local.set({MonkModeEnabled});
//     })
//     overlay.remove();
//     disableMonkMode();
//   });
// }

// let focusInterval;

// function startFocusTimer(minutes) {

//   if(document.getElementById("monk-timer"))return;
//   let remainingTime = minutes * 60;

//   const timer = document.createElement("div");
//   timer.id = "monk-timer";

//   timer.style.position = "fixed";
//   timer.style.top = "50px";
//   timer.style.right = "20px";
//   timer.style.padding = "12px 20px";
//   timer.style.background = "linear-gradient(45deg, #2dacbd, #3024dd)";
//   timer.style.color = "white";
//   timer.style.fontSize = "20px";
//   timer.style.fontWeight = "bold";
//   timer.style.borderRadius = "10px";
//   timer.style.zIndex = "999999";

//   document.body.appendChild(timer);

//   focusInterval = setInterval(() => {

//     remainingTime--;

//     const minutes = Math.floor(remainingTime / 60);
//     const seconds = remainingTime % 60;

//     timer.innerText =
//       `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

//     if (remainingTime <= 0) {

//       clearInterval(focusInterval);

//       timer.innerText = "Focus Session Complete!";

//       disableMonkMode(); // your function

//       chrome.storage.local.get(["MonkModeEnabled"] ,(result) => {
//         const MonkModeEnabled = !result.MonkModeEnabled;
//         chrome.storage.local.set({MonkModeEnabled});
//       })

//       setTimeout(() => {
//         timer.remove();
//       }, 3000);

//     }

//   }, 1000);
// }

// function disableMonkMode() {

//   // Show homepage feed
//   const homeFeed = document.querySelector("ytd-rich-grid-renderer");
//   if (homeFeed) homeFeed.style.display = "block";

//   // Show sidebar recommendations (watch page)
//   const sidebar = document.querySelector("ytd-watch-next-secondary-results-renderer");
//   if (sidebar) sidebar.style.display = "block";

//   // Show comments
//   const comments = document.querySelector("#comments");
//   if (comments) comments.style.display = "block";

//   const hide = document.getElementById("guide-button");
//   hide.style.display = "block";

//   const side = document.querySelector(".style-scope .ytd-mini-guide-renderer");
//   if (side) side.style.display = "block";

//   // Show Shorts section
//   const shorts = document.querySelectorAll("ytd-reel-shelf-renderer");
//   shorts.forEach(section => section.style.display = "block");

//   // document.getElementById("search-toggle")
//   removeSearchToggleButton();
//   document.getElementById("monk-toggle").innerText = `Monk Mode: OFF`;
//   document.getElementById("monk-toggle").disabled = false; // disable toggle during countdown
//   document.getElementById("monk-toggle").style.backgroundColor = "#61cf40"; // gray out button
//   document.getElementById("monk-toggle").style.cursor = "pointer"


// }

// function addToggleButton() {
//   if (document.getElementById("monk-toggle")) return;

//   const btn = document.createElement("button");
//   btn.id = "monk-toggle";
//   btn.innerText = "Monk Mode: OFF";

//   btn.style.position = "fixed";
//   btn.style.bottom = "20px";
//   btn.style.right = "20px";
//   btn.style.padding = "15px";
//   btn.style.backgroundColor = "cyan";
//   btn.style.color = "black";
//   btn.style.border = "none";
//   btn.style.borderRadius = "15px";
//   btn.style.cursor = "pointer";
//   btn.style.fontWeight = "bold";
//   btn.style.zIndex = "9999";

//   document.body.appendChild(btn);

//   // ✅ Load saved state on page load
//   chrome.storage.local.get(["MonkModeEnabled"], (result) => {
//     const savedState = result.MonkModeEnabled;

//     if (savedState) {
//       monkMode();
//       btn.innerText = "Monk Mode: ON";
//       // document.getElementById("monk-toggle").innerText = `Monk Mode: ON (${minutes} min)`;
//       document.getElementById("monk-toggle").disabled = true; // disable toggle during countdown
//       document.getElementById("monk-toggle").style.backgroundColor = "#777"; // gray out button
//       document.getElementById("monk-toggle").style.cursor = "not-allowed";
//     }
//   });

//   btn.addEventListener("click", () => {
//     chrome.storage.local.get(["MonkModeEnabled"], (result) => {
//       let MonkModeEnabled = !(result.MonkModeEnabled || false);
//       // ✅ Save new state
//       chrome.storage.local.set({ MonkModeEnabled });

//       if (MonkModeEnabled) {
//         showMonkDialog();
//         chrome.storage.local.get(["monkMinutes"],(minu) => {
//           let minutes = minu.monkMinutes;
//           btn.innerText = `Monk Mode: ON ${minutes} minutes`;
//           btn.style.backgroundColor = "#11bb1f";
//           startFocusTimer(minutes);
//         })
//         addSearchToggleButton();
//         monkMode();
//       } else {
//         btn.innerText = "Monk Mode: OFF";
//         btn.style.backgroundColor = "cyan";
//         removeSearchToggleButton();
//         disableMonkMode();
//       }
//     });
//   });
// }

// function addSearchToggleButton() {
//   if (document.getElementById("search-toggle")) return;

//   const btn = document.createElement("button");
//   btn.id = "search-toggle";
//   btn.innerText = "Hide Search Suggestions";

//   btn.style.position = "fixed";
//   btn.style.bottom = "80px";
//   btn.style.right = "20px";
//   btn.style.padding = "10px 10px";
//   btn.style.backgroundColor = "#3e90e9";
//   btn.style.color = "white";
//   btn.style.border = "none";
//   btn.style.borderRadius = "10px";
//   btn.style.cursor = "pointer";
//   btn.style.zIndex = "9999";

//   let suggestionsVisible = true;

//   btn.addEventListener("click", () => {
//     suggestionsVisible = !suggestionsVisible;
//     if (suggestionsVisible) {
//       showSuggestions();
//       btn.innerText = "Hide Search Suggestions";
//     } else {
//       hideSuggestions();
//       btn.innerText = "Show Search Suggestions";
//     }
//   });

//   document.body.appendChild(btn);
// }

// function removeSearchToggleButton() {
//   const btn = document.getElementById("search-toggle");
//   if (btn) btn.remove();
// }

// addToggleButton();

// function hideSuggestions() {
//   const suggestions = document.querySelector(".ytSearchboxComponentSuggestionsContainer");
//   if (suggestions) suggestions.style.filter = "blur(8px)";
// }

// function showSuggestions() {
//   const suggestions = document.querySelector(".ytSearchboxComponentSuggestionsContainer");
//   if (suggestions) {
//     suggestions.style.display = "block";
//     suggestions.style.filter = "none";
//   }
// }

// // window.addEventListener("beforeunload", () => {
// //   chrome.storage.local.remove("MonkModeEnabled");
// // })
// // monkMode();

// // Because YouTube loads dynamically
// const observer = new MutationObserver(addToggleButton);
// observer.observe(document.body, { childList: true, subtree: true });

let focusInterval;

/* ------------------ MONK MODE ------------------ */

function monkMode() {
  toggleElements("none");
  addSearchToggleButton();

  const btn = document.getElementById("monk-toggle");
  if (btn) btn.style.backgroundColor = "#11bb1f";
}

function disableMonkMode() {
  toggleElements("block");
  removeSearchToggleButton();

  const btn = document.getElementById("monk-toggle");

  btn.innerText = "Monk Mode: OFF";
  btn.disabled = false;
  btn.style.backgroundColor = "cyan";
  btn.style.cursor = "pointer";

  const timer = document.getElementById("monk-timer");
  if (timer) timer.remove();
}

/* ------------------ HIDE / SHOW YOUTUBE PARTS ------------------ */

function toggleElements(display) {

  const elements = [
    "ytd-rich-grid-renderer",
    "ytd-watch-next-secondary-results-renderer",
    "#comments"
  ];

  elements.forEach(selector => {
    const el = document.querySelector(selector);
    if (el) el.style.display = display;
  });

  const guide = document.getElementById("guide-button");
  if (guide) guide.style.display = display;

  const shorts = document.querySelectorAll("ytd-reel-shelf-renderer");
  shorts.forEach(el => el.style.display = display);
}

/* ------------------ TIMER ------------------ */

function startFocusTimer(minutes) {

  if (document.getElementById("monk-timer")) return;

  let remaining = minutes * 60;

  const timer = document.createElement("div");
  timer.id = "monk-timer";

  Object.assign(timer.style, {
    position: "fixed",
    top: "50px",
    right: "20px",
    padding: "12px 20px",
    background: "linear-gradient(45deg,#2dacbd,#3024dd)",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
    borderRadius: "10px",
    zIndex: "999999"
  });

  document.body.appendChild(timer);

  focusInterval = setInterval(() => {

    remaining--;

    const m = Math.floor(remaining / 60);
    const s = remaining % 60;

    timer.innerText = `${m}:${s < 10 ? "0" : ""}${s}`;

    if (remaining <= 0) {

      clearInterval(focusInterval);

      timer.innerText = "Focus Session Complete!";

      chrome.storage.local.set({ MonkModeEnabled: false });

      disableMonkMode();

      setTimeout(() => timer.remove(), 3000);
    }

  }, 1000);
}

/* ------------------ TOGGLE BUTTON ------------------ */

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
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    zIndex: "9999"
  });

  document.body.appendChild(btn);

  chrome.storage.local.get(["MonkModeEnabled"], res => {

    if (res.MonkModeEnabled) {
      monkMode();
      btn.innerText = "Monk Mode: ON";
      btn.disabled = true;
      btn.style.backgroundColor = "#777";
    }
  });

  btn.addEventListener("click", () => {

    chrome.storage.local.get(["MonkModeEnabled"], res => {

      const enabled = !(res.MonkModeEnabled || false);

      chrome.storage.local.set({ MonkModeEnabled: enabled });

      if (enabled) {

        showMonkDialog();
        monkMode();

      } else {

        disableMonkMode();
      }

    });

  });
}

/* ------------------ DIALOG ------------------ */

function showMonkDialog() {

  if (document.getElementById("monk-dialog-overlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "monk-dialog-overlay";

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "100000"
  });

  const box = document.createElement("div");

  Object.assign(box.style, {
    background: "#111",
    color: "white",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    width: "260px"
  });

  box.innerHTML = `
    <h3>Enter Focus Time</h3>
    <input id="monk-minutes" type="number" placeholder="Minutes" min="1"
      style="width:100%;padding:8px;margin:15px 0;border-radius:6px;border:none;">
    
    <button id="monk-start-btn"
      style="padding:8px 14px;border:none;border-radius:6px;background:#ff4e50;color:white;cursor:pointer;">
      Start
    </button>

    <button id="monk-cancel-btn"
      style="padding:8px 14px;border:none;border-radius:6px;background:#ffffff;color:red;cursor:pointer;margin-left:10px;">
      Cancel
    </button>
  `;

  overlay.appendChild(box);
  document.body.appendChild(overlay);

  const startBtn = document.getElementById("monk-start-btn");
  const cancelBtn = document.getElementById("monk-cancel-btn");

  startBtn.addEventListener("click", () => {

    const minutes = parseInt(document.getElementById("monk-minutes").value);

    if (!minutes || minutes <= 0) {
      alert("Enter valid minutes");
      return;
    }

    chrome.storage.local.set({ monkMinutes: minutes });

    startFocusTimer(minutes);

    const btn = document.getElementById("monk-toggle");
    btn.innerText = `Monk Mode: ON (${minutes} min)`;
    btn.disabled = true;
    btn.style.backgroundColor = "#777";
    btn.style.cursor = "not-allowed";

    overlay.remove();
  });

  cancelBtn.addEventListener("click", () => {
    chrome.storage.local.set({ MonkModeEnabled: false });
    overlay.remove();
    disableMonkMode();
  });

}

/* ------------------ SEARCH SUGGESTIONS ------------------ */

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
    zIndex: "9999"
  });

  let visible = true;

  btn.onclick = () => {

    const suggestions = document.querySelector(".ytSearchboxComponentSuggestionsContainer");

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

/* ------------------ INIT ------------------ */

addToggleButton();

const observer = new MutationObserver(addToggleButton);
observer.observe(document.body, { childList: true, subtree: true });