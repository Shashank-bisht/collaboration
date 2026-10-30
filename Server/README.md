FOR [FRONTEND] DEVELOPEMENT
Change proxy to http://localhost:9000 if you want to use local backend instead of production backend (https://writer.up.railway.app) in frontend/package.json.

    cd frontend
    Run `npm install` or `yarn` to install all dependencies.
    Run `npm start` or `yarn start` to start the development backend.

FOR [FRONTEND] PRODUCTION
No need to run frontend sepratly just run backend.

FOR [BACKEND] DEVELOPEMENT
Run `npm install` or `yarn` to install all dependencies.
Run `npm run dev` or `yarn dev` to start the development backend.

FOR [BACKEND] PRODUCTION
Change proxy to https://writer.up.railway.app (domain at which you host) in frontend/package.json.
`cd frontend`
Run `npm i; npm run build` or `yarn; yarn build` to build the production app.
Cut the `build` folder to `backend/public` folder.
`cd..; cd backend`
Run `npm install` or `yarn` to install all dependencies.
Run `npm start` or `yarn start` to start the production backend.

Now you do not need to run client application sepratly just run backend.

## GitHUB

Remove node_modules, .env from frontend and backend folder.
