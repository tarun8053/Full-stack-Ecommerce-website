# Fix Admin /admin 404 on Production (https://shop2hub.onrender.com/admin)

## Steps Completed:\n- [x] Created this TODO\n- [x] Fixed backend index.js static path\n- [x] Created frontend .env

## Remaining Steps:
1. Edit backend index.js: Fix clientBuildPath to point to correct frontend dist folder (`frontent/ecommerce-frontent/dist`)
2. Create `.env` in frontend: `VITE_BACKEND_API_URL=https://shop2hub.onrender.com/api`
3. Build frontend: `cd ecommerce_website/frontent/ecommerce-frontent && npm run build`
4. Commit changes: `git add . && git commit -m "fix: correct frontend static path for prod admin route" && git push`
5. Verify deployment on Render.com - access /admin after admin login
6. Test API calls from admin dashboard (orders)

**Note:** Frontend routes exist, prod SPA fallback will serve index.html for /admin → React Router handles it.

