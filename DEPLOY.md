# React App Deploy (Render)

1. Push the code to GitHub
2. Go to Render.com > Create Static Site
3. Set:
   - Build Command: `npm run build`
   - Publish Directory: `build`
4. Add Environment Variable:
   - `REACT_APP_API_URL=https://your-backend.onrender.com`
5. Deploy!
