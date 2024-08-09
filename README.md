# casibase-widget

![image](https://github.com/user-attachments/assets/e68510fe-107d-4718-983f-371b5f09e6e3)

![image](https://github.com/user-attachments/assets/682ca165-7941-4739-a5d4-a3bd36b6ce9a)

Tracking code for the chat widget of the Casibase AI knowledge base: https://casibase.org/

A real project that uses this tracking code can be found at Casbin website: https://casbin.org/

## Complete example

See source code at: https://github.com/casibase/casibase-widget/blob/master/example.html

The demo of it is hosted at: https://tcdn.casibase.org/example

## Get Started

Put the following tracking code (HTML tag) into your main HTML file like index.html. If you need the Javascript version, just remove the `<script>...</script>` tag from it.

```html
<script>
  (function (w, d, s, c, i) {
    var j = d.createElement(s);
    j.async = true;
    j.src = 'https://tcdn.casibase.org/casibase.js';
    j.onload = function () {
      w[c]('init', {
        endpoint: "https://ai.casbin.com",
      });
    };
    var f = d.getElementsByTagName(s)[0];
    f.parentNode.insertBefore(j, f);
    w[c] = w[c] || function () {
      (w[c].q = w[c].q || []).push(arguments);
    };
  })(window, document, "script", "casibaseChat");
</script>
```

## Parameters

- `endpoint` (mandatory): The URL for Casibase
- `themeColor` (optional): The theme color of the widget (default: `rgb(64,59,121)`)
- `enableAnimations` (optional): Whether to enable animation effects when opening the chat window (default: `true`)
- `popupWidth` (optional): The width of the chat window (default: "550px")
- `popupHeight`(optional): The height of the chat window (default: "600px")
- `buttonText` (optional): The text displayed on the chat button (default: "Chat with AI")
- `popupTitle` (optional): The title of the chat popup, used as the iframe title attribute (default: "Chat with AI")
- `popupTime` (optional): The time in seconds after which the chat window automatically opens. Set to -1 to disable auto-opening (default: -1)
- `buttonPosition` (optional): The position of the chat button. Possible values are "TopLeft", "MiddleLeft", "BottomLeft", "TopRight", "MiddleRight", "BottomRight" (default: "BottomRight")

An example to use the parameters is:

```html
<script>
  (function (w, d, s, c, i) {
    var j = d.createElement(s);
    j.async = true;
    j.src = 'https://tcdn.casibase.org/casibase.js';
    j.onload = function () {
      w[c]('init', {
        endpoint: "https://ai.casbin.com",
        themeColor: "rgb(64,59,121)",
        enableAnimations: true,
        popupWidth: "550px",
        popupHeight: "600px",
        buttonText: "Chat with AI",
        popupTitle: "Casibase AI Assistant",
        popupTime: 5,
        buttonPosition: "TopLeft"
      });
    };
    var f = d.getElementsByTagName(s)[0];
    f.parentNode.insertBefore(j, f);
    w[c] = w[c] || function () {
      (w[c].q = w[c].q || []).push(arguments);
    };
  })(window, document, "script", "casibaseChat");
</script>
```
