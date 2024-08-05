(function () {
  const defaultConfig = {
    themeColor: "rgb(87,52,211)",
    enableAnimations: true,
  };

  let userConfig = { ...defaultConfig };

  function parseColor(color) {
    if (color.startsWith('#')) {
      return hexToRgb(color);
    } else if (color.startsWith('rgb')) {
      return color.match(/\d+/g).map(Number);
    }
    throw new Error('Unsupported color format');
  }

  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : null;
  }

  function darkenColor(color, factor = 0.8) {
    const rgb = parseColor(color);
    return `rgb(${rgb.map(c => Math.max(0, Math.floor(c * factor))).join(',')})`;
  }

  function applyStyles() {
    const animationStyles = userConfig.enableAnimations
      ? `transition: all 0.3s ease;`
      : `transition: none;`;

    const styles = `
      .chat-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
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
        ${animationStyles}
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
        font-size: 30px;
        font-weight: 100px;
        line-height: 1;
      }
      .chat-button.open .close-icon {
        opacity: 1;
        transform: rotate(90deg) scale(1);
      }
      .chat-container {
        position: fixed;
        bottom: 80px;
        right: 20px;
        width: min(550px, calc(100vw - 40px));
        height: min(600px, calc(100vh - 100px));
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
      <span class="chat-text">Chat with AI</span>
      <span class="close-icon">X</span>
    `;
    return button;
  }

  function createChatContainer() {
    const container = document.createElement("div");
    container.className = "chat-container";

    if (userConfig.endpoint) {
      const iframe = document.createElement("iframe");
      iframe.src = userConfig.endpoint + "/?isRaw=1";
      iframe.title = "Chat with AI";
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

  function initChatWidget() {
    applyStyles();
    const chatButton = createChatButton();
    const chatContainer = createChatContainer();
    document.body.appendChild(chatButton);
    document.body.appendChild(chatContainer);

    chatButton.addEventListener("click", () =>
      toggleChat(chatButton, chatContainer)
    );
  }

  window.initCasibaseChat = function (config) {
    userConfig = { ...defaultConfig, ...config };
    userConfig.hoverColor = userConfig.hoverColor || darkenColor(userConfig.themeColor);

    if (!userConfig.endpoint) {
      console.warn("Casibase Chat: No endpoint provided. Chat functionality will be limited.");
    }

    if (document.readyState === "complete") {
      initChatWidget();
    } else {
      window.addEventListener("load", initChatWidget);
    }
  };
})();
