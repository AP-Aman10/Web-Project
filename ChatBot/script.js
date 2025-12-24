// Replace with your OpenAI API key (only for local testing, DO NOT expose publicly online!)
const OPENAI_API_KEY = "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";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// Function to add message to chat
function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.textContent = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to send user input to OpenAI
async function sendMessage() {
    const prompt = userInput.value.trim();
    if (!prompt) return;

    addMessage(prompt, "user");
    userInput.value = "";

    addMessage("ChatBot is typing...", "bot");

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful friendly chatbot." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content.trim();

        // Remove typing message
        chatBox.querySelector(".message.bot:last-child").remove();
        addMessage(botMessage, "bot");

    } catch (err) {
        chatBox.querySelector(".message.bot:last-child").remove();
        addMessage("Error: " + err.message, "bot");
    }
}

// Event listeners
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
});
