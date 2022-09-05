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
  header.innerHTML = `<img src='https://github.com/mart-anthony-stark/Filipino-Fake-News-Detector-Chrome-Extension/blob/master/images/128X128.png?raw=true' />
                      <div class="ffn-ext-details">
                          <h1>${appname}</h1>
                          <span>Made By: Mart Anthony Salazar</span>
                      </div>

  `;

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
  const modal = document.querySelector(".ffn-ext-cont");
  const contentDiv = modal.querySelector(".ffn-ext-content");

  modal.classList.remove("hidden");
  contentDiv.innerHTML = `
  <textarea class="ffn-ext-text" readonly>${request.selection}</textarea>
  <div class='ffn-ext-spinner hidden'>
    <div class="lds-ripple"><div></div><div></div></div>
    <p>Predicting Text...</p> 
  </div>
  `;

  predictData(request.selection);
});

// Predict
async function predictData(text) {
  try {
    const spinner = document.querySelector(".ffn-ext-spinner");
    spinner.classList.remove("hidden");
    const contentDiv = document.querySelector(".ffn-ext-content");

    const res = await fetch(
      "https://app-ed68e554-e20c-4e7a-a33d-e736be04cf3b.cleverapps.io/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ news: text }),
      }
    );

    spinner.classList.add("hidden");

    if (res.status == 200) {
      const { data, fake_probability, real_probability, prediction_output } =
        await res.json();

      const resultsDiv = document.createElement("div");
      resultsDiv.className = "ffn-ext-result";
      resultsDiv.innerHTML = `
      <div class="ffn-ext-proba">
        <h4>Real: ${Math.floor(real_probability)}%</h4>
        <h4>Fake: ${Math.floor(fake_probability)}%</h4>
      </div>
      <div class="ffn-ext-output ${prediction_output}" >
        ${prediction_output.toUpperCase()} NEWS
      </div>
      `;

      contentDiv.appendChild(resultsDiv);
    }
  } catch (error) {
    if (error) {
      console.log({ error });
      return { error };
    }
  }
}
