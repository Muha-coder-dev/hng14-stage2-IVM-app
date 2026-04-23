# Invoice Management App

A clean, responsive, and interactive Invoice Management application built to securely create, track, and manage invoices.

[Github Link](https://github.com/Muha-coder-dev/hng14-stage2-IVM-app)

[Live Demo Link](https://muha-coder-dev.github.io/hng14-stage2-IVM-app/)

---

##  Overview
This is a full-featured invoice dashboard built with modern React technologies. The main goal was to handle complex global state management and strict form validation while ensuring a seamless user experience. I implemented a robust "Data Brain" using the Context API to keep the UI perfectly synced, alongside a pixel-perfect design that supports both light and dark modes.

##  Key Features
* **Complete CRUD Functionality:** Securely create, read, update, and delete invoices in real-time.
* **Global State Management:** Utilizes React's Context API to keep the dashboard and forms perfectly synced without prop drilling.
* **Smart Form Validation:** Real-time error handling that highlights empty fields and prevents incomplete data from saving.
* **Theme Toggling:** Built-in Dark/Light mode that seamlessly respects user preferences.
* **Responsive Layout:** Stacks perfectly to fit mobile screens and expands into a clean, multi-column layout on desktops.

##  Built With
* React.js (Hooks & Context API)
* Vite
* Tailwind CSS
* React Router DOM

---

##  Setup Instructions
To run this project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Muha-coder-dev/hng14-stage2-IVM-app.git](https://github.com/Muha-coder-dev/hng14-stage2-IVM-app.git)

2. **Navigate into the directory:**
   ```Bash
cd hng14-stage2-IVM-app

3. **Install the dependencies:**
  ```Bash
npm run install

4. **Start the local development server:**
```Bash
npm run dev

## Architecture Explanation
This project was built using **React (Vite)** for a fast, modern development environment. 
- **Styling:** Tailwind CSS was utilized for utility-first styling, enabling rapid UI development and a flawless responsive design without bloated CSS files.
- **State Management:** The React `Context API` was implemented as the global "brain" of the app, holding the invoice data and CRUD functions, making it instantly accessible to any component.
- **Routing:** `React Router DOM` (`HashRouter`) was used to handle navigation seamlessly on GitHub Pages.

##  Trade-offs
1. **Context API vs. Redux:** I chose the native Context API over third-party state managers like Redux. While Redux is powerful, Context API provided the exact global state management needed for this scale while keeping the bundle size light.
2. **Local State vs. Backend Database:** For the scope of this frontend challenge, data is managed via state. Building a full backend would provide real persistence but would violate the "React Only" constraint of the assignment.
3. **HashRouter vs. BrowserRouter:** I opted for `HashRouter` because GitHub Pages servers traditionally struggle with single-page application routing, often returning 404 errors on refresh.

##  Accessibility Notes
Accessibility was a core focus during development:
- **Semantic HTML:** Utilized proper `<section>`, `<nav>`, and `<main>` tags rather than relying solely on `<div>` elements.
- **Form Feedback:** Form validation provides immediate visual text cues next to the specific failing input fields.
- **Color Contrast:** The dark mode toggle was specifically engineered to ensure text remains highly legible against the dark background, meeting WCAG contrast standards.
