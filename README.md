# Interactive Concept Map Generator

This is a web-based tool that allows you to visually create, connect, and manage interactive concept maps. You can add topics, connect related topics, upload images to extract text using OCR, and save/restore your concept maps easily.

## Features

- Add custom topics and assign colors to each node.
- Connect topics visually using edges.
- Extract topics automatically from image text (OCR powered by Tesseract.js).
- Save and load concept maps locally in your browser.
- Download your concept map as an image (`.png`).
- Delete nodes or edges interactively.
- Clean, responsive UI with modern styling.

## How to Use

1. **Open `index.html` in your browser.**
2. Enter a topic and select a color, then click **Add Topic**.
3. To connect two topics, select them (by clicking), then click **Connect Two Topics**.
4. Use **Extract Text from Image** to add topics via OCR from an image.
5. Save, load, or download your map using the corresponding buttons.
6. Double-click nodes to edit their labels.
7. Use **Delete Selected Node** to remove a topic.

## Technologies Used

- HTML, CSS, JavaScript
- [vis.js](https://visjs.org/) for interactive network visualization
- [Tesseract.js](https://tesseract.projectnaptha.com/) for OCR
- [html2canvas](https://html2canvas.hertzen.com/) for image export

## Project Structure

| File         | Purpose                                   |
|--------------|-------------------------------------------|
| `index.html` | Main HTML structure and UI                |
| `style.css`  | Modern, clean styling for the interface   |
| `script.js`  | Main logic and interactive functionality  |

## Getting Started

1. Clone/download the repository.
2. Place all files (`index.html`, `style.css`, `script.js`) in the same folder.
3. Open `index.html` in your web browser (no backend needed).
4. Start creating your concepts maps!

## License

This project is provided for learning and demonstration purposes.
