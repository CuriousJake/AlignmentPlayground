Here’s a clean **README.md** you can drop into the repo (beginner-friendly + matches your Reel “learn by building” vibe).

```md
# Alignment Playground 🎯  
A tiny web app to learn **CSS alignment** by playing with **Flex**, **Grid**, **Text Align**, and **Position** — with live preview + copyable CSS.

Built for the “learn concepts by building small projects” reel series by **@curiousjake_**.

---

## ✨ What this app does

- ✅ Live preview (container + child)
- ✅ Switch modes:
  - **Flex**: `justify-content`, `align-items`, `flex-direction`
  - **Grid**: `place-items`
  - **Text**: `text-align` (left/center/right/justify)
  - **Position**: center / corners with `top/left + transform`
- ✅ Generates CSS for parent + child
- ✅ **Copy CSS** button
- ✅ Shareable URL (settings are stored in query params)
- ✅ Cleaner UI: **Gap** input automatically hides for **Text/Position** modes

---

## 🧠 Why this helps
Most people memorize “center a div” tricks.  
This app teaches the real idea:

- Flex: horizontal vs vertical alignment
- Grid: one-line centering
- Text-align: only affects inline/text (not block divs)
- Position: absolute positioning patterns

---

## 📁 Project Structure

```

alignment-playground/
├─ index.html
├─ styles.css
└─ app.js

````

---

## 🚀 Run locally (no install needed)

### Option 1: Just open the file
1. Download or clone the repo
2. Open `index.html` in your browser

> If your browser blocks some features, use a local server (Option 2).

### Option 2: Run with a simple local server
Using Python:

```bash
python -m http.server 5500
````

Then open:

```text
http://localhost:5500
```

---

## 🔗 Share a specific alignment

The app stores settings in the URL query string.

Example:

* Select Flex + Center/Center
* Copy the URL and share it
* Anyone opening it will see the same state

---

## ✅ Common presets you can try

### Flex: Perfect center

* `display: flex`
* `justify-content: center`
* `align-items: center`

### Grid: Perfect center

* `display: grid`
* `place-items: center`

### Position: Perfect center

* `position: relative` (parent)
* `position: absolute` (child)
* `top: 50%`, `left: 50%`, `transform: translate(-50%, -50%)`

---

## 🛠️ Customize it (easy ideas)

* Add a **Share Link** button
* Add more flex/grid options (e.g., `align-content`, `place-content`)
* Add multiple children preview
* Add “copy parent only” / “copy child only”

---

## 📸 Creator note

If you found this helpful, follow **@curiousjake_**
for more mini-projects that teach real dev concepts fast.

---

## 📄 License

MIT

```
