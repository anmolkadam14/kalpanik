let selectedScripture = null;

function selectScripture(scripture) {
  selectedScripture = scripture;

  document.body.style.background =
    scripture === "shiva_purana" ? "#000" :
    scripture === "ramayana" ? "#1b3a2f" :
    "#1a237e";
}

function beginNarration() {
  const question = document.getElementById("question").value;

  if (!selectedScripture) {
    alert("Please select a scripture first");
    return;
  }

  fetch("http://127.0.0.1:5000/narrate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      scripture: selectedScripture,
      user_input: question
    })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("output").innerText = data.story;
    speak(data.story);
  })
  .catch(() => {
    document.getElementById("output").innerText =
      "Silence itself becomes guidance.";
  });
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 0.85;
  utter.pitch = 0.9;
  speechSynthesis.speak(utter);
}
