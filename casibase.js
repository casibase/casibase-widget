(function () {
  const defaultConfig = {
    themeColor: "rgb(87,52,211)",
    enableAnimations: true,
    popupWidth: "min(550px, calc(100vw - 40px))",
    popupHeight: "min(600px, calc(100vh - 100px))",
    buttonText: "Chat with AI",
    popupTitle: "Casibase AI Assistant",
    popupTime: -1,
    buttonPosition: "BottomRight",
    closeOnLeave: false
  };

  let userConfig = { ...defaultConfig };

  function parseColor(color) {
    if (color.startsWith("#")) {
      return hexToRgb(color);
    } else if (color.startsWith("rgb")) {
      return color.match(/\d+/g).map(Number);
    }
    throw new Error("Unsupported color format");
  }

  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  }

  function darkenColor(color, factor = 0.8) {
    const rgb = parseColor(color);
    return `rgb(${rgb.map((c) => Math.max(0, Math.floor(c * factor))).join(",")})`;
  }

  function applyStyles() {
    const animationStyles = userConfig.enableAnimations ? `transition: all 0.3s ease;` : `transition: none;`;

    const buttonPositionStyles = {
      TopLeft: "top: 20px; left: 20px;",
      MiddleLeft: "top: 50%; left: 20px; transform: translateY(-50%);",
      BottomLeft: "bottom: 20px; left: 20px;",
      TopRight: "top: 20px; right: 20px;",
      MiddleRight: "top: 50%; right: 20px; transform: translateY(-50%);",
      BottomRight: "bottom: 20px; right: 20px;"
    };

    const buttonPosition = buttonPositionStyles[userConfig.buttonPosition] || buttonPositionStyles.BottomRight;

    const styles = `
      .chat-button {
        position: fixed;
        ${buttonPosition}
        background-color: ${userConfig.themeColor} !important;
        color: white;
        border: none;
        border-radius: 50px;
        padding: 10px 20px;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 16px;
        ${animationStyles}
      }
      .chat-button:hover {
        background-color: ${userConfig.hoverColor} !important;
        box-shadow: 0 6px 100px rgba(0, 0, 0, 0.5);
      }
      .chat-button.open {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        padding: 0;
      }
      .chat-button.open .chat-icon,
      .chat-button.open .chat-text {
        opacity: 0;
        transform: scale(0);
      }
      .chat-button .chat-icon,
      .chat-button .chat-text {
        ${animationStyles}
      }
      .chat-button .close-icon {
        position: absolute;
        opacity: 0;
        transform: rotate(180deg) scale(1);
        ${animationStyles}
        width: 40px;
        height: 40px;
      }
      .chat-button.open .close-icon {
        opacity: 1;
        transform: rotate(0deg) scale(1);
      }
      .chat-container {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: ${userConfig.popupWidth};
        height: ${userConfig.popupHeight};
        border-radius: 10px;
        z-index: 1001;
        flex-direction: column;
        overflow: hidden;
        ${animationStyles}
        transform: translateY(30px);
        opacity: 0;
        box-shadow: -8px 0 8px -8px rgba(0, 0, 0, 0.2), 0 -8px 8px -8px rgba(0, 0, 0, 0.2), 0 8px 8px -8px rgba(0, 0, 0, 0.2);
        display: none;
      }
      .chat-container.open {
        transform: translateY(0);
        opacity: 1;
        display: flex;
      }
      .chat-iframe {
        width: 100%;
        height: 100%;
        border: none;
        margin-left: -2px;
      }
      .chat-message {
        padding: 20px;
        text-align: center;
        color: #fff;
        background-color: ${userConfig.themeColor};
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
      }
    `;

    let styleEl = document.getElementById("casibase-chat-styles");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "casibase-chat-styles";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = styles;
  }

  function createChatButton() {
    const button = document.createElement("button");
    button.className = "chat-button";
    button.innerHTML = `
      <svg class="chat-icon" style="margin-right: 5px;" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <g transform="scale(-1, 1) translate(-1024, 0)">
          <path d="M1002.7 448C1002.7 212.4 783 21.3 512 21.3S21.3 212.4 21.3 448c0 194.7 149.9 358.9 354.8 410.1-21.1 66.9-77.4 123.2-77.4 123.2s548.8-34.3 677.6-395c17.1-43.4 26.4-89.9 26.4-138.3z" fill="#ffffff"></path>
        </g>
      </svg>
      <span class="chat-text">${userConfig.buttonText}</span>
      <svg class="close-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M720.298667 768c-12.714667 0-23.850667-4.778667-33.408-14.293333L270.293333 337.066667c-19.072-19.114667-19.072-49.322667 0-66.816 19.114667-19.072 49.322667-19.072 66.816 0l416.597334 415.018666c19.072 19.072 19.072 49.28 0 66.773334-9.557333 11.136-22.272 15.914667-33.408 15.914666z" fill="#ffffff"></path>
        <path d="M303.701333 768c-12.714667 0-23.850667-4.778667-33.408-14.293333-19.072-19.114667-19.072-49.322667 0-66.816l415.018667-416.597334c19.072-19.072 49.28-19.072 66.773333 0 19.114667 19.114667 19.114667 49.322667 0 66.816l-414.976 416.597334a45.781333 45.781333 0 0 1-33.408 14.293333z" fill="#ffffff"></path>
      </svg>
    `;
    return button;
  }

  function createChatContainer() {
    const container = document.createElement("div");
    container.className = "chat-container";

    const containerPositions = {
      TopLeft: "top: 80px; left: 20px;",
      MiddleLeft: "top: 50%; left: 80px; transform: translateY(-50%);",
      BottomLeft: "bottom: 80px; left: 20px;",
      TopRight: "top: 80px; right: 20px;",
      MiddleRight: "top: 50%; right: 80px; transform: translateY(-50%);",
      BottomRight: "bottom: 80px; right: 20px;"
    };

    const containerPosition = containerPositions[userConfig.buttonPosition] || containerPositions.BottomRight;
    container.style.cssText = containerPosition;

    if (userConfig.endpoint) {
      const iframe = document.createElement("iframe");
      iframe.src = userConfig.endpoint + "/?isRaw=1";;
      iframe.title = userConfig.popupTitle;
      iframe.className = "chat-iframe";
      container.appendChild(iframe);
    } else {
      const message = document.createElement("div");
      message.className = "chat-message";
      message.textContent = "Please configure the endpoint to enable the chat feature.";
      container.appendChild(message);
    }

    return container;
  }

  function toggleChat(button, container) {
    const isOpen = container.classList.contains("open");
    if (isOpen) {
      container.classList.remove("open");
      button.classList.remove("open");
      setTimeout(() => {
        container.style.display = "none";
      }, 300);
    } else {
      container.style.display = "flex";
      requestAnimationFrame(() => {
        container.classList.add("open");
        button.classList.add("open");
      });
    }
  }

  function initChatWidget(config) {
    userConfig = { ...defaultConfig, ...config };
    userConfig.hoverColor = userConfig.hoverColor || darkenColor(userConfig.themeColor);

    if (!userConfig.endpoint) {
      console.warn("Casibase Widget error: No endpoint provided.");
    }

    applyStyles();
    const chatButton = createChatButton();
    const chatContainer = createChatContainer();
    document.body.appendChild(chatButton);
    document.body.appendChild(chatContainer);

    chatButton.addEventListener("click", () => toggleChat(chatButton, chatContainer));
    
    if (userConfig.popupTime >= 0) {
      setTimeout(() => {
        if (!chatContainer.classList.contains("open")) {
          toggleChat(chatButton, chatContainer);
        }
      }, userConfig.popupTime * 1000);
    }

    if (userConfig.closeOnLeave) {
      document.addEventListener("click", (event) => {
        if (chatContainer.classList.contains("open") &&
            !chatContainer.contains(event.target) &&
            !chatButton.contains(event.target)) {
          toggleChat(chatButton, chatContainer);
        }
      });
    }
  }

  window.casibaseChat = function() {
    const args = Array.from(arguments);
    const command = args[0];
    
    if (command === 'init') {
      const config = args[1] || {};
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => initChatWidget(config));
      } else {
        initChatWidget(config);
      }
    } else {
      console.warn(`Casibase Widget error: Unknown command: "${command}"`);
    }
  };

  window.casibaseChat.q = window.casibaseChat.q || [];

  const commands = window.casibaseChat.q;
  for (let i = 0; i < commands.length; i++) {
    window.casibaseChat.apply(null, commands[i]);
  }
})();
