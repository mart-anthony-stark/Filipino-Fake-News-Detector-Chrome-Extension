const appname = "Filipino Fake News Detector";

const init = () => {
  // Main modal container
  const el = document.createElement("div");
  el.className = "ffn-ext-cont hidden";

  // Modal Close button
  const xbtn = document.createElement("span");
  xbtn.className = "ffn-ext-close";
  xbtn.innerHTML = "<span>X</span>";

  // Content div
  const header = document.createElement("div");
  header.className = "ffn-ext-header";
  header.innerHTML = `<img src='./images/48X48.png' /><h1>${appname}</h1>`;

  const content = document.createElement("div");
  content.className = "ffn-ext-content";

  // Append to modal and inject to dom
  el.appendChild(xbtn);
  el.appendChild(header);
  el.appendChild(content);
  document.body.appendChild(el);

  xbtn.addEventListener("click", () => {
    el.classList.add("hidden");
  });
};
init();

//lead_partner_search_content.js
chrome.runtime.onMessage.addListener(function (request, sender) {
  console.log(sender);
  console.log(request);
  console.log(request.selection);

  const modal = document.querySelector(".ffn-ext-cont");
  const contentDiv = modal.querySelector(".ffn-ext-content");

  modal.classList.remove("hidden");
  contentDiv.innerHTML = `<textarea class="ffn-ext-text" readonly>${request.selection}</textarea>`;
});
