# Smart Weekly Scheduler

[My Notes](notes.md)

A personal scheduling app that automatically generates optimized weekly schedules based on your tasks, time constraints, and preferences. Lock in fixed commitments and let the app intelligently distribute remaining tasks across your week for maximum productivity.

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Ever feel overwhelmed trying to fit homework, chores, work, and personal time into your busy week? Smart Weekly Scheduler takes the stress out of planning. Simply add your tasks, lock in fixed commitments like classes or meetings, and let the app automatically generate an optimized schedule that respects your priorities and daily hour limits. With intelligent task distribution powered by AI-assisted time estimates, you'll spend less time planning and more time doing. Whether you're a student juggling coursework or a professional balancing multiple responsibilities, Smart Weekly Scheduler helps you make the most of every hour.

### Design

![Login page](login.png)
![Dashboard](dashboard.png)
![Add task form](add-task.png)

The application consists of two main views. The **Login page** features a centered card with email and password fields against a soft lavender gradient background, with options to register for new users. The **Dashboard** displays a weekly calendar grid (Sunday–Saturday) with hourly time slots as the main content area. A left sidebar contains the "+ Add Task" button which expands to reveal a task form with fields for title, category (dropdown with options like Homework), and estimated hours. The header shows the current week's date range, a settings icon, and the logged-in user's email. A "Regenerate Schedule" button triggers the scheduling algorithm to optimize task placement across the week.

```mermaid
sequenceDiagram
    actor User
    participant Browser
    participant Server
    participant AI API
    participant Database
    
    User->>Browser: Add new task
    Browser->>Server: POST /api/tasks
    Server->>Database: Store task
    Server->>AI API: Get time estimate
    AI API-->>Server: Return estimate
    Server->>Server: Run scheduling algorithm
    Server-->>Browser: WebSocket: "Calculating..."
    Server-->>Browser: WebSocket: "Complete!"
    Browser->>User: Display updated schedule
```

### Key features

- Mark tasks as immutable (fixed time) or flexible for automatic scheduling
- Category-based priority system (homework, chores, work, personal) for intelligent task ordering
- Automatic distribution of flexible tasks around fixed commitments
- Set daily hour capacity limits to prevent overloading
- AI-powered time estimates and scheduling optimization suggestions
- Real-time schedule regeneration with live progress feedback

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Two main pages: Login/Register and Dashboard. Semantic structure with forms for task input (title, category, hours, fixed/flexible toggle) and a weekly schedule grid display.
- **CSS** - Responsive weekly calendar grid showing 7 days with time blocks. Color-coded task categories, clean styling with good whitespace and contrast, and simple animations for schedule updates.
- **React** - Components for LoginForm, WeeklyCalendar, TaskList, TaskForm, and PreferencesPanel. React Router for Login → Dashboard navigation. State management for reactive schedule regeneration when tasks are added or modified.
- **Service** - Backend endpoints for task CRUD operations, schedule generation algorithm, user preferences, and authentication. Calls OpenAI/Anthropic API for intelligent task time estimates and schedule optimization suggestions.
- **DB/Login** - Store user credentials with hashed passwords, tasks (title, category, hours, immutable flag, time slot), and preferences (category priorities, daily limits). Secure authentication with registration, login, and logout functionality.
- **WebSocket** - Real-time feedback during schedule regeneration ("Calculating schedule..." → "Complete!"). Push notifications when schedule finishes regenerating after adding or editing tasks. Live progress indicator during optimization.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Server deployed and accessible with custom domain name** - [My server link](https://mentalloadbearer.me).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **HTML pages** - Three HTML pages: index.html (login), dashboard.html (main app), and about.html.
- [X] **Proper HTML element usage** - Used semantic elements like header, nav, aside, main, section, and dialog for modals.
- [X] **Links** - Navigation links between pages in nav.
- [X] **Text** - Task titles, descriptions, time labels, and user activity feed text content.
- [X] **3rd party API placeholder** - Google Calendar API placeholder in dashboard.js for syncing weekly events to Google calendar.
- [X] **Images** - Logo image (mlb-logo.jpg) displayed in the header navbar.
- [X] **Login placeholder** - Login form on index.html with email and password inputs.
- [X] **DB data placeholder** - Task list section shows dummy tasks that will come from database.
- [X] **WebSocket placeholder** - Live activity feed section shows real-time user activity placeholder.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Visually appealing colors and layout. No overflowing elements.** - Created a comprehensive design system with CSS variables for colors, spacing, typography, and shadows. Implemented gradient backgrounds, proper spacing throughout, and ensured no content overflow with responsive layouts.
- [X] **Use of a CSS framework** - Integrated Tailwind CSS utility classes throughout the application for rapid styling. Used Tailwind for form inputs, buttons, spacing utilities, flexbox layouts, and responsive design alongside custom CSS for specialized components.
- [X] **All visual elements styled using CSS** - Styled all elements including login page, dashboard header, sidebar, calendar grid, task items, modals, forms, buttons, and footer. Added hover states, focus indicators, and transitions throughout using both Tailwind utilities and custom CSS.
- [X] **Responsive to window resizing using flexbox and/or grid display** - Used Tailwind flexbox utilities and custom flexbox for layouts (header, sidebar, forms, button groups). Implemented media queries for tablet (< 1024px), mobile (< 768px), and small mobile (< 480px) breakpoints with adaptive layouts.
- [X] **Use of a imported font** - Imported Google Fonts "Inter" (weights 300-700) for clean, modern typography throughout the application.
- [X] **Use of different types of selectors including element, class, ID, and pseudo selectors** - Used element selectors (body, button, input), class selectors (.task-item, .button-group, Tailwind utilities), ID selectors (#login-card, #app-header), and pseudo selectors (:hover, :focus, :active, ::placeholder, ::backdrop, :nth-child).

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Bundled using Vite** - Yes I installed necessary packages and updated the scripts in package.json to make sure the app is bundled using vite.
- [X] **Components** - I made individual components for each page, and also individual components for the different modals in the dashboard page.
- [X] **Router** - I implemented react routing

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **All functionality implemented or mocked out** - Everything is reactive and functional. Now just needs auth, db, and web socket.
- [X] **Hooks** - I used useState and useEffect in many different parts of the app

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** - Created `service/index.js` running on port 4000.
- [x] **Static middleware for frontend** - Express serves the built frontend via `express.static('public')`.
- [x] **Calls to third party endpoints** - Frontend calls the Google Calendar API to export weekly schedule events.
- [x] **Backend service endpoints** - Backend provides REST endpoints for auth, tasks, and settings.
- [x] **Frontend calls service endpoints** - Frontend uses `fetch` to call all task and settings endpoints on the backend.
- [x] **Supports registration, login, logout, and restricted endpoint** - Implemented register, login, logout with bcrypt password hashing, UUID session tokens in httpOnly cookies, and a `requireAuth` middleware protecting task/settings routes.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
