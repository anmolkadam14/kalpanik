let selectedScripture = null;

function selectScripture(scripture) {
  selectedScripture = scripture;

  const theme = THEMES[scripture];
  if (!theme) return;

  document.body.style.background = theme.background;
  document.body.style.color = theme.text;
}

function beginNarration() {
  const question = document.getElementById("question").value;

  if (!selectedScripture) {
    alert("Please select a scripture first");
    return;
  }

  fetch("http://127.0.0.1:5000/narrate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      scripture: selectedScripture,
      user_input: question
    })
  })
    .then(res => res.json())
    .then(data => {
      const output = document.getElementById("output");

      // Reset animation
      output.classList.remove("show");
      output.innerText = data.story;

      // Small pause before showing text
      setTimeout(() => {
        output.classList.add("show");
      }, 200);

      // Small pause before voice starts
      setTimeout(() => {
        speak(data.story);
      }, 800);
    })
    .catch(() => {
      document.getElementById("output").innerText =
        "Silence itself becomes guidance.";
    });
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.8;
  utter.pitch = 0.85;
  utter.volume = 0.9;
  speechSynthesis.cancel(); // stop previous voice
  speechSynthesis.speak(utter);
}

