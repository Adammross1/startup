# CS 260 Notes

[My startup - Simon](https://mentalloadbearer.me/)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.235.144.190
There was a big roadblock initally with AWS needing to verify my account before I could register a domain using Route53, so I registered a domain with namecheap.com instead. There was helpful documentation to get that namecheap domain connected to my ec2 instance in AWS so that went very smoothly. 

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md). I know this is the default note but this was my experience. It was very nice to already have this set up and easily configurable. I'm not a huge fan of vim so I edited the Caddyfile using nano instead. Just personal preference.

## HTML

Key HTML concepts used in my startup:

**Semantic Elements** - Used `<aside>` for sidebar, `<section>` for grouped content, `<article>` for self-contained content. This makes the HTML more readable and accessible.

**Dialog Element** - `<dialog>` is perfect for modals. Much cleaner than divs with display:none. Use `method="dialog"` on forms inside dialogs.

**Form Structure** - `<fieldset>` and `<legend>` group related inputs. Makes forms more semantic and accessible.

**Accessibility** - Every `<input>` needs a `<label>`. Icon-only buttons need `aria-label`. The `required` attribute helps with validation.

## CSS

This was a pretty easy assignment for me because I am already very proficient in CSS and I work in SCSS usually so I'm all about organization, structure, and using proper specificity. I like having a variables css file which is what I made my styles.css file into. I also use tailwind sometimes but this project is so small that I thought it would be easy enough to make my own variables to use throughout the app kind of like my own tailwind.

## React Part 1: Routing

Setting up Vite with React was straightforward I just needed to make sure index.jsx was the entry point. The syntax changes like `class` to `className` were very straightforward. I created a Layout component using React Router's `<Outlet />` to conditionally show header/footer. That wasn't in the assignment instructions but something I was already familiar with. Login page renders standalone while Dashboard and About pages render inside the Layout. I had some issues with CSS bleeding between pages. The login page gradient was showing everywhere, so I ended up needing to put width: 100% on the root div just inside the body tag.

## React Part 2: Reactivity

I really enjoyed making my website come to life. The trickiest part was building all the logic for the different ways you can prioritize/sort tasks. This project has been in the back of my mind for a while and it's something I've given thought to long before starting this project, so I alreayd had a pretty good idea of the different options I wanted, but actually implementing the logic was a fun problem to solve. There's not too much that the app does so outside of the scheduling logic, everything else was pretty typical website UI and was easy to make reactive. I relied a lot on React's useState and useEffect hooks to keep everything in sync and make sure the UI updated automatically whenever the data changed. I also set up context providers for user, tasks, and settings to share state and logic across different parts of the app without having to pass props everywhere.

## Service

I converted the app into a proper web service using Node.js and Express. The backend runs on port 4000 and serves the built frontend as static files. I added a Vite proxy during development so `/api` calls route to the backend without CORS issues. For authentication I implemented register, login, and logout endpoints using bcrypt to hash passwords and UUID session tokens stored in httpOnly cookies. I also added protected endpoints for tasks and settings so user data lives on the server instead of in localStorage. A `requireAuth` middleware checks the session cookie and rejects unauthorized requests. The frontend now calls these service endpoints for all task and settings operations, and separately triggers Google OAuth on demand just for Google Calendar exports.