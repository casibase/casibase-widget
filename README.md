# casibase-tracker
Tracking code for Casibase AI chat

## Casibase AI chat Introduction Guide
Casibase AI chat is an easy-to-integrate AI chat solution that can quickly add intelligent conversation capabilities to your website. Here are two ways to implement it:
### Method 1: Use CDN
Step 1: Include the `JavaScript` file, add the following code in the `<head>` tag of your HTML file:
```js
<script src="https://tcdn.casibase.org/casibase.js"></script>
```
### Method 2: Directly import the casibase.js file in the project
- Step 1: Download the `casibase.js` file. Place the file in an appropriate directory in your project, such as `/js/casibase.js` or `/assets/scripts/casibase.js`. 
- Step 2: Reference the local `casibase.js` file in HTML. Add the following code in the `<head>` tag of your HTML file:
```js
<script src="/path/to/your/casibase.js"></script>
```
❗️ Make sure to replace /path/to/your/ with the actual path to the casibase.js file in your project.

## Customize Casibase AI chat
You can choose one of the following two ways to customize Casibase AI chat:
### Method 1: Initialize after the page has fully loaded
```js
<script>
  document.addEventListener("DOMContentLoaded", function () {
    initCasibaseChat({
      themeColor: "#403B79",
      endpoint: "URL_ADDRESS",
      enableAnimations: true  // Set this parameter to false to disable animation effects
    });
  });
</script>
```
### Method 2: Immediate Initialization
```js
<script>
  initCasibaseChat({
    themeColor: "#403B79",  
    endpoint: "URL_ADDRESS",
    enableAnimations: true  // Set this parameter to false to disable animation effects
  });
</script>
```
**Parameter Description** 
- `themeColor`: The theme color of the chat button (default: "#403B79" or rgb(64, 59, 121)) 
- `endpoint`: The URL for the AI chat service (default: none, must be provided)
- `enableAnimations`: Whether to enable animation effects (default: true)

## Complete example
Here are two complete HTML examples illustrating the use of CDN and local files, respectively:
### Example of using CDN
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Casibase Chat Widget Example (CDN)</title>
    <script src="https://tcdn.casibase.org/casibase.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        initCasibaseChat({
          themeColor: "#ff5733",
          endpoint: "https://ai.casbin.com/?isRaw=1",
          enableAnimations: true
        });
      });
    </script>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>You should see a chat button in the bottom right corner of this page.</p>
  </body>
</html>
```

### Example of using local files
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Casibase Chat Widget Example (Local File)</title>
    <script src="/js/casibase.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        initCasibaseChat({
          themeColor: "#ff5733",
          endpoint: "https://ai.casbin.com/?isRaw=1",
          enableAnimations: true
        });
      });
    </script>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>You should see a chat button in the bottom right corner of this page.</p>
  </body>
</html>
```

