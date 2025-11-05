# **Project Overview**

The goal of this project is to develop an app inspired by Visual Studio Code "Mr. Incredible in Your Code," which visually represents the state of code quality using dynamic graphics. Additionally, this extension will incorporate advanced automated code error correction functionality, enabling real-time identification and fixing of common coding errors to boost developer productivity and code quality.


## **Objectives**

* Create a fun and interactive UI element that reflects the number of errors/warnings present in the current editor buffer.
* Integrate real-time code diagnostics using VS Code's Diagnostic API.
* Implement automated code corrections and quick fixes using the VS Code Code Actions API.
* Provide users with the option to apply fixes automatically or review suggestions before applying.
* Support extensibility for multiple programming languages with scalable language analysis.
* Ensure high performance and seamless integration with VS Code workflows.


## **Scope & Deliverables**

* Error Visualization: Dynamic graphical indicators (e.g., characters/emojis) responding to code issues.
* Error Detection: Leverage VS Code Diagnostic API for real-time error monitoring.
* Auto-Fix Feature: Use Code Actions API to provide inline fix suggestions and enable one-click or automatic fixes.
* Multi-language Support: Initial support for JavaScript/TypeScript, expandable via Language Server Protocol.
* User Interface: Lightweight webview or editor decorations for visual feedback.
* Configuration Panel: Allow users to customize auto-fix behavior and visual elements.


## **Tech Stack**

* Languages: TypeScript, JavaScript
* Runtime: Node.js
* Libraries/APIs: VS Code Diagnostic API, Code Actions API, Language Server Protocol, ESLint (for JavaScript auto-fix)


## **Benefits**

* Increase developer productivity by reducing manual error fixing.
* Enhance code quality with instant error repair suggestions.
* Foster more engaging coding experience through visual feedback.
* Provide a scalable framework that can be extended to other languages and richer fixes.


## **How It Works?**

To test it, make sure the file testnew.js (containing the error where '==' should be '===') is present in your project folder.

1. Open the project in VS Code.

2. Press Ctrl + Shift + D and click Run and Debug.

3. A new window titled “Extension Development Host” will open.

4. In this new window, press Ctrl + P and open the file testnew.js.

5. Then press Ctrl + Shift + P and select “Show Mr. Incredible Panel”.

6. A user interface will appear — click the button “Apply all simple fixes.”

7. Once debugging and automatic correction are complete, a pop-up message will appear saying “Applied all simple fixes!”

Your code is now error-free and successfully auto-fixed! ✅
