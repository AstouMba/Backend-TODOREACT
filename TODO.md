# TODO: Fix Task Add/Edit Issues in Todo App

## Approved Plan
- [x] Fix usePaginator.jsx: Add /api prefix to fetchItems and addItem endpoints (/api/tasks). Add updateItem function for editing tasks.
- [x] Fix TaskFormModal.jsx: Use updateItem for editing instead of just refresh().
- [x] Fix Tasks.jsx: Add /api prefix to toggleTask and deleteTask endpoints.
- [x] Test: Run backend and frontend, verify tasks load, add/edit/delete work.

## Dependent Files
- front-todo-app/src/components/usePaginator.jsx (API endpoints and add updateItem)
- front-todo-app/src/components/TaskFormModal.jsx (integrate updateItem for edits)
- front-todo-app/src/components/Tasks.jsx (fix toggle/delete endpoints)

## Followup Steps
- [ ] Launch backend (npm run dev or node src/server.ts)
- [ ] Launch frontend (cd front-todo-app && npm run dev)
- [ ] Test: Login, add task, edit task, delete task, toggle status
- [ ] Check console for errors; ensure VITE_API_BASE_URL is set (e.g., http://localhost:3000)
- [ ] If DB empty, run seeder or check Prisma setup
