# 🚀 Never Lose Your Thoughts Again! 🚀

## Notes: The Powerful, Offline Note-Taking App 📝

**Tired of bulky native apps that drain your battery and require constant internet access?** Notes is here to revolutionise your note-taking experience. Inspired by Samsung Notes and its clean One UI design language, this web application offers a **seamless, lightweight, and completely offline** solution for capturing your ideas, thoughts, and to-dos.

**Why Choose Notes?**

*   **⚡️ Lightning-Fast & Offline-First:** Access your notes instantly, anywhere, anytime—even without an internet connection. Perfect for on-the-go note-taking.
*   **📱 Seamless Integration:** Effortlessly share text from other apps directly into Notes, streamlining your workflow.
*   **🌗 Beautiful Design with Dark Mode:** Enjoy a clean and intuitive interface with automatic dark mode based on your system preferences, inspired by Samsung's One UI.
*   **🔎 Powerful Search:** Quickly find the information you need with a robust search function that indexes all your notes.
*   **📦 Small Footprint:** Experience the power of a native app without the bloat. Notes is incredibly lightweight, saving valuable storage space on your device.
*   **✨ PWA (Progressive Web App):** Install Notes directly to your home screen for quick access, just like a native app.
*   **✍️ Markdown Support:** Format your notes with ease using Markdown syntax, adding structure and style to your writing.

**Ready to take control of your notes? Try it now!**

[Live Demo](https://notes-n.netlify.app)

---

### Built with Modern Technologies 🛠️

*   **Frontend:** Vue.js, Vue Router, Tailwind CSS, HTML, CSS, JavaScript
*   **Client-Side Storage:** Dexie.js (IndexedDB wrapper)
*   **Markdown Parsing:** Marked
*   **Tooling:** Vite, PNPM
*   **Testing:** Cypress (E2E and Component Testing), Vitest (Unit Testing), Vue Test Utils

---

### Key Features at a Glance ✨

*   **Offline Functionality:** Works seamlessly without an internet connection.
*   **PWA Installable:** Add Notes to your home screen for easy access.
*   **Share Integration:** Share text from other apps directly to Notes.
*   **System-Based Dark Mode:** Automatically adapts to your system's dark/light mode settings.
*   **Lightweight & Performant:** Designed for speed and minimal resource usage.
*   **Searchable Notes:** Easily find any note with the built-in search.
*   **Markdown Support:** Format your notes using Markdown.

---

### Screenshots 📸

<div style="display: flex; gap: 10px; justify-content: center;">
    <img width="200" alt="Light mode" src="https://user-images.githubusercontent.com/35426405/188124054-e980b2bc-0d88-46e3-b562-d9820a069f6d.png">
    <img width="200" alt="Dark mode" src="https://user-images.githubusercontent.com/35426405/188124536-27185bc5-1d98-4438-a536-ac093435001c.png">
    <img width="200" alt="Creation in dark mode" src="https://user-images.githubusercontent.com/35426405/188125587-38812da2-2e39-41bf-aa44-0065a04d2db8.png">
    <img width="200" alt="With one note" src="https://user-images.githubusercontent.com/35426405/188125801-441a8327-7868-4ade-8b69-b27cabc4815c.png">
</div>

---

### Development 🧑‍💻

This project uses [PNPM](https://pnpm.io) as a package manager.

1.  Clone this repository: `git clone <repository_url>`
2.  Install dependencies: `pnpm install`
3.  Start the development server: `pnpm run dev`
4.  Preview changes at: <http://localhost:5137>

#### Testing 🧪

This project uses both [Vitest](https://vitest.dev) (for unit tests) and [Cypress](https://cypress.io) (for E2E and component testing).

*   **Unit Tests (Vitest):** `pnpm run test:unit`
*   **E2E Tests (Cypress):** `pnpm run build && pnpm run test:e2e`

---

### Future Enhancements ✨

To truly make Notes the go-to note-taking app for any OS, we're focusing on these key enhancements:

*   **Cross-Device Sync (Backend Implementation):** Implementing a backend will enable seamless synchronisation of notes across all your devices, ensuring your notes are always available, no matter where you are. This will include:
    *   User accounts and authentication.
    *   Real-time or near real-time synchronisation.
    *   Conflict resolution for simultaneous edits.
*   **Enhanced Desktop Experience:** While Notes already functions as a PWA on desktops, we plan to improve the desktop experience with features like:
    *   Window resizing and management.
    *   Keyboard shortcuts for common actions.
    *   Improved drag-and-drop support.
    *   Potentially exploring desktop-specific features like system tray integration.
*   **Advanced Formatting Options:** Expanding beyond basic Markdown to include:
    *   Tables
    *   Code highlighting with syntax support for various languages
    *   Embedded images and other media
*   **Note Organisation:** Improve the organisation of notes by adding:
    *   Folders and subfolders
    *   Tags and labels
    *   Pinning important notes

---

### Contributions & Suggestions 🙏

Contributions are always welcome! If you have suggestions, bug reports, or would like to contribute code, please open an issue or submit a pull request.

Thank you for stopping by!
