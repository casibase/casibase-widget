(function () {
  const defaultConfig = {
    themeColor: "#403B79",
    hoverColor: "#2E2A57",
    aiUrl: "https://ai.casbin.com/?isRaw=1",
    enableAnimations: true,
  };

  let userConfig = { ...defaultConfig };

  function applyStyles() {
    const animationStyles = userConfig.enableAnimations
      ? `
      transition: all 0.3s ease;
    `
      : `
      transition: none;
    `;

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
    const iframe = document.createElement("iframe");
    iframe.src = userConfig.aiUrl;
    iframe.title = "Chat with AI";
    iframe.className = "chat-iframe";
    container.appendChild(iframe);
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
    if (document.readyState === "complete") {
      initChatWidget();
    } else {
      window.addEventListener("load", initChatWidget);
    }
  };
})();
