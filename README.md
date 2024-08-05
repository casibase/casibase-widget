# casibase-tracker

Tracking code for the chat widget of the Casibase AI knowledge base: https://casibase.org/

A real project that uses this tracking code can be found at Casbin website: https://casbin.org/

## Complete example

See source code at: https://github.com/casibase/casibase-tracker/blob/master/example.html

The demo of it is hosted at: https://tcdn.casibase.org/example

## Get Started

Put the following tracking code (HTML tag) into your main HTML file like index.html:

```js
<script>
  initCasibaseChat({
    endpoint: "https://ai.casbin.com",
  });
</script>
```

You can also load the chat widget after the full page load:

```js
<script>
  document.addEventListener("DOMContentLoaded", function () {
    initCasibaseChat({
        endpoint: "https://ai.casbin.com",
    });
  });
</script>
```

## Parameters

- `endpoint` (mandatory): The URL for Casibase
- `themeColor` (optional): The theme color of the widget (default: `rgb(64,59,121)`)
- `enableAnimations` (optional): Whether to enable animation effects when opening the chat window (default: `true`)

An example to use the parameters is:

```js
<script>
  document.addEventListener("DOMContentLoaded", function () {
    initCasibaseChat({
        endpoint: "https://ai.casbin.com",
        themeColor: "rgb(64,59,121)",
        enableAnimations: true,
    });
  });
</script>
```
