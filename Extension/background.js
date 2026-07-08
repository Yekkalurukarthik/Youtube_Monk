// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

//   if (message.action === "SAVE_TOKEN") {

//     chrome.storage.local.set(
//       { token: message.token },
//       () => {
//         console.log("Token saved successfully");
//       }
//     );

//   }

//   if (message.action === "openSignup") {
//     let token;
//     chrome.storage.local.get(["token"], (result) => {
//       token = result.token;
//       console.log(token);
//     });
//     console.log(token);
//     if (token) {
//       chrome.tabs.create({
//         url: "http://localhost:5173/dashboard"
//       });
//     } else {
//       chrome.tabs.create({
//         url: "http://localhost:5173/signup"
//       })
//     }

//   }

// });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if (message.action === "SAVE_TOKEN") {

    chrome.storage.local.set(
      { token: message.token },
      () => {
        console.log("TOKEN SAVED:", message.token);
      }
    );

  }

  if (message.action === "openSignup") {

    let token;
    chrome.storage.local.get(["token"], (result) => {
      token = result.token;
      console.log("TOKEN RETRIEVED:", token);
      if (token) {
        chrome.tabs.create({
          url: "http://localhost:5173/dashboard"
        });
      } else {
        chrome.tabs.create({
          url: "http://localhost:5173/signup"
        })
      }
    });

  }

});