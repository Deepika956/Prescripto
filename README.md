# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


The PRESCRIPTO is a full-stack web application designed to streamline the process of scheduling medical appointments for patients while enabling doctors and administrators to manage their availability efficiently. This system addresses the need for a centralized and user friendly platform where users can browse a list of doctors by specialty, view available time slots,and book appointments online with ease. Built using modern web technologies such as React.js for the frontend and Node.js with Express for the backend, the application integrates with MongoDB to store user data, doctor profiles, and appointment details securely.

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB


Project Structure

/admin                → Admin UI
/backend              → Node + Express backend
Doctor-Appointment... → Front-end

##To run use:
npm run dev for the front-end

npm server.js for the backend

for the admin page again run npm run dev
