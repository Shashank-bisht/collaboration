_https://dillinger.io/_ (preview styled html)

# Note-Taking Web App Frontend Guide

This guide provides a concise overview of setting up the frontend for a note-taking web application. It covers the essential steps and considerations for developers looking to build a robust frontend.

## Setting Up the React Application

**1. Create a Frontend Directory**

Start by creating a new directory for project frontend.

```bash
mkdir frontend
```

**2. Initialize a React.js Project**

Navigate into the frontend directory and initialize a new React.js project.

```bash
cd frontend
npm install -g create-react-app
```

**3. Create `package.json` file**

Add scripts for development and production environments.

```json
{
  "name": "writer",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "@headlessui/react": "^1.7.15",
    "@imbios/next-pwa": "^1.1.1",
    "@paralleldrive/cuid2": "^2.2.1",
    "@radix-ui/react-alert-dialog": "^1.0.4",
    "@radix-ui/react-context-menu": "^2.1.4",
    "@radix-ui/react-dialog": "^1.0.4",
    "@radix-ui/react-dropdown-menu": "^2.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.6",
    "@radix-ui/react-select": "^1.2.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.4",
    "@radix-ui/react-tooltip": "^1.0.6",
    "@react-spring/web": "^9.7.3",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@tiptap/extension-bubble-menu": "^2.0.3",
    "@tiptap/extension-hard-break": "^2.0.3",
    "@tiptap/extension-heading": "^2.0.3",
    "@tiptap/extension-image": "^2.0.3",
    "@tiptap/extension-link": "^2.0.3",
    "@tiptap/extension-placeholder": "^2.0.3",
    "@tiptap/extension-underline": "^2.0.3",
    "@tiptap/pm": "^2.0.3",
    "@tiptap/react": "^2.0.3",
    "@tiptap/starter-kit": "^2.0.3",
    "autoprefixer": "^10.4.14",
    "axios": "^1.5.0",
    "class-variance-authority": "^0.6.0",
    "clsx": "^1.2.1",
    "framer-motion": "^10.12.17",
    "hamburger-react": "^2.5.0",
    "html-to-text": "^9.0.5",
    "lucide-react": "^0.234.0",
    "next-zustand": "^1.0.1",
    "nextjs-toploader": "^1.4.2",
    "postcss": "^8.4.24",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.9.0",
    "react-responsive": "^9.0.2",
    "react-router-dom": "^6.16.0",
    "react-scripts": "^5.0.1",
    "slugify": "^1.6.6",
    "tailwind-merge": "^1.13.0",
    "tailwindcss": "^3.3.3",
    "tailwindcss-animate": "^1.0.5",
    "uuid": "^9.0.0",
    "web-vitals": "^2.1.4",
    "zustand": "^4.4.1"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.9"
  }
}
```

**4. Install Dependencies**

Install the necessary packages for your project.

```bash
npm install
```

**5. Environment Variables**

Create a `.env` file to store environment variables.

```python
REACT_APP_SERVER_API_BASE_URL=http://localhost:9000 #/
```

**6. Create Necessary Folders**

Organize your project by creating directories for public and src

```bash
mkdir public
mkdir src/api
mkdir src/components/archive
mkdir src/components/noteEditor/editor/menu
mkdir src/components/noteEditor/noteMenuLists/menu
mkdir src/components/sidebar/folderMenu
mkdir src/components/trash
mkdir src/components/ui
mkdir src/layouts
mkdir src/lib/note
mkdir src/pages/app
mkdir src/styles/css
mkdir src/styles/fonts
```

## Top Level Folders Files

**postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: '#181818',
        'acent-2': '#1C1C1C',
        foreground: '#FFFFFF',
        primary: {
          DEFAULT: '#312EB5',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
}
```

## `public` Files

In a typical React web application, `index.html` serves as the entry point for the application.

**./index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <!-- <link rel="icon" href="%PUBLIC_URL%/favicon.png" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Write notes and save them to your account. You can also share them with your friends. This is a simple note taking app. It is built using React, Redux, Node.js, Express.js, MySQL, and Tailwind."
    />
    <!-- <link rel="apple-touch-icon" href="%PUBLIC_URL%/favicon.png" /> -->

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700&subset=latin"
    />

    <title>Writer App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

## `src` Files

### `src/` Top Level

**./index.js**

```javascript
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import { AppProvider } from './api/useGlobalContext'

import Application from './application'
import Loading from './components/loader'

import './styles/css/globals.css'
import './styles/css/custom.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <Suspense fallback={<Loading />}>
        <Application />
      </Suspense>
    </AppProvider>
  </React.StrictMode>
)
```

**./application.js**

```javascript
import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'

const HomeLayout = lazy(() => import('./layouts/home'))
const AppLayout = lazy(() => import('./layouts/app'))

const Index = lazy(() => import('./pages/index'))
const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const Error = lazy(() => import('./pages/error'))

const App = lazy(() => import('./pages/app'))
const Folders = lazy(() => import('./pages/app/folders'))
const Bookmark = lazy(() => import('./pages/app/bookmark'))
const Shares = lazy(() => import('./pages/app/shares'))
const ReadShare = lazy(() => import('./pages/app/readShare'))
const Favorites = lazy(() => import('./pages/app/favorites'))
const Archive = lazy(() => import('./pages/app/archives'))
const Trash = lazy(() => import('./pages/app/trashs'))
const Redirect = lazy(() => import('./pages/app/redirect'))

// // Note: if you want to change '/api' to something else, you have to change it in server/index.js too for production
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <HomeLayout>
        <Outlet />
      </HomeLayout>
    ),
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '*',
        element: <Error />,
      },
    ],
  },
  {
    path: '/app',
    element: (
      <AppLayout>
        <Outlet />
      </AppLayout>
    ),
    children: [
      {
        path: '',
        element: <App />,
      },
      {
        path: 'folders/:folderId',
        element: <Folders />,
      },
      {
        path: 'bookmark',
        element: <Bookmark />,
      },
      {
        path: 'shared',
        element: <Shares />,
      },
      {
        path: 'share/:shareId',
        element: <ReadShare />,
      },
      {
        path: 'favorites',
        element: <Favorites />,
      },
      {
        path: 'archive',
        element: <Archive />,
      },
      {
        path: 'trash',
        element: <Trash />,
      },
      {
        path: '*',
        element: <Redirect />,
      },
    ],
  },
])

function Routes() {
  return <RouterProvider router={router} />
}

export default Routes
```

### `src/pages`

**./error.js**

```javascript
import React from 'react'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className='px-[20px] lg:px-0'>
      <section className='lg:mt-[128px] lg:w-[992px] lg:mx-auto w-full mt-[50px]'>
        <div className='flex flex-col gap-[30px] items-center'>
          <div className='lg:text-[60px] text-[49px] text-center leading-normal font-light'>
            <p>[ PAGE NOT FOUND ]</p>
            <Button>
              <Link to='/'>Go back home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Error
```

**./index.js**

```javascript
import React from 'react'
import { useNavigate } from 'react-router-dom'
import NPprogress from 'nprogress'
import { FiArrowRight, FiLock, FiRefreshCcw } from 'react-icons/fi'

import { Button } from '../components/ui/button'

const Index = () => {
  const Navigate = useNavigate()
  const handleToNextRoute = (route) => {
    NPprogress.start()
    setTimeout(() => {
      Navigate(route)
      NPprogress.done()
    }, 1000)
  }
  return (
    <>
      <div className='px-[20px] lg:px-0' id='product'>
        <section className='lg:mt-[128px] lg:w-[992px] lg:mx-auto w-full mt-[50px]'>
          <div className='flex flex-col gap-[30px] items-center'>
            <h2 className='lg:text-[40px] text-[32px] text-center leading-normal font-light'>
              Boost your productivity with our{' '}
              <span className='font-medium'>streamlined note-taking</span>{' '}
              solution
            </h2>
            <p className='lg:w-[556px] lg:text-lg text-sm text-center inactive-text'>
              Effortlessly access your notes from any device with our convenient
              cloud-based solution.
            </p>
            <Button
              className='h-[55px] py-[15px] px-[30px]'
              onClick={() => handleToNextRoute('/app')}
            >
              <div className='flex gap-[20px] items-center justify-center'>
                <p className='font-semibold text-center'>Try for free</p>
                <FiArrowRight className='h-[24px] w-[24px]' />
              </div>
            </Button>
          </div>
        </section>
        <section className='mt-[72px] relative'>
          <div className='absolute radial-blur-circle w-full border h-full' />
          <div className='relative w-full  bg-white/[3%] rounded-[18px] backdrop-blur-md lg:px-[30px] px-[15px] py-[20px]'>
            <div className='flex items-center lg:gap-0 gap-5'>
              <div className='flex gap-[5px]'>
                <div className='bg-[#FF007A] rounded-full w-[10px] h-[10px]'></div>
                <div className='bg-[#FFE600] rounded-full w-[10px] h-[10px]'></div>
                <div className='bg-[#05FF00] rounded-full w-[10px] h-[10px]'></div>
              </div>
              <div className='flex lg:mx-auto items-center justify-between bg-white/[5%] backdrop-blur-sm py-[10px] px-[15px] lg:w-[358px] w-full rounded-[6px]'>
                <div className='flex items-center gap-[10px]'>
                  <FiLock className='opacity-[40%]' />
                  <p className='text-[10px]'>{window.location.origin}/</p>
                </div>
                <FiRefreshCcw />
              </div>
            </div>
            <div className='relative h-full w-full mt-[13px]'>
              <img
                src={'/product.png'}
                alt='product'
                className='object-contain w-full !relative h-full'
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Index
```

**./login.js**

```javascript
import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NPprogress from 'nprogress'
import { FiLock, FiRefreshCcw } from 'react-icons/fi'

import { useGlobalContext } from '../api/useGlobalContext'

function Login() {
  const Navigate = useNavigate()
  const { login } = useContext(useGlobalContext)

  const [loginInputs, setLoginInputs] = useState({
    user: '',
    password: '',
  })
  const [loginMsg, setLoginMsg] = useState({ style: '', msg: '' })

  const handleLoginChange = (e) => {
    setLoginInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    NPprogress.start()

    try {
      const _ = await login(loginInputs)
      setLoginMsg({
        style: 'teal',
        msg: _?.msg,
      })

      setTimeout(() => {
        Navigate('/app')
        NPprogress.done()
      }, 1000)
    } catch (err) {
      setLoginMsg({ style: 'tomato', msg: err.response.data })

      setTimeout(() => {
        NPprogress.done()
      }, 1000)
    }
  }

  return (
    <div className='px-[20px] lg:px-0' id='login'>
      <section className='lg:mt-[128px] lg:w-[992px] lg:mx-auto w-full mt-[50px]'>
        <div className='flex flex-col gap-[30px] items-center'>
          <h2 className='lg:text-[40px] text-[32px] text-center leading-normal font-light'>
            Welcome Back! <span className='font-medium'>sign-in</span> now
          </h2>
          <p className='lg:w-[556px] lg:text-lg text-sm text-center inactive-text'>
            A simple, beautiful &amp; powerful notes app for everyone. Write and
            organize your notes, ideas, and plans.
            {/* Capture your thoughts wherever you are. Find it later. Share it with
            your friends. */}
          </p>
          <section className='lg:mt-[72px] mt-[36px] relative'>
            <div className='absolute radial-blur-circle w-full border h-full' />
            <div className='relative w-full  bg-white/[3%] rounded-[18px] backdrop-blur-md lg:px-[30px] px-[15px] py-[20px]'>
              <div className='flex items-center lg:gap-0 gap-5'>
                <div className='flex gap-[5px]'>
                  <div className='bg-[#FF007A] rounded-full w-[10px] h-[10px]'></div>
                  <div className='bg-[#FFE600] rounded-full w-[10px] h-[10px]'></div>
                  <div className='bg-[#05FF00] rounded-full w-[10px] h-[10px]'></div>
                  <div className='w-[10px] h-[10px]'></div>
                </div>
                <div className='flex lg:mx-auto items-center justify-between bg-white/[5%] backdrop-blur-sm py-[10px] px-[15px] lg:w-[358px] w-full rounded-[6px]'>
                  <div className='flex items-center gap-[10px]'>
                    <FiLock className='opacity-[40%]' />
                    <p className='text-[10px]'>
                      {window.location.href}
                      {/* https://writer-web.vercel.app/login */}
                    </p>
                  </div>
                  <FiRefreshCcw
                    className='cursor-pointer'
                    onClick={() => window.location.reload()}
                  />
                </div>
              </div>
              <div className='relative h-full w-full mt-[13px]'>
                <div className='relative mx-auto w-full max-w-md px-6 pt-10 pb-8 ring-gray-900/5 sm:rounded-xl sm:px-10'>
                  <div className='w-full'>
                    <div className='mt-5'>
                      <form>
                        <div className='relative mt-6'>
                          <input
                            type='text'
                            name='user'
                            id='user'
                            placeholder='Username or Email'
                            className='peer mt-1 w-full bg-transparent border-b-2 border-gray-600 px-0 py-1 placeholder:text-transparent focus:border-gray-300 focus:outline-none'
                            autoComplete='NA'
                            onChange={handleLoginChange}
                          />
                          <label
                            htmlFor='user'
                            className='pointer-events-none absolute top-0 bottom-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-300'
                          >
                            Username or Email
                          </label>
                        </div>
                        <div className='relative mt-8'>
                          <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            className='peer peer mt-1 w-full bg-transparent border-b-2 border-gray-600 px-0 py-1 placeholder:text-transparent focus:border-gray-300 focus:outline-none'
                            onChange={handleLoginChange}
                          />
                          <label
                            htmlFor='password'
                            className='pointer-events-none absolute top-0 bottom-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-300'
                          >
                            Password
                          </label>
                        </div>
                        <div className='my-6'>
                          <button
                            // type="submit"
                            className='w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none'
                            onClick={handleLoginSubmit}
                          >
                            Sign in
                          </button>
                        </div>
                        <p
                          className='text-center text-sm'
                          style={{ color: `${loginMsg.style}` }}
                        >
                          {loginMsg.msg}
                        </p>

                        <p className='text-center text-sm inactive-text'>
                          Don&#x27;t have an account yet?{' '}
                          <Link
                            to='/register'
                            className='text-gray-100 hover:underline focus:text-gray-800 focus:outline-none'
                          >
                            Sign up
                          </Link>
                          .
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}

export default Login
```

**./register.js**

```javascript
import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import NPprogress from 'nprogress'
import { FiLock, FiRefreshCcw } from 'react-icons/fi'
import { useGlobalContext } from '../api/useGlobalContext'

function Register() {
  const { register } = useContext(useGlobalContext)
  const [registerInputs, setRegisterInputs] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [registerMsg, setRegisterMsg] = useState({ style: '', msg: '' })
  const handleRegisterChange = (e) => {
    setRegisterInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const Navigate = useNavigate()

  const handleRegisterSubmit = async (e) => {
    NPprogress.start()
    e.preventDefault()

    try {
      const _ = await register(registerInputs)
      setRegisterMsg({
        style: 'teal',
        msg: _.data,
      })

      setTimeout(() => {
        NPprogress.done()
        Navigate('/login')
      }, 1000)
    } catch (err) {
      setRegisterMsg({ style: 'tomato', msg: err.response.data })
      setTimeout(() => {
        NPprogress.done()
      }, 1000)
    }
  }

  return (
    <div className='px-[20px] lg:px-0' id='login'>
      <section className='lg:mt-[128px] lg:w-[992px] lg:m-auto w-full mt-[50px]'>
        <div className='flex flex-col gap-[30px] items-center'>
          <h2 className='lg:text-[40px] text-[32px] text-center leading-normal font-light'>
            Get started by <span className='font-medium'>sign-up</span> now
          </h2>
          <p className='lg:w-[556px] lg:text-lg text-sm text-center inactive-text'>
            Effortlessly access your notes from any device with our convenient
            cloud-based solution.
          </p>
          <section className='lg:mt-[72px] mt-[36px] relative'>
            <div className='absolute radial-blur-circle w-full border h-full' />
            <div className='relative w-full  bg-white/[3%] rounded-[18px] backdrop-blur-md lg:px-[30px] px-[15px] py-[20px]'>
              <div className='flex items-center lg:gap-0 gap-5'>
                <div className='flex gap-[5px]'>
                  <div className='bg-[#FF007A] rounded-full w-[10px] h-[10px]'></div>
                  <div className='bg-[#FFE600] rounded-full w-[10px] h-[10px]'></div>
                  <div className='bg-[#05FF00] rounded-full w-[10px] h-[10px]'></div>
                  <div className='w-[10px] h-[10px]'></div>
                </div>
                <div className='flex lg:mx-auto items-center justify-between bg-white/[5%] backdrop-blur-sm py-[10px] px-[15px] lg:w-[358px] w-full rounded-[6px]'>
                  <div className='flex items-center gap-[10px]'>
                    <FiLock className='opacity-[40%]' />
                    <p className='text-[10px]'>
                      {window.location.href}
                      {/* https://writer-web.vercel.app/register */}
                    </p>
                  </div>
                  <FiRefreshCcw
                    className='cursor-pointer'
                    onClick={() => window.location.reload()}
                  />
                </div>
              </div>
              <div className='relative h-full w-full mt-[13px]'>
                <div className='relative mx-auto w-full max-w-md px-6 pt-10 pb-8 ring-gray-900/5 sm:rounded-xl sm:px-10'>
                  <div className='w-full'>
                    <div className='mt-5'>
                      <form>
                        <div className='relative mt-6'>
                          <input
                            type='text'
                            name='username'
                            id='username'
                            placeholder='Username'
                            className='peer mt-1 w-full bg-transparent border-b-2 border-gray-600 px-0 py-1 placeholder:text-transparent focus:border-gray-300 focus:outline-none'
                            autoComplete='NA'
                            onChange={handleRegisterChange}
                          />
                          <label
                            htmlFor='username'
                            className='pointer-events-none absolute top-0 bottom-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-300'
                          >
                            Username
                          </label>
                        </div>
                        <div className='relative mt-8'>
                          <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Email Address'
                            className='peer mt-1 w-full bg-transparent border-b-2 border-gray-600 px-0 py-1 placeholder:text-transparent focus:border-gray-300 focus:outline-none'
                            autoComplete='NA'
                            onChange={handleRegisterChange}
                          />
                          <label
                            htmlFor='email'
                            className='pointer-events-none absolute top-0 bottom-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-300'
                          >
                            Email Address
                          </label>
                        </div>
                        <div className='relative mt-8'>
                          <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Password'
                            className='peer peer mt-1 w-full bg-transparent border-b-2 border-gray-600 px-0 py-1 placeholder:text-transparent focus:border-gray-300 focus:outline-none'
                            onChange={handleRegisterChange}
                          />
                          <label
                            htmlFor='password'
                            className='pointer-events-none absolute top-0 bottom-0 left-0 origin-left -translate-y-1/2 transform text-sm opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-300'
                          >
                            Password
                          </label>
                        </div>
                        <div className='my-6'>
                          <button
                            // type='submit'
                            className='w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none'
                            onClick={handleRegisterSubmit}
                          >
                            Sign up
                          </button>
                        </div>
                        <p
                          className='text-center text-sm'
                          style={{ color: `${registerMsg.style}` }}
                        >
                          {registerMsg.msg}
                        </p>

                        <p className='text-center text-sm inactive-text'>
                          Already have an account?{' '}
                          <Link
                            to='/login'
                            className='text-gray-100 hover:underline focus:text-gray-800 focus:outline-none'
                          >
                            Sign in
                          </Link>
                          .
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <Button
            className='h-[55px] py-[15px] px-[30px]'
            onClick={() => handleToNextRoute('/app')}
          >
            <div className='flex gap-[20px] items-center justify-center'>
              <p className='font-semibold text-center'>Try for free</p>
              <FiArrowRight className='h-[24px] w-[24px]' />
            </div>
          </Button> */}
        </div>
      </section>
    </div>
  )
}

export default Register
```

**./app/archives.js**

```javascript
import React, { useEffect, useContext } from 'react'
import { FcSynchronize } from 'react-icons/fc'
import { useGlobalContext } from '../../api/useGlobalContext'
import ArchiveMenu from '../../components/archive/archiveMenu'
import NoteList from '../../components/noteList'

const Archives = () => {
  const {
    archive,
    note,
    setNote,
    isActiveNote,
    setIsActiveNote,
    setActiveBlock,
    activeBlock,
  } = useContext(useGlobalContext)

  useEffect(() => {
    setActiveBlock('archive')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NoteList
        icon={<FcSynchronize className='text-rose-400 mr-3 h-6 w-6' />}
        title='Archive'
        array={archive}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />
      {isActiveNote ? (
        <ArchiveMenu />
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>
            Select note to Unarchive
          </h2>
          <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
            Select a note from the list on the left for unarchive note.
          </p>
        </div>
      )}
    </>
  )
}

export default Archives
```

**./app/bookmark.js**

```javascript
import React, { useEffect, useContext } from 'react'
import NoteList from '../../components/noteList'
import { NoteEditor } from '../../components/noteEditor'
import { FiBookmark } from 'react-icons/fi'

import { useGlobalContext } from '../../api/useGlobalContext'

const Bookmarks = () => {
  const {
    bookmarks,
    note,
    setNote,
    isActiveNote,
    setIsActiveNote,
    activeBlock,
    setActiveBlock,
  } = useContext(useGlobalContext)

  useEffect(() => {
    setActiveBlock('bookmark')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NoteList
        icon={<FiBookmark className='text-pink-400 mr-3 h-6 w-6' />}
        title='Bookmark'
        array={bookmarks}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />

      {isActiveNote ? (
        <NoteEditor folder_id={note?.folder_id} />
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>Select note to view</h2>
          <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      )}
    </>
  )
}

export default Bookmarks
```

**./app/favorites.js**

```javascript
import React, { useEffect, useContext } from 'react'
import { NoteEditor } from '../../components/noteEditor'
import { AiFillStar } from 'react-icons/ai'
import NoteList from '../../components/noteList'

import { useGlobalContext } from '../../api/useGlobalContext'

const Favorites = () => {
  const {
    favorites,
    note,
    setNote,
    isActiveNote,
    setIsActiveNote,
    setActiveBlock,
    activeBlock,
  } = useContext(useGlobalContext)

  useEffect(() => {
    setActiveBlock('favorites')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NoteList
        icon={<AiFillStar className='mr-3 h-6 w-6 text-yellow-500' />}
        title='Favorites'
        array={favorites}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />
      {isActiveNote ? (
        <NoteEditor folder_id={note?.folder_id} />
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>Select note to view</h2>
          <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      )}
    </>
  )
}

export default Favorites
```

**./app/folders.js**

```javascript
import React, { useState, useEffect, useContext } from 'react'
import { AiFillFolderOpen } from 'react-icons/ai'
import { NoteEditor } from '../../components/noteEditor'
import NoteList from '../../components/noteList'
import { useGlobalContext } from '../../api/useGlobalContext'

import { useParams } from 'react-router-dom'

const Folders = () => {
  const { folderId } = useParams()
  const {
    folders,
    notes,
    isActiveNote,
    setIsActiveNote,
    note,
    setNote,
    activeBlock,
    setActiveBlock,
  } = useContext(useGlobalContext)
  const [title, setTitle] = useState('loading...')

  useEffect(() => {
    setActiveBlock('folder')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTitle(folders?.filter((obj) => obj.folder_id === folderId)[0]?.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders, activeBlock, folderId])

  // const addToRecent = useRecentStore((state) => state.addToRecents)
  const notesList = notes?.filter(
    (obj) => obj.folder_id === folderId && obj.deleted === 0
  )

  return (
    <>
      <NoteList
        icon={<AiFillFolderOpen className='mr-3 h-6 w-6 text-orange-300' />}
        title={title}
        array={notesList}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />
      {isActiveNote ? (
        <>
          <NoteEditor folder_id={folderId} />
        </>
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>Select note to view</h2>
          <p className='w-[460px] text-center font-normal text-white/[60%]'>
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      )}
    </>
  )
}

export default Folders
```

**./app/index.js**

```javascript
import React, { useContext } from 'react'
import NPprogress from 'nprogress'
import { FolderOpen } from 'lucide-react'
import { Button } from '../../components/ui/button'

import { useGlobalContext } from '../../api/useGlobalContext'

const App = () => {
  const { logout } = useContext(useGlobalContext)

  const handleLogoutSubmit = async (e) => {
    e.preventDefault()
    NPprogress.start()

    try {
      await logout()

      setTimeout(() => {
        NPprogress.done()
      }, 1000)
    } catch (err) {
      setTimeout(() => {
        NPprogress.done()
      }, 1000)
    }
  }
  return (
    <>
      <div className='px-4 text-center flex flex-col gap-[10px] items-center justify-center h-[calc(100vh-60px)] w-full lg:h-screen'>
        <FolderOpen className='h-[50px] w-[50px]' />
        <h2 className='font-semibold text-[28px]'>
          Select Folder to view note list
        </h2>
        <p className='lg:w-[460px] text-center font-normal text-white/[60%] text-sm lg:text-base'>
          Choose a folder from the menu on the left to view its notes, or create
          a new folder to add to your collection.
        </p>
        <span>or</span>
        <Button
          className='text-[16px] font-semibold'
          size={'lg'}
          variant={'secondary'}
          onClick={handleLogoutSubmit}
        >
          <span>Logout</span>
        </Button>
      </div>
    </>
  )
}

export default App
```

**./app/readShare.js**

```javascript
import { NoteEditor } from '../../components/noteEditor'
import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useToast } from '../../components/ui/use-toast'
import { useGlobalContext } from '../../api/useGlobalContext'
import { xGetShare } from '../../api/fetch'

function ReadShare() {
  const { note, setNote, setActiveBlock, isActiveNote, setIsActiveNote } =
    useContext(useGlobalContext)
  const { shareId } = useParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)

  const fetchNote = async () => {
    setTimeout(() => {
      xGetShare(shareId)
        .then((res) => {
          if (res.data.deleted === 1) {
            toast({
              title: "Note is in owner's trash",
              variant: 'danger',
            })
          } else {
            setNote(res.data)
            setIsActiveNote(true)
          }
          setLoading(false)
        })
        .catch((err) => {
          setLoading(false)
          toast({
            title: 'Note not found',
            variant: 'danger',
          })
        })
    }, 50)
  }

  useEffect(() => {
    setActiveBlock('readShare')
    setIsActiveNote(false)
    setNote({})

    setLoading(true)
    fetchNote()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shareId])

  return (
    <>
      {loading ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <div className='flex flex-col items-center gap-4'>
            <div className='flex items-center'>
              <h1 className='text-[22px]'>Loading...</h1>
            </div>
            <p className='lg:w-[600px]  px-2  text-[22px] text-center font-normal text-white/[60%]'>
              {/* Please wait while we load the note you are looking for ... */}
            </p>
          </div>
        </div>
      ) : isActiveNote ? (
        <NoteEditor folder_id={note?.folder_id} />
      ) : (
        <>
          <div className='flex items-center justify-center w-full h-screen'>
            <div className='flex flex-col items-center gap-4'>
              <div className='flex items-center'>
                <h1 className='font-semibold text-[92px]'>404</h1>
                <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
              </div>
              <p className='lg:w-[600px]  px-2  text-[20px] text-center font-normal text-white/[60%]'>
                We can't find the note you're looking for; it may have been
                moved to the trash or deleted. Please contact the note owner
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ReadShare
```

**./app/redirect.js**

```javascript
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Redirect() {
  const Navigate = useNavigate()
  setTimeout(() => {
    Navigate('/app') // window.location.href = '/app'
  }, 1000)

  return (
    <div className='app-page'>
      <div className='lg:w-[calc(100vw-300px)] lg:ml-auto'>
        <div className='lg:flex'>
          <div className='w-full'>
            <div className='flex justify-center items-center h-screen'>
              <div className='flex flex-col justify-center items-center'>
                <div className='text-3xl '>Redirecting...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Redirect
```

**./app/shares.js**

```javascript
import React, { useEffect, useContext } from 'react'
import { FiLink } from 'react-icons/fi'
import { NoteEditor } from '../../components/noteEditor'
import NoteList from '../../components/noteList'

import { useGlobalContext } from '../../api/useGlobalContext'

const Shares = () => {
  const {
    notes,
    archive,
    trash,
    note,
    setNote,
    shares,
    isActiveNote,
    setIsActiveNote,
    activeBlock,
    setActiveBlock,
  } = useContext(useGlobalContext)

  const [sharedNotes, setSharedNotes] = React.useState([])

  function assignValue() {
    const temp = []
    for (const share of shares) {
      const matchingNote = [...notes, ...archive, ...trash].find(
        (note) => note.note_id === share.note_id
      )
      if (matchingNote) {
        const sharedNote = { ...matchingNote, share_id: share.share_id }
        temp.push(sharedNote)
      }
    }

    setSharedNotes(temp)
  }

  useEffect(() => {
    assignValue()
    setActiveBlock('shared')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    assignValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shares, notes, archive, trash])

  return (
    <>
      <NoteList
        icon={<FiLink className='text-blue-400 mr-3 h-6 w-6' />}
        title='Shared'
        array={sharedNotes}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />
      {isActiveNote ? (
        <NoteEditor folder_id={note?.folder_id} />
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>Select note to view</h2>
          <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
            Choose a note from the list on the left to view its contents, or
            create a new note to add to your collection.
          </p>
        </div>
      )}
    </>
  )
}

export default Shares
```

**./app/trash.js**

```javascript
import React, { useEffect, useContext } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import NoteList from '../../components/noteList'
import TrashMenu from '../../components/trash/trashMenu'

import { useGlobalContext } from '../../api/useGlobalContext'

const Trashs = () => {
  const {
    trash,
    note,
    setNote,
    isActiveNote,
    setIsActiveNote,
    activeBlock,
    setActiveBlock,
  } = useContext(useGlobalContext)

  useEffect(() => {
    setActiveBlock('trash')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <NoteList
        icon={<AiFillDelete className='text-rose-400 mr-3 h-6 w-6' />}
        title='Trash'
        array={trash}
        note={note}
        setNote={setNote}
        isActiveNote={isActiveNote}
        setIsActiveNote={setIsActiveNote}
        activeBlock={activeBlock}
      />
      {isActiveNote ? (
        <TrashMenu />
      ) : (
        <div className='lg:flex hidden flex-col gap-[10px] items-center justify-center w-[calc(100vw-650px)]'>
          <img alt='icon' src={'/FileText.svg'} height={80} width={80} />
          <h2 className='font-semibold text-[28px]'>Select note to restore</h2>
          <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
            Select a note from the list on the left for restoring note.
          </p>
        </div>
      )}
    </>
  )
}

export default Trashs
```

### `src/api`

**./fetch.js**

```javascript
import axios from 'axios'

// .env file is used to store environment variables
console.log(process.env.REACT_APP_SERVER_API_BASE_URL) // http://localhost:9000;
console.log(process.env.SERVER_API_BASE_URL) // http://localhost:9000;

// Create a custom Axios instance with the base URL set to http://localhost:9000
// If you want same frontend server use '/' in base URL
const instance = axios.create({
  baseURL: 'http://localhost:9000',
  withCredentials: true, // Add withCredentials option to include cookies in cross-origin requests  (CORS)
})

/* -- NOTE: if you want to change '/api' to something else, you have to change it in server/index.js -- */

/* --------------------------------------------------------------- 
    IMAGES SECTION
   --------------------------------------------------------------- */

/* -- 
    NOTE: this is special-route that doesn't need '/api' prefix (b/z it will be difficult to update the img scr if we change the prefix like '/api' to something)
   -- */

export const xUploadImg = async (formData) => {
  const response = await instance.post('/img', formData)
  return response?.data
}

/* --------------------------------------------------------------- 
    NOTES SECTION
   --------------------------------------------------------------- */

export const xGetNotes = async (
  setNotes,
  setFavorites,
  setArchive,
  setTrash
) => {
  const response = await instance.get('/api/notes')

  // favorite: 0/1, archive: 0, deleted: 0
  setNotes(
    response.data?.filter((obj) => obj.archive === 0 && obj.deleted === 0)
  )

  // favorite: 1, archive: 0, deleted: 0
  setFavorites(
    response.data?.filter(
      (obj) => obj.favorite === 1 && obj.archive === 0 && obj.deleted === 0
    )
  )

  // favorite: 0/1, archive: 1, deleted: 0
  setArchive(
    response.data?.filter((obj) => obj.archive === 1 && obj.deleted === 0)
  )

  // favorite: 0/1, archive: 0/1, deleted: 1
  setTrash(response.data?.filter((obj) => obj.deleted === 1))

  // PRIORITIZE FOLDER: TRASH > ARCHIVE > (FAVORITE = NORMAL)
}

export const xAddNote = async (data) => {
  try {
    await instance.post('/api/notes', data)
  } catch (err) {
    alert('something went wrong (xAddNote)')
  }
}

export const xUpdateNote = async (noteId, data) => {
  await instance.put(`/api/notes/${noteId}`, data)
}

export const xDeleteNote = async (noteId) => {
  await instance.delete(`/api/notes/${noteId}`)
}

/* --------------------------------------------------------------------------
  BOOKMARK SECTION
  --------------------------------------------------------------------------  */

export const xGetBookmarks = async (setBookmarks) => {
  const response = await instance.get('/api/bookmarks')
  setBookmarks(response?.data)
}

export const xAddBookmark = async (data) => {
  await instance.post(`/api/bookmarks`, data)
}

export const xRemoveBookmark = async (bookmarkId) => {
  await instance.delete(`/api/bookmarks/${bookmarkId}`)
}

/* --------------------------------------------------------------------------
  SHARE SECTION
  --------------------------------------------------------------------------  */

export const xGetShare = async (shareId) => {
  const response = await instance.get(`/api/shares/${shareId}`)
  return response
}

export const xAddShare = async (data) => {
  await instance.post('/api/shares', data)
}

export const xDeleteShare = async (shareId) => {
  await instance.delete(`/api/shares/${shareId}`)
}

/* --------------------------------------------------------------------------
  FOLDERS SECTION
  --------------------------------------------------------------------------  */

export const xGetFolders = async (setFolders) => {
  const response = await instance.get(`/api/folders`)
  setFolders(response?.data)
}

export const xAddFolder = async (name) => {
  const response = await instance.post(`/api/folders`, { name })
  return response?.data
}

export const xUpdateFolder = async (folderId, name) => {
  const response = await instance.put(`/api/folders/${folderId}`, { name })
  return response?.data
}

export const xDeleteFolder = async (folderId) => {
  const response = await instance.delete(`/api/folders/${folderId}`)
  return response?.data
}

export const xGetShares = async (setShares) => {
  const response = await instance.get('/api/shares')
  setShares(response?.data)
}

/* --------------------------------------------------------------------------
  AUTH SECTION
  --------------------------------------------------------------------------  */

// no matter user manually insert user_id in localStorage, it will be verified only if access_token is valid
export const xVerify = async (setCurrentUserId) => {
  const response = await instance.post('/api/auth')
  const success = response?.data?.status === 200

  setCurrentUserId(success ? response?.data?.user_id : null)
  return success
}

export const xlogin = async (setCurrentUserId, inputs) => {
  const response = await instance.post('/api/auth/login', inputs)
  setCurrentUserId(response?.data ? response?.data.user_id : null)
  return response?.data
}

export const xLogout = async (setCurrentUserId) => {
  await instance.post('/api/auth/logout')
  setCurrentUserId(null)
}

export const xRegister = async (inputs) => {
  const response = await instance.post('/api/auth/register', inputs)
  return response?.data
}
```

**./useGlobalContext.js**

```javascript
import { createContext, useEffect, useState } from 'react'
import { xGetNotes } from './fetch'
import { xGetFolders, xGetShares, xGetBookmarks } from './fetch'
import { xVerify, xlogin, xLogout, xRegister } from './fetch'

export const useGlobalContext = createContext()

export const AppProvider = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  const [folders, setFolders] = useState([])

  // fetch single data and distribute into 4 state
  const [notes, setNotes] = useState([])
  const [favorites, setFavorites] = useState([])
  const [trash, setTrash] = useState([])
  const [archive, setArchive] = useState([])

  const [shares, setShares] = useState([])
  const [bookmarks, setBookmarks] = useState([])

  // Active
  const [activeBlock, setActiveBlock] = useState(null) // folders, favorites, trash, archive, shared, bookmark, readShare

  const [isActiveNote, setIsActiveNote] = useState(false)
  const [note, setNote] = useState({}) // contain note item

  // Note Editor
  const [onSave, setOnSave] = useState(false)
  const [isEditable, setIsEditable] = useState(false)

  // sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const getNotes = async () => {
    await xGetNotes(setNotes, setFavorites, setArchive, setTrash)
  }
  const getFolders = async () => {
    await xGetFolders(setFolders)
  }
  const getShares = async () => {
    await xGetShares(setShares)
  }
  const refreshChanger = async () => {
    getFolders()
    getNotes()
    getShares()
  }
  const getBookmarks = async () => {
    await xGetBookmarks(setBookmarks)
  }

  const verify = async () => {
    const success = await xVerify(setCurrentUserId)
    if (success) {
      refreshChanger()
      getBookmarks()
    }
  }
  const login = async (inputs) => {
    return await xlogin(setCurrentUserId, inputs)
  }
  const logout = async () => {
    await xLogout(setCurrentUserId)
  }
  const register = async (inputs) => {
    return await xRegister(inputs)
  }

  useEffect(() => {
    // not render multiple times with in a second
    let timer = null
    timer = setTimeout(() => {
      verify()
    }, 100)
    localStorage.setItem('user', JSON.stringify(currentUserId))

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId])

  useEffect(() => {
    setIsActiveNote(false)
    setNote({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBlock])

  return (
    <useGlobalContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,

        notes,
        setNotes,

        shares,
        setShares,

        bookmarks,
        setBookmarks,

        favorites,
        setFavorites,

        trash,
        setTrash,

        archive,
        setArchive,

        folders,
        setFolders,

        activeBlock,
        setActiveBlock,

        isActiveNote,
        setIsActiveNote,

        note,
        setNote,

        onSave,
        setOnSave,

        isEditable,
        setIsEditable,

        isSidebarOpen,
        setIsSidebarOpen,

        getNotes,
        getFolders,
        refreshChanger,
        getShares,
        getBookmarks,

        verify,
        login,
        register,
        logout,
      }}
    >
      {children}
    </useGlobalContext.Provider>
  )
}
```

### `src/components`

**./animate.js**

```javascript
import { AnimatePresence } from 'framer-motion'
import React from 'react'

// AnimatePresence is used to animate components when they are added or removed from the DOM.
export const Animate = ({ children }) => {
  return <AnimatePresence>{children}</AnimatePresence>
}
```

**./container.js**

```javascript
import React, { PropsWithChildren } from 'react'

function Container({ children, className }) {
  return <div className={`px-[30px] py-[30px] ${className}`}>{children}</div>
}

export default Container
```

**./loader.js**

```javascript
import { Loader2 } from 'lucide-react'

export default function InitialLoadingPage() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <Loader2 className='h-[40px] w-[40px] animate-spin' />
    </div>
  )
}
```

**./menuLists.js**

```javascript
import React, { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'

import { motion } from 'framer-motion'
import { useGlobalContext } from '../api/useGlobalContext'

const MenuLists = ({ children, title }) => {
  const isBigScreen = useMediaQuery({ minWidth: 1024 })
  const { activeBlock, isActiveNote } = useContext(useGlobalContext)

  if (!isBigScreen) {
    return (
      <>
        {activeBlock ? ( // important checkpoint for mobile
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0 }}
            exit={{ opacity: 0 }}
          >
            {!isActiveNote ? ( // important checkpoint for mobile
              <div className='overflow-y-auto lg:w-[350px] lg:h-screen h-[calc(100vh-60px)] bg-acent-2 px-5 pb-[23px]'>
                <div className='sticky top-0 h-24 flex items-center bg-acent-2 z-[10]'>
                  <div className='font-semibold max-w-full text-[22px]'>
                    {title}
                  </div>
                </div>
                {children}
              </div>
            ) : null}
          </motion.div>
        ) : null}
      </>
    )
  }

  return (
    <div className='overflow-y-auto w-[350px] h-screen bg-acent-2 px-5 pb-[23px]'>
      <div className='sticky top-0 h-24 flex items-center bg-acent-2'>
        <div className='font-semibold max-w-full text-[22px]'>{title}</div>
      </div>
      {children}
    </div>
  )
}

export default MenuLists
```

**./navbar.js**

```javascript
// Both desktop and mobile navbar are in this file

import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Divide } from 'hamburger-react'
import NPprogress from 'nprogress'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../lib/utils'

export const Navbar = () => {
  const Navigate = useNavigate()
  const [blur, setBlur] = React.useState(false)
  const [openNav, setOpenNav] = React.useState(false)

  const navMenus = [
    { label: 'Home', path: '' },
    { label: 'Product', path: '#product' },
    { label: 'Support', path: '#support' },
    { label: 'Contact Us', path: '#contact' },
  ]

  const handleToNextRoute = (route) => {
    NPprogress.start()
    setTimeout(() => {
      Navigate(route)
      NPprogress.done()
    }, 1000)
  }

  const navRef = React.useRef(null)
  const handleBlur = () => {
    if (window.pageYOffset > 60) return setBlur(true)
    return setBlur(false)
  }
  useEffect(() => {
    window.addEventListener('scroll', handleBlur)
    return () => {
      window.removeEventListener('scroll', handleBlur)
    }
  }, [])

  return (
    <>
      <div
        className='absolute w-full 
      h-full top-0 -z-50 select-none pointer-events-none'
      >
        <img
          alt='test'
          fetchpriority='high'
          decoding='async'
          data-nimg='fill'
          className='object-cover w-full'
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: '0',
            top: '0',
            right: '0',
            bottom: '0',
            color: 'transparent',
          }}
          src='/radial-blur-blue.svg'
        />
      </div>
      <div
        className={`lg:block sticky top-0 mt-[58px] w-[1140px] mx-auto z-50 py-[20px] hidden ${
          blur ? 'backdrop-blur-sm bg-background/30' : ''
        }`}
        ref={navRef}
      >
        <div className='flex justify-between items-center'>
          <div className='relative h-[38px] w-[100px]'>
            <img
              alt='test'
              src='/logo.svg'
              className='object-contain w-full cursor-pointer'
              onClick={() => handleToNextRoute('/')}
            />
          </div>
          <div className='flex gap-[50px]'>
            {navMenus.map((item, i) => (
              <NavItem href={item.path} label={item.label} key={i} />
            ))}
          </div>
          <div className='flex gap-[50px]'>
            <Button
              variant={'secondary'}
              size={'lg'}
              className='font-bold'
              onClick={() => handleToNextRoute('/app')}
            >
              Try now
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`lg:hidden block sticky top-0 w-full z-50 py-[15px] ${
          blur ? 'backdrop-blur-sm bg-background/30' : ''
        }`}
        ref={navRef}
      >
        <div className='flex justify-between items-center relative'>
          <div className='px-[20px] w-full'>
            <div className='absolute h-full flex items-center z-[999]'>
              <button onClick={() => setOpenNav((prevValue) => !prevValue)}>
                <Divide toggled={openNav} />
              </button>
            </div>
            <div className='flex items-center justify-center w-full relative z-[998]'>
              <img
                alt='test'
                width={100}
                height={38}
                src={'/logo.svg'}
                onClick={() => handleToNextRoute('/')}
              />
            </div>
          </div>
        </div>

        <AnimatePresence>
          {openNav && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute z-[99] inset-0'
              >
                <div className='bg-black/40 w-full h-screen'></div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: '-100%' }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: { type: 'spring', bounce: 0 },
                }}
                exit={{
                  x: '-100%',
                  transition: { delay: 0.1, type: 'spring', bounce: 0 },
                }}
                className='fixed z-[99] top-0 left-0 bg-zinc-900 overflow-hidden w-[80%]'
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.5 } }}
                  transition={{ type: 'spring', bounce: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className='h-screen mt-[70px] px-[20px]'>
                    <div className='flex flex-col gap-[20px]'>
                      {navMenus.map((item, i) => (
                        <NavItem
                          href={item.path}
                          label={item.label}
                          key={i}
                          className='text-2xl'
                        />
                      ))}
                    </div>
                    <div className='flex gap-[50px] mt-5'>
                      <Button
                        variant={'default'}
                        size={'lg'}
                        className='font-bold w-full text-md'
                        onClick={() => handleToNextRoute('/app')}
                      >
                        Try now
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

const NavItem = ({ href, label, className, ...props }) => {
  href = href.toLowerCase()
  const hash = window.location.hash.toLowerCase()

  const condition = window.location.pathname === '/' ? href === hash : false
  return (
    <>
      <Link
        to={'/' + href}
        className={cn(
          `${
            condition ? 'text-white font-medium' : 'inactive-text font-normal'
          } hover:text-white transition-all`,
          className
        )}
        {...props}
      >
        {label}
      </Link>
    </>
  )
}
```

**./noteList.js**

```javascript
import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { FiInfo } from 'react-icons/fi'
import { dateToString, toPlainText } from '../lib/utils'
import { Card, CardContent } from './ui/card'
import MenuLists from './menuLists'

function NoteList({
  icon,
  title,
  array,
  note,
  setNote,
  isActiveNote,
  setIsActiveNote,
  activeBlock,
}) {
  return (
    <MenuLists
      title={
        // max-w-full
        <div className='flex items-center'>
          {icon}
          <p className='truncate'>{title}</p>
        </div>
      }
    >
      {array?.map((item, i) => (
        <Card
          className={`bg-white/[3%] border-none hover:bg-white/[7%] transition cursor-pointer mb-5 last-of-type:mb-0 ${
            isActiveNote && item.note_id === note?.note_id
              ? 'bg-white/[7%] text-white'
              : 'text-white/[40%]'
          }`}
          key={i}
          onClick={() => {
            setIsActiveNote(true)
            setNote(item)
          }}
        >
          <CardContent className='p-[20px]'>
            <h2 className='line-clamp-2 text-[18px] font-semibold leading-7'>
              {item.name}{' '}
              {activeBlock === 'shared' &&
              (item.deleted === 1 || item.archive === 1) ? (
                <span className='ms-1 px-2 bg-pink-700 hover:bg-pink-800 text-white rounded-full'>
                  {item.deleted === 1 ? 'trash' : 'archive'}
                </span>
              ) : null}
            </h2>
            <div className='flex inactive-text mt-[10px] items-center max-w-full'>
              {activeBlock === 'folder' ? (
                item.favorite === 1 ? (
                  <AiFillStar className='text-yellow-500 text-sm mr-1' />
                ) : (
                  <AiOutlineStar className='text-white text-sm mr-1' />
                )
              ) : null}
              <p className='font-normal mr-[10px]'>
                {dateToString({ values: item.created_date })}
              </p>
              <p className='truncate font-normal flex-1'>
                {toPlainText({ value: item.content, type: 'html' })}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}

      {array?.length === 0 ? (
        <div className='h-[70vh] flex items-center justify-center flex-col gap-2'>
          <FiInfo className='text-[24px] inactive-text' />
          <p className='inactive-text text-[20px]'>
            {(title || 'Folder') + ' is empty'}
          </p>
        </div>
      ) : null}
    </MenuLists>
  )
}

export default NoteList
```

**./archive/archiveMenu.js**

```javascript
import React, { useEffect, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { IoChevronBackOutline } from 'react-icons/io5'
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog'

import { Button } from '../ui/button'
import Dvider from '../ui/dvider'
import { useToast } from '../ui/use-toast'

import { useGlobalContext } from '../../api/useGlobalContext'
import { xUpdateNote } from '../../api/fetch'

function ArchiveMenu() {
  const isBigScreen = useMediaQuery({ minWidth: 1024 })

  const [loading, setLoading] = React.useState(false)
  const [method, setMethod] = React.useState('unarchive')
  const [open, setOpen] = React.useState(false)
  const { toast } = useToast()
  const {
    note,
    setNote,
    getNotes,
    isActiveNote,
    setIsActiveNote,
    setActiveBlock,
  } = useContext(useGlobalContext)

  useEffect(() => {
    setActiveBlock('archive')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleNote() {
    setLoading(true)
    try {
      if (method === 'unarchive') {
        await xUpdateNote(note?.note_id, {
          archive: 0,
        })
        toast({
          title: 'Note succesfully unarchive',
          variant: 'success',
        })
      }
      if (method === 'trash') {
        await xUpdateNote(note?.note_id, {
          deleted: 1,
        })
        toast({
          title: 'Note succesfully trash',
          variant: 'success',
        })
      }
      getNotes()
      setIsActiveNote(false)
      setNote({})
    } catch (err) {
      toast({
        title:
          method === 'unarchive' ? 'Failed to unarchive' : 'Failed to trash',
        description: 'Please try again later',
        variant: 'danger',
      })
    }
    setLoading(false)
    setMethod('unarchive')
    setOpen(false)
  }

  return (
    <>
      {isActiveNote && (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <h2 className='text-xl'>
                {method === 'unarchive' ? 'Unarchive' : 'Trash'} note !
              </h2>
              <Dvider />
              <p>
                Are you sure you want to{' '}
                <span className='font-semibold'>
                  {method === 'unarchive' ? 'unarchive' : 'trash'}
                </span>{' '}
                this note ?
              </p>

              <DialogFooter>
                <Button
                  className='m-1'
                  size={'sm'}
                  variant={'secondary'}
                  onClick={() => {
                    setMethod('unarchive')
                    setOpen(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className='m-1'
                  size={'sm'}
                  variant={method === 'unarchive' ? 'default' : 'destructive'}
                  onClick={() => handleNote()}
                  isLoading={loading}
                >
                  {method === 'unarchive' ? 'Yes, move it' : 'Yes, trash it'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className='px-2 flex flex-col gap-[10px] items-center justify-center h-[calc(100vh-60px)] w-auto lg:w-[calc(100vw-650px)] lg:h-screen'>
            <img
              alt='icon'
              priority
              src={'/history.svg'}
              height={80}
              width={80}
            />
            <h2 className='font-semibold text-[28px] text-center'>
              Unarchive "<span>{`${note.name}`}</span>"
            </h2>
            <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
              Don't want to lose this note? It's not too late! Just click the
              'Unarchive' button and it will be added back to your list. It's
              that simple.
            </p>

            <span className='mt-2'>
              <Button
                className='text-[16px] font-semibold'
                size={'lg'}
                onClick={() => {
                  setMethod('unarchive')
                  setOpen(true)
                }}
                isLoading={loading}
              >
                <span>Unarchive</span>
              </Button>
              <span className='m-2'></span>
              <Button
                className='text-[16px] font-semibold'
                size={'lg'}
                variant={'destructive'}
                onClick={() => {
                  setMethod('trash')
                  setOpen(true)
                }}
                isLoading={loading}
              >
                <span>Trash</span>
              </Button>
            </span>
          </div>
          {!isBigScreen ? (
            <div className='fixed bottom-0 left-0 translate-x-[10px] z-[10] -translate-y-[10px]'>
              <Button
                variant={'secondary'}
                onClick={() => {
                  setIsActiveNote(null)
                }}
                className='backdrop-blur-md'
              >
                <IoChevronBackOutline className='text-xl mr-2' />
                Go Back
              </Button>
            </div>
          ) : null}
        </>
      )}
    </>
  )
}

export default ArchiveMenu
```

**./noteEditor/index.js**

```javascript
import React, { useEffect, useState, useContext } from 'react'
import { Loader2 } from 'lucide-react'

import { LuCalendarDays } from 'react-icons/lu'
import { dateToString } from '../../lib/utils'
import Editable from '../ui/editable'
import useNoteEditor from './editor'
import EditorToolbar from './editor/editorToolbar'
import { EditorTipTap } from './editor/editorTipTap'
import BubbleEditor from './editor/bubbleEditor'
import { NoteMenuList } from './noteMenuLists'
import AddToFolder from './noteMenuLists/menus/addToFolder'
import { AiFillFolder } from 'react-icons/ai'
import { useMediaQuery } from 'react-responsive'
import { NoteEditorMobile } from './mobile'
import { useGlobalContext } from '../../api/useGlobalContext'

export const NoteEditor = ({ folder_id }) => {
  const {
    folders,
    activeBlock,
    setIsActiveNote,
    note,
    shares,
    setNote,
    getNotes,
    getBookmarks,
    onSave,
    isEditable,
  } = useContext(useGlobalContext)

  const [isEdit, setIsEdit] = useState(isEditable) // temp state only for title
  const [title, setTitle] = useState(note?.name || '')
  const [isError, setIsError] = useState(false)
  const isBigScreen = useMediaQuery({ minWidth: 1024 })

  const [isOpenDialog, setIsOpenDialog] = useState(false)

  let editor = useNoteEditor({ note: note, setNote: setNote })

  useEffect(() => {
    setTitle(note?.name)
    setIsError(false)
  }, [note])

  const folder = folders.find((f) => f.folder_id === note?.folder_id)

  if (!isBigScreen) return <NoteEditorMobile folder_id={folder_id} />

  return (
    <>
      <div
        className={
          // readShare is a special case, it doesn't have a list of notes on the left side so we need to make the editor full width to fill the screen
          (activeBlock === 'readShare' ? '' : 'lg:w-[calc(100vw-650px)] ') +
          'w-full px-[50px] lg:h-screen h-[calc(100vh-80px)] overflow-y-auto'
        }
      >
        <header className='sticky top-0 bg-background pt-[30px]'>
          <div className='flex justify-between items-center gap-5 mb-[20px] relative'>
            <Editable
              className={`text-[30px] text-white font-semibold w-full border-white/[5%] border-b  ${
                onSave && 'opacity-10 blur-sm'
              } ${isError && 'border-red-500 border-b'}`}
              value={title}
              maxLength={50}
              isEdit={isEditable && isEdit}
              setIsEdit={setIsEdit}
              isEditable={isEditable}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={async () => {
                note.name = title
                setIsEdit(false)
              }}
              readOnly={!isEditable}
            />
            {onSave && (
              <div className='absolute inset-0 flex justify-center'>
                <div className='flex items-center'>
                  <Loader2 className='animate-spin h-6 w-6 mr-2' />
                  <p>Saving note ....</p>
                </div>
              </div>
            )}
            <NoteMenuList
              data={note}
              getNotes={getNotes}
              getBookmarks={getBookmarks}
              setNote={setNote}
              shares={shares}
              activeBlock={activeBlock}
              setIsActiveNote={setIsActiveNote}
            />
          </div>

          <div className='flex flex-col gap-5 justify-center'>
            {!isEditable ? (
              <>
                <div className='flex gap-[10px] mb-5 items-center'>
                  <LuCalendarDays className='text-[20px]' />
                  <p className='font-semibold text-white/[60%] w-[100px] text-[14px]'>
                    Date
                  </p>
                  <p className='font-semibold text-white'>
                    {dateToString({ values: note?.created_date })}
                  </p>
                </div>
                {/* <Dvider /> */}
              </>
            ) : activeBlock === 'readShare' ||
              activeBlock === 'bookmark' ? null : (
              <div className='flex gap-[10px] mb-5  items-center'>
                <AiFillFolder className='text-[20px] text-orange-300' />
                <p className='font-semibold text-white/[60%] w-[100px] text-[14px]'>
                  Folder
                </p>
                <p
                  className='font-semibold text-white cursor-pointer hover:text-white text-[16px]'
                  onClick={() => {
                    setIsOpenDialog(true)
                  }}
                >
                  {folder?.name}
                </p>
              </div>
            )}
          </div>

          {activeBlock === 'readShare' || activeBlock === 'bookmark' ? null : (
            <EditorToolbar editor={editor} isEditable={isEditable} />
          )}
        </header>
        <BubbleEditor editor={editor} />
        <EditorTipTap editor={editor} />
      </div>

      <AddToFolder
        open={isOpenDialog}
        setOpen={setIsOpenDialog}
        method='move'
      />
    </>
  )
}
```

**./noteEditor/mobile.js**

```javascript
import React, { useEffect, useState, useContext } from 'react'
import { LuCalendarDays } from 'react-icons/lu'
import { AiFillFolder } from 'react-icons/ai'
import { dateToString } from '../../lib/utils'
import { Loader2 } from 'lucide-react'
import Editable from '../ui/editable'
import useNoteEditor from '../noteEditor/editor'
import { NoteMenuList } from '../noteEditor/noteMenuLists'
import EditorToolbar from '../noteEditor/editor/editorToolbar'
import BubbleEditor from '../noteEditor/editor/bubbleEditor'
import { EditorTipTap } from '../noteEditor/editor/editorTipTap'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { IoChevronBackOutline } from 'react-icons/io5'
import AddToFolder from './noteMenuLists/menus/addToFolder'

import { useGlobalContext } from '../../api/useGlobalContext'

export const NoteEditorMobile = ({ folder_id }) => {
  const {
    folders,
    isActiveNote,
    activeBlock,
    setIsActiveNote,
    getBookmarks,
    note,
    setNote,
    shares,
    isError,
    getNotes,
    onSave,
    isEditable,
  } = useContext(useGlobalContext)

  const [isEdit, setIsEdit] = useState(isEditable)
  const [title, setTitle] = useState(note?.name || '')
  const [isOpenDialog, setIsOpenDialog] = useState(false)

  let editor = useNoteEditor({ note: note, setNote: setNote })
  const folder = folders.find((f) => f.folder_id === note?.folder_id)

  useEffect(() => {
    if (note) {
      setTitle(note.name)
      editor?.commands.setContent(`${note.content}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note])

  return (
    <>
      {isActiveNote && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0 }}
            exit={{ opacity: 0 }}
            key={'note-lists'}
          >
            <div className='h-[calc(100vh-60px)] overflow-y-auto overflow-x-hidden w-full px-[20px]'>
              <header className='sticky top-0 bg-background pt-[20px]'>
                <div className='flex items-center gap-5 mb-[20px] relative'>
                  <Editable
                    className={`lg:text-[22px] text-lg text-white font-semibold w-full border-white/[5%] border-b  ${
                      onSave && 'opacity-10 blur-sm'
                    } ${isError && 'border-red-500 border-b'}`}
                    value={title}
                    maxLength={50}
                    isEdit={isEditable && isEdit}
                    setIsEdit={setIsEdit}
                    isEditable={isEditable}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={async () => {
                      note.name = title
                      setIsEdit(false)
                    }}
                    readOnly={!isEditable}
                  />
                  {onSave && (
                    <div className='absolute inset-0 flex justify-center'>
                      <div className='flex items-center'>
                        <Loader2 className='animate-spin h-6 w-6 mr-2' />
                        <p>Saving note ....</p>
                      </div>
                    </div>
                  )}
                  <NoteMenuList
                    data={note}
                    getNotes={getNotes}
                    getBookmarks={getBookmarks}
                    setNote={setNote}
                    shares={shares}
                    activeBlock={activeBlock}
                    setIsActiveNote={setIsActiveNote}
                  />
                </div>
                <div className='flex flex-col gap-5 justify-center'>
                  {!isEditable ? (
                    <>
                      <div className='flex gap-[10px] mb-5 items-center'>
                        <LuCalendarDays className='text-[20px]' />
                        <p className='font-semibold text-white/[60%] w-[100px] text-[14px]'>
                          Date
                        </p>
                        <p className='font-semibold text-white lg:text-base text-sm'>
                          {dateToString({ values: note?.created_date })}
                        </p>
                      </div>
                    </>
                  ) : activeBlock === 'readShare' ||
                    activeBlock === 'bookmark' ? null : (
                    <div className='flex gap-[10px] mb-5  items-center'>
                      <AiFillFolder className='text-[20px] text-orange-300' />
                      <p className='font-semibold text-white/[60%] w-[100px] text-[14px]'>
                        Folder
                      </p>
                      <p
                        className='font-semibold text-white cursor-pointer hover:text-white lg:text-base text-sm'
                        onClick={() => {
                          setIsOpenDialog(true)
                        }}
                      >
                        {folder?.name}
                      </p>
                    </div>
                  )}
                </div>

                {activeBlock === 'readShare' ||
                activeBlock === 'bookmark' ? null : (
                  <EditorToolbar editor={editor} isEditable={isEditable} />
                )}
              </header>
              <BubbleEditor editor={editor} />
              <EditorTipTap editor={editor} />
            </div>
          </motion.div>
          <div className='fixed bottom-0 left-0 translate-x-[10px] z-[10] -translate-y-[10px]'>
            <Button
              variant={'secondary'}
              onClick={() => {
                setIsActiveNote(null)
              }}
              className='backdrop-blur-md'
            >
              <IoChevronBackOutline className='text-xl mr-2' />
              Go Back
            </Button>
          </div>

          <AddToFolder
            open={isOpenDialog}
            setOpen={setIsOpenDialog}
            method='move'
          />
        </>
      )}
    </>
  )
}
```

**./noteEditor/editor/bubbleEditor.js**

```javascript
import { BubbleMenu } from '@tiptap/react'
import React from 'react'
import ToggleMenus from './menu/toggleMenus'
import LinkMenu from './menu/linkMenu'

function BubbleEditor({ editor }) {
  if (!editor) return null
  return (
    <div>
      <BubbleMenu
        editor={editor}
        className='bg-acent-2/75 backdrop-blur-sm flex gap-2 rounded-sm'
      >
        <ToggleMenus editor={editor} />
        <LinkMenu editor={editor} />
      </BubbleMenu>
    </div>
  )
}

export default BubbleEditor
```

**./noteEditor/editor/editor.css**

```css
.ProseMirror p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.ProseMirror p.is-empty::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
```

**./noteEditor/editor/editorTipTap.js**

```javascript
'use client'
import { EditorContent } from '@tiptap/react'
import './editor.css'

export const EditorTipTap = ({ editor }) => {
  if (!editor) return null
  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}
```

**./noteEditor/editor/editorToolbar.js**

```javascript
import React from 'react'
import Dvider from '../../ui/dvider'
import ParagraphMenu from './menu/paragraphMenu'
import ToggleMenus from './menu/toggleMenus'
import UploadMenu from './menu/uploadMenu'
import LinkMenu from './menu/linkMenu'
import LockMenus from './menu/lockMenu'

function EditorToolbar({ editor, isEditable }) {
  if (!editor) {
    return
  }
  return (
    <div className='flex flex-col gap-[10px] mb-[10px]'>
      {isEditable ? (
        <>
          <Dvider />
          <div className='flex justify-between lg:justify-space-between'>
            <div className='flex lg:gap-[30px] items-center justify-between lg:justify-start'>
              <ParagraphMenu editor={editor} />
              <ToggleMenus editor={editor} />
              <div className='flex gap-[5px] items-center'>
                <UploadMenu editor={editor} />
                <LinkMenu editor={editor} />
              </div>
            </div>
          </div>
        </>
      ) : null}
      <Dvider />
      <div className='flex-end gap-[5px] items-center'>
        <LockMenus editor={editor} />
      </div>
      <Dvider />
    </div>
  )
}

export default EditorToolbar
```

**./noteEditor/editor/index.js**

```javascript
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useState, useEffect, useContext } from 'react'
import { useGlobalContext } from '../../../api/useGlobalContext'

function useNoteEditor() {
  const { note, isEditable } = useContext(useGlobalContext)
  const [_content, setContent] = useState(note?.content || '')

  let editor = useEditor({
    content: _content,
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: 'paragraph',
          },
        },
        heading: {
          HTMLAttributes: {
            class: 'heading-text',
          },
        },
      }),
      Underline,
      Image.configure({
        HTMLAttributes: {
          class: 'image-editor',
        },
        allowBase64: true,
        inline: true,
      }),
      Placeholder.configure({
        emptyNodeClass: 'is-editor-empty',
        placeholder: 'Write here what you want.....',
        showOnlyCurrent: true,
      }),
      Link.configure({
        HTMLAttributes: {
          class: 'link-custom',
        },
        autolink: false,
        linkOnPaste: true,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'oultine-none min-h-[300px] mt-[30px] mb-[75px] px-2 border-none outline-none ring-0 prose prose-invert max-w-full',
        spellcheck: 'false',
      },
    },
    onUpdate: ({ editor }) => {
      // on every update, cursor set to end of the document, on delete one character, cursor set to end of the document. this is problamatic if we set content here
    },
    autofocus: true,
    editable: isEditable,
    injectCSS: false,
  })

  // update content when note changes
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(note?.content)
    }
    setContent(note?.content)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note])

  useEffect(() => {
    editor?.setEditable(isEditable)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable])

  return editor
}

export default useNoteEditor
```

**./noteEditor/editor/menu/linkMenu.js**

```javascript
import React, { useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/popover'
import { Button } from '../../../ui/button'
import { FiLink } from 'react-icons/fi'
import { Input } from '../../../ui/input'
import { Label } from '../../../ui/label'
import { useToast } from '../../../ui/use-toast'

function LinkMenu({ editor }) {
  const { toast } = useToast()
  const [url, seturl] = useState('')
  const inputRefUrl = useRef(null)
  const [isNotUrl, setIsNotUrl] = useState(false)
  if (!editor) return
  const isUrl = editor.isActive('link')

  const handleChangeWithValidation = (e) => {
    seturl(e.target.value)
    try {
      const newUrl = new URL(url)
      setIsNotUrl(false)
      return newUrl
    } catch (error) {
      return setIsNotUrl(true)
    }
  }
  const handleAddURL = () => {
    try {
      const newUrl = new URL(url)
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: `${newUrl}` })
        .run()
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'danger',
        description: 'invalid URL, url must start with https:// or http://',
      })
      setIsNotUrl(true)
    }
  }

  return (
    <>
      {isUrl && (
        <Button
          variant={'secondary'}
          size={'sm'}
          onClick={() => editor.commands.unsetLink()}
        >
          <FiLink className='text-[20px]' />
        </Button>
      )}
      {!isUrl && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'ghost'} className='p-[7px]' size={'sm'}>
              <FiLink className='text-[20px] text-white/[60%]' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='bg-background outline-none border border-white/[20%] w-[300px] text-white'>
            <div className='grid gap-2 mt-4'>
              <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='url'>URL :</Label>
                <div className='relative w-full col-span-2'>
                  <Input
                    id='url'
                    placeholder='http://example.com'
                    autoFocus={false}
                    className={`col-span-2 h-8 focus-visible:ring-0 border-white/[30%] autofill:bg-background focus-visible:bg-background`}
                    onChange={(e) => handleChangeWithValidation(e)}
                    ref={inputRefUrl}
                  />
                  <div
                    className={`absolute top-0 -translate-y-6 transition-opacity opacity-0 pointer-events-none ${
                      isNotUrl ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {isNotUrl && (
                      <p className='text-[14px] text-red-500'>Invalid URL</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Button
              className='w-full mt-5 capitalize'
              variant={'default'}
              size={'sm'}
              onClick={() => handleAddURL()}
            >
              save
            </Button>
          </PopoverContent>
        </Popover>
      )}
    </>
  )
}

export default LinkMenu
```

**./noteEditor/editor/menu/lockMenu.js**

```javascript
import React, { useContext } from 'react'
import { Button } from '../../../ui/button'
import { useToast } from '../../../ui/use-toast'
import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xUpdateNote } from '../../../../api/fetch'

function LockMenus({ editor }) {
  const { toast } = useToast()
  const { note, setNote, getNotes, setOnSave, isEditable, setIsEditable } =
    useContext(useGlobalContext)

  const onClickSave = async () => {
    if (isEditable === false) return

    setOnSave(true)
    try {
      await xUpdateNote(note?.note_id, {
        name: note?.name,
        content: editor.getHTML(),
      })
      setNote({
        ...note,
        content: editor.getHTML(),
      })
      getNotes()
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Save note failed. Please retry.',
        variant: 'danger',
      })
    }

    setOnSave(false)
  }

  return (
    <div className='flex gap-[6px] items-center'>
      <Button
        className='w-full capitalize bg-[#1e1e1e] text-white hover:bg-[#333] hover:text-white hover:shadow-none'
        variant={'default'}
        size={'sm'}
        onClick={() => setIsEditable(!isEditable)}
      >
        {isEditable ? (
          <>
            <img
              width='24'
              height='24'
              src='/flask-pink-600.png'
              alt='external-Flask-back-to-school-jumpicon-(solid-gradient)-jumpicon-solid-gradient-ayub-irawan'
            />
            &nbsp;&nbsp;Lock
          </>
        ) : (
          <>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              class='h-6 w-6 text-pink-600 -rotate-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
              />
            </svg>
            &nbsp;&nbsp;Unlock
          </>
        )}
      </Button>

      {isEditable && (
        <div
          className='relative inline-block cursor-pointer border-[0.125em] border-pink-500 px-[1em] py-[0.25em] rounded-[0.25em] text-3rem text-pink-500 hover:text-pink-600  hover:border-pink-600 hover:before:opacity-80'
          onClick={onClickSave}
        >
          Save
        </div>
      )}
    </div>
  )
}

export default LockMenus
```

**./noteEditor/editor/menu/paragraphMenu.js**

```javascript
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select'

function ParagraphMenu({ editor }) {
  const headingLevel = [
    {
      name: 'Paragraph',
      level: 0,
    },
    {
      name: 'Heading 1',
      level: 1,
    },
    {
      name: 'Heading 2',
      level: 2,
    },
    {
      name: 'Heading 3',
      level: 3,
    },
  ]
  const handleHeading = (value) => {
    setTimeout(() => {
      if (value === 0) {
        editor?.chain().focus().setParagraph().run()
        return
      }
      const levelValue = value
      editor?.chain().focus().toggleHeading({ level: levelValue }).run()
    }, 500)
  }

  const levelSelected = editor?.getAttributes('heading')

  return (
    <>
      <Select
        onValueChange={(value) => handleHeading(Number(value))}
        value={`${levelSelected.level ? levelSelected.level : 0}`}
      >
        <SelectTrigger className='w-[120px] focus:outline-none focus:ring-0 focus:ring-offset-0 border-none pr-0'>
          <SelectValue placeholder='Paragraph' />
        </SelectTrigger>
        <SelectContent className='bg-background border-none'>
          {headingLevel.map((item, i) => (
            <SelectItem
              value={`${item.level}`}
              className='capitalize focus:bg-white/[5%] focus:text-white text-white/[60%]'
              key={i}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default ParagraphMenu
```

**./noteEditor/editor/menu/toggleMenus.js**

```javascript
import React from 'react'
import { Button } from '../../../ui/button'
import { FiBold, FiItalic, FiUnderline } from 'react-icons/fi'

function ToggleMenus({ editor }) {
  const isBold = editor?.isActive('bold')
  const isItalic = editor?.isActive('italic')
  const isUnderline = editor?.isActive('underline')
  return (
    <div className='flex gap-[2px] items-center'>
      <Button
        variant={isBold ? 'secondary' : 'ghost'}
        size={'sm'}
        className='p-[7px]'
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <FiBold
          className={`lg:text-[20px] text-[18px] ${
            isBold ? 'text-white' : 'text-white/[70%]'
          }`}
        />
      </Button>
      <Button
        variant={isItalic ? 'secondary' : 'ghost'}
        size={'sm'}
        className='p-[7px]'
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <FiItalic
          className={`lg:text-[20px] text-[18px] ${
            isItalic ? 'text-white' : 'text-white/[70%]'
          }`}
        />
      </Button>
      <Button
        variant={isUnderline ? 'secondary' : 'ghost'}
        size={'sm'}
        className='p-[7px]'
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <FiUnderline
          className={`lg:text-[20px] text-[18px] ${
            isUnderline ? 'text-white' : 'text-white/[70%]'
          }`}
        />
      </Button>
    </div>
  )
}

export default ToggleMenus
```

**./noteEditor/editor/menu/uploadMenu.js**

```javascript
import React, { useRef, useState, useContext } from 'react'
import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../../../ui/dialog'
import { FiImage } from 'react-icons/fi'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { useToast } from '../../../ui/use-toast'
import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xUpdateNote, xUploadImg } from '../../../../api/fetch'

function UploadMenu({ editor }) {
  const { note, setNote, setOnSave } = useContext(useGlobalContext)

  const { toast } = useToast()
  const uploadRef = useRef(null)
  const [urlLink, setUrlLink] = useState('')
  let image = {
    source: null,
  }

  let [openDialog, setOpenDialog] = useState(false)

  if (!editor) return

  const upload = async () => {
    try {
      if (!image.source) return null
      const formData = new FormData()
      formData.append('file', image.source)
      return await xUploadImg(formData)
    } catch (err) {
      return null
    }
  }

  const addHttpIfNotExists = (urlLink) => {
    if (!/^https?:\/\//i.test(urlLink)) {
      return `https://${urlLink}`
    } else {
      return urlLink
    }
  }

  const handleUploadImages = async (e) => {
    e.preventDefault()
    const imgUrl = await upload()

    if (imgUrl || (urlLink !== '' && urlLink !== 'https://')) {
      editor
        ?.chain()
        .focus()
        .setImage({
          src: imgUrl ? `/img/${imgUrl}` : urlLink,
          alt: 'Image',
        })
        .run()

      Image.source = null

      // save note
      // it is very important to save note after image upload because image upload will change the content of the note and we can track change images change
      // what we mean: what happen if user upload 6 images one by one and remove 1 of them and save note. 6 image uploaded already when user selected. 5 images can be track in the note. but we can not know which image is removed or we can say we can't track removed img for deleting from backend storage. that's why we need to save note after image upload. on every save note we can track which image is removed and delete from backend storage.

      __saveNote()

      toast({
        title: 'Success',
        description: 'Image uploaded.',
        variant: 'success',
      })
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong.',
        variant: 'danger',
      })
    }

    setOpenDialog(!openDialog)
  }

  const __saveNote = async () => {
    setOnSave(true)
    try {
      await xUpdateNote(note?.note_id, {
        name: note?.name,
        content: editor.getHTML(),
      })
      setNote({
        ...note,
        content: editor.getHTML(),
      })
      // if (_?.status === 200) {
      //   getNotes()
      // }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Something went wrong on save.',
        variant: 'danger',
      })
    }
    setOnSave(false)
  }

  return (
    <>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <h2 className='text-2xl font-semibold'>Add Image!</h2>
            <Dvider />
          </DialogHeader>

          <p className='my-1'>
            <p className='mb-2'>Image url</p>
            <input
              className='w-full px-3 py-2 bg-[#1c1917] text-white border rounded-md border-[#a3a3a3] focus:outline focus:border-[#f472b6]'
              type='text'
              placeholder='https://example.com/image.png'
              value={urlLink}
              onChange={(e) => setUrlLink(addHttpIfNotExists(e.target.value))}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleUploadImages(e)
                }
              }}
            />
          </p>

          <p className='mt-1'>
            <span className='me-4'>Or, choose an Image</span>
            <input
              type='file'
              className='invisible absolute pointer-events-none'
              ref={uploadRef}
              onChange={(e) => {
                if (e.target.files) {
                  image.source = e.target.files[0]
                  handleUploadImages(e)
                }
              }}
            />
            <Button
              className='p-[7px] bg-gray text-white border rounded-md border-gray-700 focus:outline-none focus:border-[#f472b6]'
              size={'sm'}
              variant={'ghost'}
              onClick={() => {
                if (uploadRef.current) {
                  uploadRef.current.click()
                  toast({
                    title: 'Informaton',
                    description: `Large images can impact editor performance. Recommended size: 40KB or less.`,
                    variant: 'success',
                  })
                }
              }}
            >
              <span>Upload </span> &nbsp;
              <AiOutlineCloudUpload className='text-[20px]' />
            </Button>
          </p>

          <DialogFooter>
            <Button
              className='m-1'
              onClick={() => setOpenDialog(!openDialog)}
              size={'sm'}
              variant={'secondary'}
            >
              Cancel
            </Button>
            <Button
              className='m-1'
              onClick={(e) => {
                handleUploadImages(e)
              }}
              size={'sm'}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button
        className='p-[7px]'
        size={'sm'}
        variant={'ghost'}
        onClick={() => setOpenDialog(!openDialog)}
      >
        <FiImage className='lg:text-[20px] text-[18px] text-neutral-400' />
        {/* <span className='relative left-0 top-2 text-xs'>&lt; 40KB</span> */}
      </Button>
    </>
  )
}

export default UploadMenu
```

**./noteEditor/noteMenuLists/index.js**

```javascript
import React from 'react'
import { DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu'
import { SlOptions } from 'react-icons/sl'
import { LuLink2Off } from 'react-icons/lu'
import {
  FiArchive,
  FiStar,
  FiFolderPlus,
  FiBookmark,
  FiTrash,
  FiLink,
  FiCopy,
} from 'react-icons/fi'
import { TbBookmarkOff } from 'react-icons/tb'
import Dvider from '../../ui/dvider'
import {
  DropdownMenu,
  DropdownMenuContent,
} from '@radix-ui/react-dropdown-menu'
import { Transition } from '@headlessui/react'
import { useToast } from '../../ui/use-toast'
import { xUpdateNote, xAddBookmark, xRemoveBookmark } from '../../../api/fetch'

import AddToFolder from './menus/addToFolder'
import MoveToTrash from './menus/moveToTrash'
import MoveToArchive from './menus/moveToArchive'
import ShareLink from './menus/shareLink'

export const NoteMenuList = ({
  data,
  getNotes,
  getBookmarks,
  setNote,
  shares,
  activeBlock,
  setIsActiveNote,
}) => {
  const [open, setOpen] = React.useState(false)

  const [dialog, setDialog] = React.useState(null) // archive, trash
  const [isOpenDialog, setIsOpenDialog] = React.useState(false)

  const { toast } = useToast()

  const handleAddToFavorite = async () => {
    try {
      await xUpdateNote(data?.note_id, {
        favorite: 1,
      })
      getNotes()
      setNote({ ...data, favorite: 1 })
      toast({
        title: 'Add to favorite Successfully',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Failed to add',
        description: err.response.data,
        variant: 'danger',
      })
    }
  }

  const handleRemoveFavorite = async () => {
    try {
      await xUpdateNote(data?.note_id, {
        favorite: 0,
      })
      if (activeBlock !== 'folder') {
        setIsActiveNote(false)
      }
      getNotes()
      setNote({ ...data, favorite: 0 })
      toast({
        title: 'Remove from favorite Successfully',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Failed to remove',
        description: err.response.data,
        variant: 'danger',
      })
    }
  }

  const handleAddToBookmark = async () => {
    try {
      await xAddBookmark({ share_id: data?.share_id })

      getBookmarks()

      toast({
        title: 'Add to bookmark Successfully',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Failed to add',
        description: err.response.data,
        variant: 'danger',
      })
    }
  }

  const handleRemoveBookmark = async () => {
    try {
      await xRemoveBookmark(data?.bookmark_id)

      setIsActiveNote(false)
      getBookmarks()
      toast({
        title: 'Remove Successfully',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Failed to remove',
        description: 'err.response.data',
        variant: 'danger',
      })
    }
  }

  const share = shares?.find((item) => item.note_id === data?.note_id)

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className='focus-visible:ring-0 focus-visible:ring-offset-0 outline-none lg:p-[10px] p-[7px] border-[1px] border-white/[50%] rounded-full cursor-pointer'>
          <SlOptions />
        </DropdownMenuTrigger>
        <Transition
          show={open}
          enter='transition duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          className='absolute z-[1]'
        >
          <DropdownMenuContent className='bg-[#333333] p-[15px] translate-y-4 rounded-xl text-white min-w-[200px] absolute right-0 translate-x-5'>
            {activeBlock === 'readShare' || activeBlock === 'bookmark' ? (
              <div className='flex flex-col gap-[5px]'>
                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={() => {
                    setDialog('folder')
                    setIsOpenDialog(true)
                  }}
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      <FiFolderPlus />
                    </div>
                    <p className='truncate'>Add to Folder</p>
                  </div>
                </DropdownMenuItem>

                <CopyToClipboard
                  shareLink={`${window.location.origin}/app/share/${share?.share_id}`}
                />

                <Dvider />
                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={
                    activeBlock !== 'bookmark'
                      ? handleAddToBookmark
                      : handleRemoveBookmark
                  }
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      {activeBlock !== 'bookmark' ? (
                        <FiBookmark />
                      ) : (
                        <TbBookmarkOff />
                      )}
                    </div>
                    <p className='truncate'>
                      {activeBlock !== 'bookmark'
                        ? 'Add to bookmark'
                        : 'Remove bookmark'}
                    </p>
                  </div>
                </DropdownMenuItem>
              </div>
            ) : (
              <div className='flex flex-col gap-[5px]'>
                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={
                    data?.favorite === 1
                      ? () => handleRemoveFavorite()
                      : () => handleAddToFavorite()
                  }
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      <FiStar />
                    </div>
                    <p className='truncate'>
                      {data?.favorite === 1 ? 'Remove from' : 'Add to'} favorite
                    </p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={() => {
                    setDialog('archive')
                    setIsOpenDialog(true)
                  }}
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      <FiArchive />
                    </div>
                    <p className='truncate'>Move to archive</p>
                  </div>
                </DropdownMenuItem>

                <Dvider />
                {share?.note_id === data?.note_id ? (
                  <CopyToClipboard
                    shareLink={`${window.location.origin}/app/share/${share?.share_id}`}
                  />
                ) : null}

                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={() => {
                    setDialog('link')
                    setIsOpenDialog(true)
                  }}
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      {share?.note_id === data?.note_id ? (
                        <LuLink2Off />
                      ) : (
                        <FiLink />
                      )}
                    </div>
                    <p className='truncate'>
                      {share?.note_id === data?.note_id ? 'Remove' : 'Create'}{' '}
                      link
                    </p>
                  </div>
                </DropdownMenuItem>

                <Dvider />
                <DropdownMenuItem
                  className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
                  onClick={() => {
                    setDialog('trash')
                    setIsOpenDialog(true)
                  }}
                >
                  <div className='flex items-center gap-[15px]'>
                    <div className='text-[20px]'>
                      <FiTrash />
                    </div>
                    <p className='truncate'>Move to trash</p>
                  </div>
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </Transition>
      </DropdownMenu>

      {dialog === 'folder' ? (
        <AddToFolder
          open={isOpenDialog}
          setOpen={setIsOpenDialog}
          method='copy'
        />
      ) : dialog === 'archive' ? (
        <MoveToArchive open={isOpenDialog} setOpen={setIsOpenDialog} />
      ) : dialog === 'trash' ? (
        <MoveToTrash open={isOpenDialog} setOpen={setIsOpenDialog} />
      ) : dialog === 'link' ? (
        <ShareLink
          open={isOpenDialog}
          setOpen={setIsOpenDialog}
          data={data}
          share={share}
        />
      ) : null}
    </>
  )
}

export const CopyToClipboard = ({ shareLink }) => {
  const { toast } = useToast()
  return (
    <DropdownMenuItem
      className='focus:bg-white/[3%] focus:text-white text-white/[50%] cursor-pointer text-[16px]'
      onClick={() => {
        try {
          navigator.clipboard.writeText(shareLink)
          toast({
            title: 'Link copied to clipboard',
            variant: 'success',
          })
        } catch (err) {
          toast({
            title: 'Failed to copy',
            description: shareLink,
            variant: 'danger',
          })
        }
      }}
    >
      <div className='flex items-center gap-[15px]'>
        <div className='text-[20px]'>
          <FiCopy />
        </div>
        <p className='truncate'>Copy link</p>
      </div>
    </DropdownMenuItem>
  )
}
```

**./noteEditor/noteMenuLists/menu/addToFolder.js**

```javascript
import React, { useState, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../../../ui/dialog'
import { useToast } from '../../../ui/use-toast'
import { useNavigate } from 'react-router-dom'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select'

import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xAddNote, xUpdateNote } from '../../../../api/fetch'

function AddToFolder({ open, setOpen, method }) {
  const { note, setIsActiveNote, folders, getNotes } =
    useContext(useGlobalContext)

  const [loading, setLoading] = useState(false)
  const [selectFolderId, setSelectFolderId] = useState('')
  const { toast } = useToast()
  const Navigate = useNavigate()

  const handleAddToFolder = async () => {
    setLoading(true)
    try {
      if (selectFolderId !== '') {
        // copy note to folder
        await xAddNote({
          name: note?.name,
          content: note?.content,
          folder_id: selectFolderId,
        })

        toast({
          title: 'Successfully added to folder',
          variant: 'success',
        })
        getNotes()
        Navigate(`/app/folders/${selectFolderId}`)
      } else {
        toast({
          title: 'Select folder to add note to it',
          variant: 'danger',
        })
      }
    } catch (err) {
      toast({
        title: 'Something went wrong!',
        variant: 'danger',
      })
    }
    setLoading(false)
    setOpen(false)
  }

  const handleMoveToFolder = async () => {
    setLoading(true)
    try {
      if (selectFolderId !== '') {
        // move note to folder
        await xUpdateNote(note?.note_id, {
          folder_id: selectFolderId,
        })

        toast({
          title: `Successfully ${
            method === 'copy' ? 'added' : 'moved'
          }  to folder`,
          variant: 'success',
        })
        getNotes()
        setIsActiveNote(false)
        // Navigate(`/app/folders/${selectFolderId}`)
      } else {
        toast({
          title: `Select folder to ${
            method === 'copy' ? 'add' : 'move'
          } note to it`,
          variant: 'danger',
        })
      }
    } catch (err) {
      toast({
        title: 'Something went wrong!',
        variant: 'danger',
      })
    }
    setLoading(false)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h2 className='text-xl'>
          {method === 'copy' ? 'Add' : 'Move'} to folder
        </h2>
        <Dvider />
        <p>
          Select folder to {method === 'copy' ? 'add' : 'move'} this note to it
          <br />
          {!useMediaQuery({ minWidth: 1024 }) ? (
            <em className='text-sm text-gray-500'>
              Note: press and hold to select folder.
            </em>
          ) : null}
          <Select
            id='folder'
            onValueChange={(value) => setSelectFolderId(value)}
          >
            <SelectTrigger className='w-[130px] focus:outline-none focus:ring-0 focus:ring-offset-0 pr-0 border border-gray-400 rounded-md my-2'>
              <SelectValue placeholder='Select Folder' />
            </SelectTrigger>
            <SelectContent className='bg-background border-none'>
              {folders.map((item, i) => (
                <SelectItem
                  value={`${item.folder_id}`}
                  className='capitalize focus:bg-white/[5%] focus:text-white text-white/[60%]'
                  key={i}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </p>

        <DialogFooter>
          <Button
            className='m-1'
            size={'sm'}
            variant={'secondary'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className='m-1'
            size={'sm'}
            variant={'destructive'}
            onClick={() =>
              method === 'copy' ? handleAddToFolder() : handleMoveToFolder()
            }
            isLoading={loading}
          >
            {method === 'copy' ? 'Yes, add it' : 'Yes, move it'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddToFolder
```

**./noteEditor/noteMenuLists/menu/moveToArchive.js**

```javascript
import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../../../ui/dialog'
import { useToast } from '../../../ui/use-toast'
import React, { useState, useContext } from 'react'

import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xUpdateNote } from '../../../../api/fetch'

function MoveToArchive({ open, setOpen }) {
  const { setIsActiveNote, note, setNote, getNotes } =
    useContext(useGlobalContext)

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleArchiveNote = async () => {
    setLoading(true)
    try {
      await xUpdateNote(note?.note_id, {
        archive: 1,
      })
      toast({
        title: 'Move to archive successfully',
        variant: 'success',
      })
      getNotes()
      setIsActiveNote(false)
      setNote({})
    } catch (err) {
      toast({
        title: 'Failed to move note to archive',
        // description: err.response.data,
        variant: 'danger',
      })
    }
    setLoading(false)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h2 className='text-xl'>Move to archive</h2>
        <Dvider />
        <p>Are you sure you want to move this note to archive ?</p>
        <DialogFooter>
          <Button
            className='m-1'
            size={'sm'}
            variant={'secondary'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className='m-1'
            size={'sm'}
            variant={'destructive'}
            onClick={() => handleArchiveNote()}
            isLoading={loading}
          >
            Yes, move it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MoveToArchive
```

**./noteEditor/noteMenuLists/menu/moveToTrash.js**

```javascript
import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../../../ui/dialog'
import { useToast } from '../../../ui/use-toast'
import React, { useState, useContext } from 'react'

import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xUpdateNote } from '../../../../api/fetch'

function MoveToTrash({ open, setOpen }) {
  const { setIsActiveNote, note, setNote, getNotes } =
    useContext(useGlobalContext)

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleRemoveNote = async () => {
    setLoading(true)
    try {
      await xUpdateNote(note?.note_id, {
        deleted: 1,
      })
      toast({
        title: 'Move to trash successfully',
        variant: 'success',
      })
      getNotes()
      setIsActiveNote(false)
      setNote({})
    } catch (err) {
      toast({
        title: 'Failed to move note to trash',
        description: err.response.data,
        variant: 'danger',
      })
    }
    setLoading(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h2 className='text-xl'>Move to trash</h2>
        <Dvider />
        <p>Are you sure you want to move this note to trash ?</p>
        <DialogFooter>
          <Button
            className='m-1'
            size={'sm'}
            variant={'secondary'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className='m-1'
            size={'sm'}
            variant={'destructive'}
            onClick={() => handleRemoveNote()}
            isLoading={loading}
          >
            Yes, move it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MoveToTrash
```

**./noteEditor/noteMenuLists/menu/shareLink.js**

```javascript
import Dvider from '../../../ui/dvider'
import { Button } from '../../../ui/button'
import { Dialog, DialogContent, DialogFooter } from '../../../ui/dialog'
import { useToast } from '../../../ui/use-toast'
import React, { useState, useContext } from 'react'

import { useGlobalContext } from '../../../../api/useGlobalContext'
import { xAddShare, xDeleteShare } from '../../../../api/fetch'

function ShareLink({ open, setOpen, data, share }) {
  const { getShares, activeBlock, setIsActiveNote, setNote } =
    useContext(useGlobalContext)

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleLink = () => {
    return share?.note_id === data?.note_id
      ? xDeleteShare(share?.share_id)
      : xAddShare({ note_id: data?.note_id })
  }

  const handleShareLink = async () => {
    setLoading(true)
    try {
      await handleLink()
      toast({
        title: `Link ${
          share?.note_id === data?.note_id ? 'remove' : 'create'
        } successfully`,
        variant: 'success',
      })
      if (activeBlock === 'share') {
        setIsActiveNote(false)
        setNote({})
      }
      getShares()
    } catch (err) {
      toast({
        title: 'Something went wrong',
        variant: 'danger',
      })
    }
    setLoading(false)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <h2 className='text-xl'>
          {share?.note_id === data?.note_id ? 'Remove' : 'Create'} public link !
        </h2>
        <Dvider />
        <p>
          {share?.note_id === data?.note_id
            ? 'Anyone with the link will no longer be able to view this note. You can create a new link at any time.'
            : 'Anyone with the link will be able to view this note. You can remove the link at any time.'}
        </p>
        <DialogFooter>
          <Button
            className='m-1'
            size={'sm'}
            variant={'secondary'}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className='m-1'
            size={'sm'}
            variant={'destructive'}
            onClick={() => handleShareLink()}
            isLoading={loading}
          >
            Yes, {share?.note_id === data?.note_id ? 'unshare' : 'share'} it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareLink
```

**./sidebar/createNote.js**

```javascript
import React, { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

import { Button } from '../ui/button'
import { useToast } from '../ui/use-toast'
import { useGlobalContext } from '../../api/useGlobalContext'
import { xAddNote } from '../../api/fetch'

function CreateNote() {
  const params = useParams()
  const { folderId } = params

  const [isLoading, setLoading] = useState(false)
  const { toast } = useToast()
  const { setIsSidebarOpen, getNotes } = useContext(useGlobalContext)

  const handleCreateNote = async () => {
    setLoading(true)

    try {
      await xAddNote({
        folder_id: folderId,
        name: 'Untitled',
        content: '',
        favorite: 0,
        deleted: 0,
      })
      getNotes()

      toast({
        title: 'Note succesfully created',
        variant: 'success',
      })
    } catch (err) {
      toast({
        title: 'Note succesfully created',
        variant: 'danger',
      })
    }

    setLoading(false)
    setIsSidebarOpen(false)
  }

  return (
    <div className='px-[20px]'>
      <Button
        className='w-full text-[16px] font-semibold'
        size={'lg'}
        isLoading={isLoading}
        disabled={params.folderId ? false : true}
        variant={'secondary'}
        onClick={() => handleCreateNote()}
      >
        {isLoading ? null : <FiPlus className='text-[20px] mr-2' />}
        <span>New Note</span>
      </Button>
    </div>
  )
}

export default CreateNote
```

**./sidebar/index.js**

```javascript
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Divide } from 'hamburger-react'

import FolderMenu from './folderMenu/folderMenu'
import MoreMenu from './moreMenu'
import LinkMenu from './linkMenu'
import SearchNote from './searchNote'
import CreateNote from './createNote'

import { useGlobalContext } from '../../api/useGlobalContext'

// MAIN AND MOBILE COMMON COMPONENT
export const CoComponent = ({ inside, isSidebarOpen, setIsSidebarOpen }) => {
  const Navigate = useNavigate()
  return (
    <div className='flex flex-col gap-[30px] my-[30px]'>
      <div className='flex justify-between items-center px-[20px]'>
        <div className='relative w-[90px]'>
          <img
            alt='test'
            src='/logo.svg'
            class='object-contain w-full cursor-pointer'
            onClick={() => {
              Navigate('/app')
              if (inside === 'mobile') {
                setIsSidebarOpen(!isSidebarOpen)
              }
            }}
          />
        </div>
        <SearchNote />
      </div>
      <CreateNote />
      <FolderMenu />
      <LinkMenu />
      <MoreMenu />
    </div>
  )
}

// MAIN COMPONENT
const Sidebar = () => {
  return (
    <React.Fragment>
      <div className='lg:block hidden fixed left-0 bottom-0 top-0 w-[300px] custom-scrollbar'>
        <CoComponent inside='sidebar' />
      </div>

      {/* mobile sidebar */}
      <MoSidebar />
    </React.Fragment>
  )
}

// MOBILE SIDEBAR
export const MoSidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(useGlobalContext)
  return (
    <>
      <MoHeader>
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'spring', bounce: 0 }}
                exit={{ opacity: 0 }}
                className='fixed h-screen w-full z-[999] inset-0 bg-black/80'
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              ></motion.div>
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', bounce: 0 }}
                exit={{ x: '-100%' }}
                className='lg:hidden block fixed left-0 bottom-0 top-0 w-[300px] custom-scrollbar z-[999999] bg-background'
              >
                <CoComponent
                  inside='mobile'
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </MoHeader>
    </>
  )
}

// HEADER MOBILE
export const MoHeader = ({ children }) => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(useGlobalContext)
  const Navigate = useNavigate()

  return (
    <div className='lg:hidden block sticky top-0 w-full z-50 bg-background h-[60px]'>
      <div className='flex justify-between items-center relative h-full px-[20px]'>
        <div className={`w-[90px] relative`}>
          <img
            alt='test'
            src={'/logo.svg'}
            className='object-contain w-full'
            onClick={() => Navigate('/app')}
          />
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='absolute right-0 z-[9999]'
        >
          <Divide toggled={isSidebarOpen} size={20} />
        </button>
      </div>
      {children}
    </div>
  )
}

export default Sidebar
```

**./sidebar/linkMenu.js**

```javascript
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiBookmark, FiLink } from 'react-icons/fi'
import IndicatorCount from '../ui/indicatorCount'
import { useGlobalContext } from '../../api/useGlobalContext'

const LinkMenu = () => {
  const {
    bookmarks,
    shares,
    setIsSidebarOpen,
    setIsActiveNote,
    setActiveBlock,
  } = useContext(useGlobalContext)

  const link = [
    {
      name: 'Bookmark',
      href: '/bookmark',
      icon: <FiBookmark />,
      counter: bookmarks?.length,
      active: 'bookmark',
    },
    {
      name: 'Shared',
      href: '/shared',
      icon: <FiLink />,
      counter: shares?.length,
      active: 'shared',
    },
    // {
    //   name: 'Subscribed',
    //   href: '/shared',
    //   icon: <FiLink />,
    //   counter: 100,
    //   active: 'shared',
    // },
  ]
  return (
    <div className='flex flex-col space-y-[8px]'>
      <div className='flex justify-between items-center px-[30px] inactive-text'>
        <p className='text-[14px] font-semibold'>Link</p>
      </div>
      <div className='flex flex-col gap-[5px]'>
        {link.map((item, i) => (
          <React.Fragment key={i}>
            <Link
              className='inactive-text hover:text-white py-[10px] hover:bg-white/[3%] transition px-[30px] rounded-md'
              to={'/app' + item.href}
              onClick={() => {
                setActiveBlock(item.active)
                setIsActiveNote(false)
                setIsSidebarOpen(false)
              }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[15px]'>
                  <div className='text-[20px]'>{item.icon}</div>
                  <p className='truncate'>{item.name}</p>
                </div>
                <IndicatorCount className='mr-2' count={item.counter} />
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default LinkMenu
```

**./sidebar/moreMenu.js**

```javascript
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FiStar, FiArchive, FiTrash } from 'react-icons/fi'
import IndicatorCount from '../ui/indicatorCount'
import { useGlobalContext } from '../../api/useGlobalContext'

const MoreMenu = () => {
  const {
    setIsSidebarOpen,
    setIsActiveNote,
    favorites,
    trash,
    archive,
    setActiveBlock,
  } = useContext(useGlobalContext)

  const more = [
    {
      name: 'Favorites',
      href: '/favorites',
      icon: <FiStar />,
      counter: favorites?.length,
      active: 'favorites',
    },
    {
      name: 'Archive',
      href: '/archive',
      icon: <FiArchive />,
      counter: archive?.length,
      active: 'archive',
    },
    {
      name: 'Trash',
      href: '/trash',
      icon: <FiTrash />,
      counter: trash?.length,
      active: 'trash',
    },
  ]
  return (
    <div className='flex flex-col space-y-[8px]'>
      <div className='flex justify-between items-center px-[30px] inactive-text'>
        <p className='text-[14px] font-semibold'>More</p>
      </div>
      <div className='flex flex-col gap-[5px]'>
        {more.map((item, i) => (
          <React.Fragment key={i}>
            <Link
              className='inactive-text hover:text-white py-[10px] hover:bg-white/[3%] transition px-[30px] rounded-md'
              to={'/app' + item.href}
              onClick={() => {
                setActiveBlock(item.active)
                setIsActiveNote(false)
                setIsSidebarOpen(false)
              }}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-[15px]'>
                  <div className='text-[20px]'>{item.icon}</div>
                  <p className='truncate'>{item.name}</p>
                </div>
                <IndicatorCount className='mr-2' count={item.counter} />
              </div>
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default MoreMenu
```

**./sidebar/searchNote.js**

```javascript
import React, { useState, useMemo, useContext } from 'react'
import { Button } from '../ui/button'
import { FiFolder, FiSearch, FiX } from 'react-icons/fi'
import { FiFileText } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import * as NProgress from 'nprogress'
import { create } from 'zustand'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { AiFillStar } from 'react-icons/ai'

import { useGlobalContext } from '../../api/useGlobalContext'

const useSearchState = create((set) => ({
  search: '',
  setSearch: (val) => set(() => ({ search: val })),
  clearSearch: () => set({ search: '' }),

  isWaiting: false,
  setWaiting: (status) => set({ isWaiting: status }),

  loading: {},
  setLoading: (id) =>
    set((state) => ({ loading: { ...state.loading, [id]: true } })),
  doneLoading: () => set({ loading: {} }),
}))

const useSearchStateHook = () => {
  const { setIsSidebarOpen, setIsActiveNote, setNote } =
    useContext(useGlobalContext)

  const setSidebar = (state) => setIsSidebarOpen(state)
  const setActiveNote = (state) => setIsActiveNote(state)
  const setCurNote = (state) => setNote(state)
  const clearSearch = useSearchState((state) => state.clearSearch)
  const isWaiting = useSearchState((state) => state.isWaiting)
  const setWaiting = useSearchState((state) => state.setWaiting)
  const loading = useSearchState((state) => state.loading)
  const setLoading = useSearchState((state) => state.setLoading)
  const doneLoading = useSearchState((state) => state.doneLoading)
  return {
    setSidebar,
    setActiveNote,
    setCurNote,
    clearSearch,
    isWaiting,
    setWaiting,
    loading,
    setLoading,
    doneLoading,
  }
}

const RenderFolderItem = ({ title, data, icon, setOpen }) => {
  const {
    setSidebar,
    setActiveNote,
    setCurNote,
    setLoading,
    clearSearch,
    loading,
    doneLoading,
    setWaiting,
    isWaiting,
  } = useSearchStateHook()
  const Navigate = useNavigate()

  const redirectTo = (item) => {
    NProgress.start()
    setTimeout(() => {
      setActiveNote(false)
      setCurNote({})
      Navigate(`/app/folders/${item.folder_id}`)
      NProgress.done()
    }, 1000)
  }

  const handlePushRoute = async (item) => {
    setLoading(item.folder_id)
    setWaiting(true)
    await redirectTo(item)
    setOpen(false)
    setWaiting(false)
    doneLoading()
    clearSearch()
    setSidebar(false)
  }

  return (
    <>
      {data?.length !== 0 ? (
        <>
          <div className='flex flex-col px-[20px]'>
            <div className='flex items-center'>
              <p className='inactive-text text-sm pb-1 mr-4'>{title}</p>
              <div className='bg-white/[20%] w-full h-[1px]'></div>
            </div>
            {data?.map((item, i) => (
              <div
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative  ${
                  loading[item.folder_id] ? 'opacity-50' : ''
                } ${isWaiting && 'pointer-events-none cursor-default'} `}
                key={i}
                onClick={() => handlePushRoute(item)}
              >
                <div className='flex gap-[20px] items-center'>
                  {icon}
                  <p className='truncate lg:text-base text-sm'>{item.name}</p>
                </div>
                {loading[item.folder_id] === true && (
                  <div className='absolute inset-y-0 right-0 flex items-center -translate-x-5'>
                    <Loader2 className='animate-spin' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  )
}

const RenderNoteItem = ({ title, data, icon, setOpen }) => {
  const {
    setSidebar,
    setActiveNote,
    setCurNote,
    setLoading,
    clearSearch,
    loading,
    doneLoading,
    setWaiting,
    isWaiting,
  } = useSearchStateHook()
  const Navigate = useNavigate()

  const handlePushRoute = async (item) => {
    setLoading(item.note_id)
    setActiveNote(null)
    setWaiting(true)
    NProgress.start()
    Navigate(`/app/folders/${item.folder_id}`)
    setCurNote(item)
    setActiveNote(true)
    setOpen(false)
    setWaiting(false)
    doneLoading()
    NProgress.done()
    clearSearch()
    setSidebar(false)
  }

  return (
    <>
      {data?.length !== 0 ? (
        <>
          <div className='flex flex-col px-[20px]'>
            <div className='flex items-center'>
              <p className='inactive-text text-sm pb-1 mr-4'>{title}</p>
              <div className='bg-white/[20%] w-full h-[1px]'></div>
            </div>
            {data?.map((item, i) => (
              <div
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative ${
                  loading[item.note_id] && item.deleted === 0
                    ? 'opacity-50'
                    : ''
                } ${isWaiting && 'pointer-events-none cursor-default'} `}
                key={i}
                onClick={() => handlePushRoute(item)}
              >
                <div className='flex gap-[20px] items-center'>
                  {icon}
                  <p className='truncate lg:text-base text-sm'>{item.name}</p>
                  {item.favorite === 1 && (
                    <AiFillStar className='h-4 w-4 text-yellow-300' />
                  )}
                </div>
                {loading[item.note_id] && item.deleted === 0 && (
                  <div className='absolute inset-y-0 right-0 flex items-center -translate-x-5'>
                    <Loader2 className='animate-spin' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </>
  )
}

const RenderNoteOnMore = ({ title, data, redirect, icon, setOpen }) => {
  const {
    setSidebar,
    setActiveNote,
    setCurNote,
    setLoading,
    clearSearch,
    loading,
    doneLoading,
    setWaiting,
    isWaiting,
  } = useSearchStateHook()

  const Navigate = useNavigate()
  const _setCurNote = (item) => {
    setTimeout(() => {
      setActiveNote(true)
      setCurNote(item)
    }, 500)
  }

  const handlePushRoute = async (item) => {
    NProgress.start()
    Navigate(redirect)
    setLoading(item.note_id)
    setWaiting(true)
    await _setCurNote(item)
    setOpen(false)
    NProgress.done()
    doneLoading()
    clearSearch()
    setWaiting(false)
    setSidebar(false)
  }
  return (
    <>
      {data?.length !== 0 ? (
        <>
          <div className='flex flex-col px-[20px]'>
            <div className='flex items-center'>
              <p className='inactive-text text-sm pb-1 mr-4'>{title}</p>
              <div className='bg-white/[20%] w-full h-[1px]'></div>
            </div>
            {data?.map((item, i) => (
              <div
                className={`hover:bg-white/[5%] py-3 rounded-md transition px-3 cursor-pointer relative ${
                  loading[item.note_id] && item.deleted !== 0
                    ? 'opacity-50'
                    : ''
                } ${isWaiting && 'cursor-default pointer-events-none'}`}
                key={i}
                onClick={() => handlePushRoute(item)}
              >
                <div className='flex gap-[20px] items-center'>
                  {icon}
                  <p className='truncate lg:text-base text-sm'>{item.name}</p>
                </div>
                {loading[item.note_id] && item.deleted !== 0 && (
                  <div className='absolute inset-y-0 right-0 flex items-center -translate-x-5'>
                    <Loader2 className='animate-spin' />
                  </div>
                )}
              </div>
            ))}
            {data.length === 0 && (
              <p className='text-center text-sm inactive-text'>
                Trash is empty
              </p>
            )}
          </div>
        </>
      ) : null}
    </>
  )
}

function SearchNote() {
  const [open, setOpen] = useState(false)
  const { folders, notes, archive, trash } = useContext(useGlobalContext)
  const search = useSearchState((state) => state.search)
  const setSearch = useSearchState((state) => state.setSearch)
  const clearSearch = useSearchState((state) => state.clearSearch)

  const searchFolderData = useMemo(() => {
    if (!search) return folders
    const res = folders.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    return res
  }, [search, folders])

  const searchNoteData = useMemo(() => {
    const findNotes = notes

    if (!search) {
      const sorting = findNotes.sort((a, b) => {
        if (a.favorite === b.favorite) {
          return 0
        }
        if (a.favorite) {
          return -1
        }
        return 1
      })
      return sorting
    }

    const res = findNotes.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    const sorting = res.sort((a, b) => {
      if (a.favorite === b.favorite) {
        return 0
      }
      if (a.favorite) {
        return -1
      }
      return 1
    })
    return sorting
  }, [search, notes])

  const searchNoteOnArchive = useMemo(() => {
    const findNotes = archive
    if (!search) return findNotes
    const res = findNotes.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    return res
  }, [search, archive])

  const searchNoteOnTrash = useMemo(() => {
    const findNotes = trash
    if (!search) return findNotes
    const res = findNotes.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    )
    return res
  }, [search, trash])

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size='sm' variant='ghost'>
            <FiSearch className='text-[20px]' />
          </Button>
        </DialogTrigger>
        <DialogContent className='fixed left-[50%] top-[50%] grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full p-0 border lg:max-w-[520px] max-w-[350px] border-white/[30%] lg:h-[400px] h-[300px] overflow-auto custom-scrollbar z-50'>
          <div>
            <div className='flex justify-between z-50 items-center px-[20px] sticky top-0 right-0 left-0 bg-background border-b border-white/[20%]'>
              <div className='flex items-center gap-4 w-full py-[20px]'>
                <FiSearch className='text-[20px]' />
                <input
                  type='text'
                  className='w-full bg-background text-white outline-none'
                  placeholder='Type a note or folder.....'
                  onChange={(e) => setSearch(e.target.value)}
                  maxLength={30}
                  autoFocus
                  spellCheck={false}
                  autoComplete='false'
                />
              </div>
              <Button
                size='sm'
                variant='ghost'
                className='outline-none border-none ring-0 px-[10px] py-[10px]'
                onClick={() => {
                  clearSearch()
                  setOpen(false)
                }}
              >
                <FiX className='text-[22px]' />
              </Button>
            </div>
            <div className='flex flex-col gap-[20px] my-[20px] lg:w-full w-[320px] mx-auto'>
              <RenderFolderItem
                title='Folders'
                data={searchFolderData}
                icon={<FiFolder className='text-[20px]' />}
                setOpen={setOpen}
              />
              <RenderNoteItem
                title='Notes'
                data={searchNoteData}
                icon={<FiFileText className='text-[20px]' />}
                setOpen={setOpen}
              />
              <RenderNoteOnMore
                title='Archive'
                data={searchNoteOnArchive}
                redirect='/app/archive'
                icon={<FiFileText className='text-[20px]' />}
                setOpen={setOpen}
              />
              <RenderNoteOnMore
                title='Trash'
                data={searchNoteOnTrash}
                redirect='/app/trash'
                icon={<FiFileText className='text-[20px]' />}
                setOpen={setOpen}
              />
            </div>
            {searchNoteData.length === 0 &&
              searchFolderData.length === 0 &&
              searchNoteOnArchive.length === 0 &&
              searchNoteOnTrash.length === 0 &&
              search && (
                <p className='text-lg flex h-[50%] pt-0 items-center justify-center break-wor ds'>
                  <span>No results for</span>
                  <span className='ml-2 font-bold text-white'>{search}</span>
                </p>
              )}
            {/* If no notes and folder are created below result also seen */}
            {searchNoteData.length === 0 &&
              searchFolderData.length === 0 &&
              searchNoteOnArchive.length === 0 &&
              searchNoteOnTrash.length === 0 &&
              !search && (
                <p className='text-lg flex h-[50%] pt-0 items-center justify-center break-wor ds'>
                  <span>Data is empty</span>
                </p>
              )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SearchNote
```

**./sidebar/folderMenu/createFolder.js**

```javascript
import React from 'react'
import { LuFolder } from 'react-icons/lu'
import { useFolderState } from './store'

function CreateFolder() {
  const { isCreateFolder, name, setName } = useFolderState()

  return (
    <>
      {isCreateFolder && (
        <div className='flex items-center gap-[15px] px-[30px] py-[10px]'>
          <div>
            <LuFolder className='text-[20px]' />
          </div>
          <div className='relative'>
            <input
              type='text'
              autoFocus
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              className={`bg-transparent outline outline-white/[5%] rounded w-auto ${
                false && 'border border-red-500'
              }`}
            />
            <div
              className={`absolute transition-opacity ${
                false
                  ? 'inset-0 -translate-y-6 text-[14px] text-red-500 opacity-100'
                  : 'opacity-0'
              }`}
            >
              {false && <p>something went wrong</p>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CreateFolder
```

**./sidebar/folderMenu/deleteFolder.js**

```javascript
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Dvider from '../../ui/dvider'
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '../../ui/dialog'
import { useToast } from '../../ui/use-toast'

import { xDeleteFolder } from '../../../api/fetch'
import { useGlobalContext } from '../../../api/useGlobalContext'
import { useFolderState } from './store'

const DialogDelete = () => {
  const { toast } = useToast()
  const { refreshChanger, activeBlock, setActiveBlock } =
    useContext(useGlobalContext)
  const { isOpenDialogDelete, setDialogDelete, deleteData, setDeleteData } =
    useFolderState()

  const [isLoading, setIsLoading] = useState(false)
  const Navigate = useNavigate()

  const handleDeleteFolder = async () => {
    setIsLoading(true)
    try {
      const _ = await xDeleteFolder(deleteData?.folder_id)

      if (activeBlock === 'folder') {
        if (window.location.pathname.split('/')[3] === deleteData?.folder_id) {
          setActiveBlock(null)
          Navigate('/app')
        } else {
          setActiveBlock(activeBlock)
        }
      } else {
        setActiveBlock(activeBlock)
      }

      refreshChanger()
      setIsLoading(false)
      setDialogDelete(false)
      setDeleteData({
        folder_id: '',
        name: '',
      })
      toast({
        title: 'Success',
        description: _?.msg,
        variant: 'success',
      })
    } catch (err) {
      setIsLoading(false)
      toast({
        title: 'Error',
        description: err.response.data,
        variant: 'danger',
      })
    }
  }

  return (
    <Dialog open={isOpenDialogDelete}>
      <DialogContent>
        <DialogHeader>
          <h2 className='text-2xl font-semibold'>Delete Folder?</h2>
          <Dvider />
        </DialogHeader>
        <p>
          Are you sure you want to delete
          <span className='font-bold'> {deleteData?.name} </span> folder?. This will
          also delete all notes
        </p>
        <DialogFooter>
          <Button
            className='m-1'
            onClick={() => {
              setDialogDelete(false)
              setDeleteData(null)
            }}
            size={'sm'}
            variant={'secondary'}
          >
            Cancel
          </Button>
          <Button
            className='m-1'
            isLoading={isLoading}
            onClick={() => handleDeleteFolder()}
            size={'sm'}
            variant={'destructive'}
          >
            Yes, delete it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogDelete
```

**./sidebar/folderMenu/editFolder.js**

```javascript
import React from 'react'
import { LuFolder } from 'react-icons/lu'
import { useFolderState } from './store'

function UpdateFolder() {
  const { isEditFolder, updateData, setUpdateData } = useFolderState()

  return (
    <>
      {isEditFolder ? (
        <div className='flex items-center gap-[15px] w-[80%] h-full py-[10px] pr-[20px]'>
          <div>
            <LuFolder className='text-[20px]' />
          </div>
          <div className='relative'>
            <input
              name='folderName'
              type='text'
              autoFocus
              defaultValue={updateData.name}
              onChange={(e) => {
                setUpdateData({
                  name: e.target.value,
                  folder_id: updateData.folder_id,
                })
              }}
              className={`bg-transparent outline outline-white/[5%] rounded w-auto ${
                updateData.name === '' && 'border border-red-500'
              }`}
            />
            <div
              className={`absolute transition-opacity ${
                false
                  ? 'inset-0 -translate-y-6 text-[14px] text-red-500 opacity-100'
                  : 'opacity-0'
              }`}
            >
              {false && <p>something went wrong</p>}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default UpdateFolder
```

**./sidebar/folderMenu/folderLists.js**

```javascript
import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LuFolder, LuFolderOpen } from 'react-icons/lu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import { Button } from '../../ui/button'
import { CgOptions } from 'react-icons/cg'
import { FiEdit, FiTrash } from 'react-icons/fi'
import UpdateFolder from './editFolder'

import { useGlobalContext } from '../../../api/useGlobalContext'
import { useFolderState } from './store'

function FolderLists() {
  const params = useParams()
  const { folders, setIsActiveNote, setActiveBlock, setIsSidebarOpen } =
    useContext(useGlobalContext)

  const {
    updateData,
    setUpdateData,

    isEditFolder,
    setIsEdit,

    isCreateFolder,

    setDeleteData,
    setDialogDelete,
  } = useFolderState()

  return (
    <>
      {folders?.map((item, i) => (
        <React.Fragment key={i}>
          <div
            className={`inactive-text hover:text-white hover:bg-white/[3%] px-[30px] ${
              params.folderId === item.folder_id
                ? 'bg-white/[3%] text-white'
                : ''
            }`}
          >
            <div className='flex items-center justify-between'>
              {isEditFolder && item.folder_id === updateData.folder_id ? (
                <UpdateFolder />
              ) : (
                <>
                  <Link
                    className={`flex items-center gap-[15px] w-[80%] h-full py-[10px] pr-[20px] relative`}
                    to={`/app/folders/${item.folder_id}`}
                    onClick={() => {
                      setIsActiveNote(false)
                      setActiveBlock('folders')
                      setIsSidebarOpen(false)
                    }}
                  >
                    <div>
                      {item.folder_id === params.folderId ? (
                        <LuFolderOpen className='text-[20px]' />
                      ) : (
                        <LuFolder className='text-[20px]' />
                      )}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className='truncate'>
                          {item.name}
                        </TooltipTrigger>
                        <TooltipContent className='border border-white/[60%] bg-background text-white'>
                          {item.name}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className='outline-none ring-0 border-none'
                      asChild
                    >
                      <Button
                        size={'sm'}
                        variant={'ghost'}
                        className='ring-0 outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                      >
                        <CgOptions className='text-[20px]' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-background border border-white/20 flex flex-col gap-2 items-center '>
                      <DropdownMenuItem
                        className='focus:text-white w-[150px] cursor-pointer text-white/[60%] focus:bg-white/[5%] py-2'
                        onClick={() => {
                          setUpdateData(item)
                          setIsEdit(true)
                        }}
                      >
                        <FiEdit className='mr-2 text-[16px]' />
                        <span className='text-[16px]'>Edit Folder</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='focus:text-white w-[150px] cursor-pointer text-white/[60%] focus:bg-white/[5%] py-2'
                        onClick={() => {
                          setDeleteData(item)
                          setDialogDelete(true)
                        }}
                      >
                        <FiTrash className='mr-2 text-[16px]' />
                        <span className='text-[16px]'>Delete Folder</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
      {folders?.length === 0 && !isCreateFolder && (
        <div className='flex items-center justify-center'>
          <p className='px-[30px] text-sm inactive-text'>Folder is empty</p>
        </div>
      )}
    </>
  )
}

export default FolderLists
```

**./sidebar/folderMenu/folderMenu.js**

```javascript
import DialogDelete from './deleteFolder'
import CreateFolder from './createFolder'
import SaveFolder from './saveFolder'
import FolderLists from './folderLists'

const FolderMenu: React.FC = () => {
  return (
    <div className='flex flex-col space-y-[8px]'>
      <div className='flex justify-between items-center px-[30px] inactive-text'>
        <p className='text-[14px] font-semibold'>Folders</p>
        <SaveFolder />
      </div>
      <div className='flex flex-col gap-[5px]'>
        <CreateFolder />
        <FolderLists />
      </div>
      <DialogDelete />
    </div>
  )
}

export default FolderMenu
```

**./sidebar/folderMenu/saveFolder.js**

```javascript
import React, { useState, useContext } from 'react'
import { Loader2 } from 'lucide-react'
import { FiFolderPlus, FiSave, FiX } from 'react-icons/fi'
import { Button } from '../../ui/button'
import { useToast } from '../../ui/use-toast'
import { isExistArray } from '../../../lib/utils'

import { xAddFolder, xUpdateFolder } from '../../../api/fetch'
import { useGlobalContext } from '../../../api/useGlobalContext'
import { xAddNote } from '../../../api/fetch'
import { useFolderState } from './store'
import { CONTENT } from '../../../lib/note/CONST'

function SaveFolder() {
  const { folders, getFolders, refreshChanger } = useContext(useGlobalContext)
  const {
    name,
    setName,

    updateData,
    setUpdateData,

    isCreateFolder,
    setIsCreate,

    isEditFolder,
    setIsEdit,
  } = useFolderState()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddFolder = () => {
    setIsLoading(true)

    if (name === '') {
      toast({
        title: 'Folder name cannot be empty',
        variant: 'danger',
      })
      setIsLoading(false)
      return
    }

    if (isExistArray(folders, 'name', name)) {
      toast({
        title: 'Folder name already exist',
        variant: 'danger',
      })
      setIsLoading(false)
      return
    }

    setTimeout(async () => {
      try {
        const _ = await xAddFolder(name)
        await xAddNote({
          folder_id: _?.folder_id,
          name: 'Reflection on the Month of June',
          content: `${CONTENT}`,
        })

        refreshChanger()

        toast({
          title: _?.msg,
          variant: 'success',
        })
        setIsLoading(false)
        setIsCreate(false)
        setName('New Folder')
      } catch (err) {
        toast({
          title: 'Failed to create',
          description: err.response.data,
          variant: 'danger',
        })
        setIsLoading(false)
      }
    }, 500)
  }

  const handleUpdateFolder = () => {
    const { folder_id, name } = updateData
    setIsLoading(true)

    if (name === '') {
      toast({
        title: 'Folder name cannot be empty',
        variant: 'danger',
      })
      setIsLoading(false)
      return
    }

    if (isExistArray(folders, 'name', name)) {
      toast({
        title: 'Folder name already exist',
        variant: 'danger',
      })
      setIsLoading(false)
      return
    }

    setTimeout(async () => {
      try {
        const _ = await xUpdateFolder(folder_id, name)
        getFolders()

        toast({
          title: _?.msg,
          variant: 'success',
        })
        setIsLoading(false)
        setIsEdit(false)
        setUpdateData({
          folder_id: '',
          name: '',
        })
      } catch (err) {
        toast({
          title: 'Failed to update',
          description: err.response.data,
          variant: 'danger',
        })
        setIsLoading(false)
      }
    }, 500)
  }

  return (
    <>
      {isCreateFolder || isEditFolder ? (
        <div className='flex'>
          <Button
            size={'sm'}
            variant={'ghost'}
            className='px-2 py-2'
            disabled={
              isLoading ||
              ((isCreateFolder ? name === '' : updateData.name === '') && true)
            }
            onClick={() => {
              if (isCreateFolder) {
                handleAddFolder()
                return
              }
              handleUpdateFolder()
            }}
          >
            {isLoading ? (
              <Loader2 className='h-[20px] w-[20px] animate-spin' />
            ) : (
              <FiSave className='text-[20px]' />
            )}
          </Button>
          <Button
            size={'sm'}
            variant={'ghost'}
            className='px-2 py-2'
            disabled={isLoading}
            onClick={() => {
              setIsCreate(false)
              setIsEdit(false)
              setName('New Folder')
            }}
          >
            <FiX className='text-[20px]' />
          </Button>
        </div>
      ) : (
        <Button size={'sm'} variant={'ghost'} onClick={() => setIsCreate(true)}>
          <FiFolderPlus className='text-[20px]' />
        </Button>
      )}
    </>
  )
}

export default SaveFolder
```

**./sidebar/folderMenu/store.js**

```javascript
import { create } from 'zustand'

const useFolderStateStore = create((set) => ({
  // init state
  name: 'New Folder',
  isCreateFolder: false,
  isEditFolder: false,
  isOpenDialogDelete: false,

  // state data
  deleteData: {
    folder_id: '',
    name: '',
  },
  updateData: {
    folder_id: '',
    name: '',
  },

  // action
  setName: (name) => set({ name: name }),
  setIsCreate: (status) => set({ isCreateFolder: status }),
  setIsEdit: (status) => set({ isEditFolder: status }),
  setDialogDelete: (status) => set({ isOpenDialogDelete: status }),
  setUpdateData: (data) => set({ updateData: data }),
  setDeleteData: (data) => set({ deleteData: data }),
}))

export function useFolderState() {
  // init state
  const name = useFolderStateStore((state) => state.name)
  const isCreateFolder = useFolderStateStore((state) => state.isCreateFolder)
  const isEditFolder = useFolderStateStore((state) => state.isEditFolder)
  const updateData = useFolderStateStore((state) => state.updateData)
  const deleteData = useFolderStateStore((state) => state.deleteData)
  const isOpenDialogDelete = useFolderStateStore(
    (state) => state.isOpenDialogDelete
  )

  //   state action
  const setIsEdit = useFolderStateStore((state) => state.setIsEdit)
  const setIsCreate = useFolderStateStore((state) => state.setIsCreate)
  const setDialogDelete = useFolderStateStore((state) => state.setDialogDelete)
  const setName = useFolderStateStore((state) => state.setName)
  const setUpdateData = useFolderStateStore((state) => state.setUpdateData)
  const setDeleteData = useFolderStateStore((state) => state.setDeleteData)

  return {
    name,
    isCreateFolder,
    isEditFolder,
    updateData,
    deleteData,
    isOpenDialogDelete,

    setName,
    setIsCreate,
    setIsEdit,
    setUpdateData,
    setDeleteData,
    setDialogDelete,
  }
}
```

**./trash/trashMenu.js**

```javascript
import React, { useEffect, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Button } from '../ui/button'

import Dvider from '../ui/dvider'
import { Dialog, DialogContent, DialogFooter } from '../ui/dialog'

import { IoChevronBackOutline } from 'react-icons/io5'
import { useToast } from '../ui/use-toast'

import { useGlobalContext } from '../../api/useGlobalContext'
import { xUpdateNote, xDeleteNote } from '../../api/fetch'

function TrashMenu() {
  const isBigScreen = useMediaQuery({ minWidth: 1024 })

  const [loading, setLoading] = React.useState(false)
  const { toast } = useToast()
  const {
    note,
    setNote,
    getNotes,
    isActiveNote,
    setIsActiveNote,
    setActiveBlock,
  } = useContext(useGlobalContext)

  const [method, setMethod] = React.useState('restore')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    setActiveBlock('trash')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleNote() {
    setLoading(true)
    try {
      if (method === 'restore') {
        await xUpdateNote(note?.note_id, {
          deleted: 0,
        })
        toast({
          title: 'Note succesfully restored',
          variant: 'success',
        })
      }
      if (method === 'delete') {
        await xDeleteNote(note?.note_id)
        toast({
          title: 'Note succesfully deleted',
          variant: 'success',
        })
      }
      getNotes()
      setIsActiveNote(false)
      setNote({})
      // Navigate()
    } catch (err) {
      toast({
        title:
          method === 'restore'
            ? 'Failed to restore note'
            : 'Failed to delete note',
        description: 'Please try again later',
        variant: 'danger',
      })
    }
    setLoading(false)
    setMethod('restore')
    setOpen(false)
  }

  return (
    <>
      {isActiveNote && (
        <>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <h2 className='text-xl'>
                {method === 'restore' ? 'Restore' : 'Delete'} note !
              </h2>
              <Dvider />
              <p>
                Are you sure you want to{' '}
                <span className='font-semibold'>
                  {method === 'restore' ? 'restore' : 'delete'}
                </span>{' '}
                this note ?
              </p>
              <DialogFooter>
                <Button
                  className='m-1'
                  size={'sm'}
                  variant={'secondary'}
                  onClick={() => {
                    setMethod('restore')
                    setOpen(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className='m-1'
                  size={'sm'}
                  variant={method === 'restore' ? 'default' : 'destructive'}
                  onClick={() => handleNote()}
                  isLoading={loading}
                >
                  {method === 'restore' ? 'Yes, move it' : 'Yes, delete it'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className='px-2 flex flex-col gap-[10px] items-center justify-center h-[calc(100vh-60px)] w-auto lg:w-[calc(100vw-650px)] lg:h-screen'>
            <img
              alt='icon'
              priority
              src={'/history.svg'}
              height={80}
              width={80}
            />
            <h2 className='font-semibold text-[28px] text-center'>
              Restore "<span>{`${note.name}`}</span>"
            </h2>
            <p className='lg:w-[460px] text-center font-normal text-white/[60%]'>
              Don't want to lose this note? It's not too late! Just click the
              'Restore' button and it will be added back to your list. It's that
              simple.
            </p>
            <span className='mt-2'>
              <Button
                className='text-[16px] font-semibold'
                size={'lg'}
                onClick={() => {
                  setMethod('restore')
                  setOpen(true)
                }}
                isLoading={loading}
              >
                <span>Restore</span>
              </Button>
              <span className='m-2'></span>
              <Button
                className='text-[16px] font-semibold'
                size={'lg'}
                variant={'destructive'}
                onClick={() => {
                  setMethod('delete')
                  setOpen(true)
                }}
                isLoading={loading}
              >
                <span>Delete</span>
              </Button>
            </span>
          </div>
          {!isBigScreen ? (
            <div className='fixed bottom-0 left-0 translate-x-[10px] z-[10] -translate-y-[10px]'>
              <Button
                variant={'secondary'}
                onClick={() => {
                  setIsActiveNote(null)
                }}
                className='backdrop-blur-md'
              >
                <IoChevronBackOutline className='text-xl mr-2' />
                Go Back
              </Button>
            </div>
          ) : null}
        </>
      )}
    </>
  )
}

export default TrashMenu
```

**./ui/alert-dialog.js**

```javascript
import React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '../../lib/utils'
import { buttonVariants } from './button'

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = ({ className, children, ...props }) => (
  <AlertDialogPrimitive.Portal className={cn(className)} {...props}>
    <div className='fixed inset-0 z-50 flex items-end justify-center sm:items-center'>
      {children}
    </div>
  </AlertDialogPrimitive.Portal>
)
AlertDialogPortal.displayName = AlertDialogPrimitive.Portal.displayName

const AlertDialogOverlay = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AlertDialogPrimitive.Overlay
      className={cn(
        'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity animate-in fade-in',
        className
      )}
      {...props}
      ref={ref}
    />
  )
)
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-background p-6 opacity-100 shadow-lg animate-in fade-in-90 slide-in-from-bottom-10 sm:rounded-lg sm:zoom-in-90 sm:slide-in-from-bottom-0 md:w-full',
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
)
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'mt-2 sm:mt-0',
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
```

**./ui/badge.js**

```javascript
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'bg-primary hover:bg-primary/80 border-transparent text-primary-foreground',
        secondary:
          'bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground',
        destructive:
          'bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground',
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

**./ui/button.js**

```javascript
import * as React from 'react'
import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 text-white!',
        destructive:
          'bg-destructive/[30%] border border-destructive hover:bg-destructive/[70%]',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-white/[5%] text-white hover:bg-white/[7%]',
        ghost: 'hover:bg-white/10 hover:text-white',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const Button = React.forwardRef(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled ? disabled : isLoading
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <Loader2 className='h-[18px] w-[18px] animate-spin mr-2' />
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

**./ui/card.js**

```javascript
import React from 'react'
import { cn } from '../../lib/utils'

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'
// eslint-disable-next-line

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

**./ui/context-menu.js**

```javascript
import * as React from 'react'
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '../../lib/utils'

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <ContextMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className='ml-auto h-4 w-4' />
    </ContextMenuPrimitive.SubTrigger>
  )
)
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in slide-in-from-left-1',
        className
      )}
      {...props}
    />
  )
)
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80',
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
)
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <ContextMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <Check className='h-4 w-4' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  )
)
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ContextMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <ContextMenuPrimitive.ItemIndicator>
          <Circle className='h-2 w-2 fill-current' />
        </ContextMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitive.RadioItem>
  )
)
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <ContextMenuPrimitive.Label
      ref={ref}
      className={cn(
        'px-2 py-1.5 text-sm font-semibold text-foreground',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
)
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ContextMenuPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
)
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({ className, ...props }) => {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = 'ContextMenuShortcut'

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
```

**./ui/dialog.js**

```javascript
import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '../../lib/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({ className, ...props }) => (
  <DialogPrimitive.Portal className={cn(className)} {...props} />
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef((props, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      props.className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef((props, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-white/[10%] bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg md:w-full',
        props.className
      )}
      {...props}
    >
      {props.children}
      <DialogPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
        <X className='h-4 w-4' />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef((props, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      props.className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef((props, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', props.className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
```

**./ui/dropdown-menu.js**

```javascript
import React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '../../lib/utils'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef(
  ({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
        inset && 'pl-8',
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className='ml-auto h-4 w-4' />
    </DropdownMenuPrimitive.SubTrigger>
  )
)
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        className
      )}
      {...props}
    />
  )
)
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
)
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
)
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef(
  ({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className='h-4 w-4' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
)
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className='h-2 w-2 fill-current' />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
)
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef(
  ({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(
        'px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className
      )}
      {...props}
    />
  )
)
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn('-mx-1 my-1 h-px bg-muted', className)}
      {...props}
    />
  )
)
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({ className, ...props }) => {
  return (
    <span
      className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
```

**./ui/dvider.js**

```javascript
import React from 'react'

function Dvider({ className }) {
  return <div className={`bg-white/[20%] w-full h-[1px] ${className}`}></div>
}

export default Dvider
```

**./ui/editable.js**

```javascript
import { cn } from '../../lib/utils'
import { useEffect, useRef, useState } from 'react'
import { FiEdit2 } from 'react-icons/fi'

const Editable = ({
  className,
  value,
  maxLength,
  isEdit,
  setIsEdit,
  isEditable,
  ...props
}) => {
  const [currValue, setCurrentValue] = useState()
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      setCurrentValue(inputRef.current.value.length)
    }
  }, [isEdit, value])

  return (
    <>
      {isEdit ? (
        <div className='w-full '>
          <input
            className={cn('bg-transparent outline-none  ', className)}
            maxLength={Number(maxLength)}
            autoFocus={true}
            value={value}
            ref={inputRef}
            {...props}
          />
          <span
            className={`text-sm text-white/50 ${
              currValue === Number(maxLength) && '!text-red-500'
            }`}
          >
            {currValue}/{maxLength}
          </span>
        </div>
      ) : (
        <div
          className='flex gap-2 w-full break-words cursor-pointer'
          onClick={() => setIsEdit(true)}
        >
          {isEditable ? (
            <FiEdit2 className='w-[30px] text-[20px] translate-y-2' />
          ) : null}
          <p
            className={cn(
              'bg-transparent outline-none cursor-pointer break-all',
              className
            )}
          >
            {value}
          </p>
        </div>
      )}
    </>
  )
}

export default Editable
```

**./ui/indicatorCount.js**

```javascript
import clsx from 'clsx'
import React from 'react'

const IndicatorCount = ({ className, count }) => {
  if (!count || count === 0) return null
  return (
    <div
      className={clsx(
        'bg-primary rounded-full text-white w-[25px] h-[25px] font-medium text-center text-[12px] flex items-center justify-center',
        className
      )}
    >
      {count >= 100 ? '99+' : count}
    </div>
  )
}

export default IndicatorCount
```

**./ui/input.js**

```javascript
import * as React from 'react'

import { cn } from '../../lib/utils'

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

export { Input }
```

**./ui/label.js**

```javascript
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
```

**./ui/popover.js**

```javascript
import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '../../lib/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef(
  ({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
```

**./ui/select.js**

```javascript
import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'

import { cn } from '../../lib/utils'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className='h-4 w-4 opacity-50' />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef(
  ({ className, children, position = 'popper', ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
          position === 'popper' && 'translate-y-1',
          className
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
)
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className='absolute left-2 flex h-3.5 w-3.5 items-center justify-center'>
        <SelectPrimitive.ItemIndicator>
          <Check className='h-4 w-4' />
        </SelectPrimitive.ItemIndicator>
      </span>

      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
)
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}
```

**./ui/skeleton.js**

```javascript
import { cn } from '../../lib/utils'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-white/[3%]', className)}
      {...props}
    />
  )
}

export { Skeleton }
```

**./ui/toast.js**

```javascript
import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cva } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '../../lib/utils'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  'data-[swipe=move]:transition-none group relative pointer-events-auto flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=closed]:slide-out-to-right-full',
  {
    variants: {
      variant: {
        default: 'bg-background border',
        destructive:
          'group destructive border-destructive bg-destructive text-destructive-foreground',
        warning:
          'bg-background border-none outline outline-yellow-500/60 backdrop-filter-blur-md  text-white',
        danger:
          'bg-background border-none outline outline-red-500/60 backdrop-filter-blur-md  text-white',
        success:
          'bg-background border-none outline outline-emerald-500/60 backdrop-filter-blur-md text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-destructive/30 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    toast-close=''
    {...props}
  >
    <X className='h-4 w-4' />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold', className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
```

**./ui/toaster.js**

```javascript
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast'
import { useToast } from './use-toast'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

**./ui/tooltip.js**

```javascript
import React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '../../lib/utils'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef((props, ref) => {
  const { className, sideOffset = 4, ...restProps } = props

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1',
        className
      )}
      {...restProps}
    />
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

**./ui/use-toast.js**

```javascript
import { useState, useEffect } from 'react'

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toastTimeouts = new Map()

const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case 'DISMISS_TOAST': {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
      return {
        ...state,
        toasts: [],
      }
  }
}

const listeners = []

let memoryState = { toasts: [] }

function dispatch(action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

function toast({ ...props }) {
  const id = genId()

  const update = (props) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id })

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = useState(memoryState)

  useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  }
}

export { useToast, toast }
```

### `src/layouts`

**./app.js**

```javascript
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import NextTopLoader from 'nextjs-toploader'

import { Toaster } from '../components/ui/toaster'
import Sidebar from '../components/sidebar'
import { Animate } from '../components/animate'
import { useGlobalContext } from '../api/useGlobalContext'

export default function RootLayout({ children }) {
  const Navigate = useNavigate()
  const { currentUserId } = useContext(useGlobalContext)

  if (currentUserId === null) {
    setTimeout(() => {
      Navigate('/login') // window.location.href = '/login'
    }, 1)

    return <div></div>
  }

  return (
    <div className='app-page'>
      <NextTopLoader color='#F86F03' />
      <div className='lg:w-[calc(100vw-300px)] lg:ml-auto'>
        <Sidebar />
        <Animate>
          <div className='lg:flex'>{children}</div>
        </Animate>
      </div>
      <Toaster />
    </div>
  )
}
```

**./home.js**

```javascript
import React from 'react'
import NextTopLoader from 'nextjs-toploader'

import { Navbar } from '../components/navbar'

export default function HomeLayout({ children }) {
  return (
    <div className='home-page'>
      <Navbar />
      <div className='max-w-[1024px] mx-auto mb-[149px]'>{children}</div>
      <NextTopLoader color='#F86F03' />
    </div>
  )
}
```

### `src/lib`

**./utils.js**

```javascript
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { convert } from 'html-to-text'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function toPlainText({ type = 'html', value }) {
  switch (type) {
    case 'html':
      const text = convert(value, { wordwrap: 130 })
      return text
    default:
      break
  }
}

export function dateToString({ type, values }) {
  let results
  const date = new Date(values)
  switch (type) {
    case 'yyy-mm-dd':
      const converting = date.toLocaleDateString('zh-Hans-CN')
      results = converting
      break

    default:
      const defaultConverting = date.toLocaleDateString('default')
      results = defaultConverting
      break
  }

  return results
}

export function slug(value) {
  if (!value) {
    return value
  }
  const results = value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return results
}

export function isExistArray(array, key, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return true
    }
  }
  return false
}
```

**./note/CONST.js**

```javascript
export const CONTENT = `<p>It's hard to believe that June is already over! Looking back on the month, there were a few highlights that stand out to me.</p>

<p>One of the best things that happened was getting promoted at work. I've been working really hard and it's great to see that effort recognized. It's also exciting to have more responsibility and the opportunity to contribute to the company in a bigger way. I'm looking forward to taking on new challenges and learning as much as I can in my new role.</p>

<p>I also had a great time on my vacation to Hawaii. The beaches were beautiful and I loved trying all of the different types of Hawaiian food. It was nice to relax and get away from the daily grind for a bit. I'm so grateful to have had the opportunity to take a trip like that.</p>

<p>On the downside, I feel like I didn't make as much progress on my fitness goals as I would have liked. I was really busy with work and didn't make it to the gym as often as I planned. I'm going to try to be more consistent in July and make exercise a higher priority. I know it will be good for my physical and mental health.</p>

<p>I also had a few rough patches in my relationships this month. I had a couple of misunderstandings with friends and it was hard to navigate those conflicts. But I'm glad we were able to talk things through and move past them. I value my relationships and I want to make sure I'm always working to be a good friend.</p>

<p>Overall, it was a good month with a mix of ups and downs. I'm looking forward to what July has in store! I'm hoping to make some more progress on my goals and spend quality time with the people I care about.</p>`
```

### `src/styles`

**./css/custom.css**

```css
@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/bb4f634fcd3b187b-s.woff2) format('woff2');
  unicode-range: U+0460-052f, U+1c80-1c88, U+20b4, U+2de0-2dff, U+a640-a69f,
    U+fe2e-fe2f;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/668e25ca098400ee-s.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045f, U+0490-0491, U+04b0-04b1, U+2116;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/f4abd27a660139a1-s.woff2) format('woff2');
  unicode-range: U+1f??;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/e22152c09e7c2b3d-s.woff2) format('woff2');
  unicode-range: U+0370-03ff;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/b423eff6dafa6815-s.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
    U+01a0-01a1, U+01af-01b0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323,
    U+0329, U+1ea0-1ef9, U+20ab;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/f3a5b7489145585c-s.woff2) format('woff2');
  unicode-range: U+0100-02af, U+0304, U+0308, U+0329, U+1e00-1e9f, U+1ef2-1eff,
    U+2020, U+20a0-20ab, U+20ad-20cf, U+2113, U+2c60-2c7f, U+a720-a7ff;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 200;
  font-display: swap;
  src: url(../fonts/3a39f6dce9dddde3-s.p.woff2) format('woff2');
  unicode-range: U+00??, U+0131, U+0152-0153, U+02bb-02bc, U+02c6, U+02da,
    U+02dc, U+0304, U+0308, U+0329, U+2000-206f, U+2074, U+20ac, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+feff, U+fffd;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/da16bfcbf1276783-s.woff2) format('woff2');
  unicode-range: U+0460-052f, U+1c80-1c88, U+20b4, U+2de0-2dff, U+a640-a69f,
    U+fe2e-fe2f;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/9e98545c8189a7e4-s.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045f, U+0490-0491, U+04b0-04b1, U+2116;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/84661e57dd8199ee-s.woff2) format('woff2');
  unicode-range: U+1f??;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/4c35245a4b3471c2-s.woff2) format('woff2');
  unicode-range: U+0370-03ff;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/ad1857a67a27e465-s.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
    U+01a0-01a1, U+01af-01b0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323,
    U+0329, U+1ea0-1ef9, U+20ab;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/929d7d85ea051c51-s.woff2) format('woff2');
  unicode-range: U+0100-02af, U+0304, U+0308, U+0329, U+1e00-1e9f, U+1ef2-1eff,
    U+2020, U+20a0-20ab, U+20ad-20cf, U+2113, U+2c60-2c7f, U+a720-a7ff;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(../fonts/f7a8acf8464bd548-s.p.woff2) format('woff2');
  unicode-range: U+00??, U+0131, U+0152-0153, U+02bb-02bc, U+02c6, U+02da,
    U+02dc, U+0304, U+0308, U+0329, U+2000-206f, U+2074, U+20ac, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+feff, U+fffd;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/90ce457ee8cec043-s.woff2) format('woff2');
  unicode-range: U+0460-052f, U+1c80-1c88, U+20b4, U+2de0-2dff, U+a640-a69f,
    U+fe2e-fe2f;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/fe8a99a918c9dff4-s.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045f, U+0490-0491, U+04b0-04b1, U+2116;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/bb83722ca01b414e-s.woff2) format('woff2');
  unicode-range: U+1f??;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/af9d511c7a25f62f-s.woff2) format('woff2');
  unicode-range: U+0370-03ff;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/6b30462463a75ce7-s.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
    U+01a0-01a1, U+01af-01b0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323,
    U+0329, U+1ea0-1ef9, U+20ab;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/84d4affa47fcabed-s.woff2) format('woff2');
  unicode-range: U+0100-02af, U+0304, U+0308, U+0329, U+1e00-1e9f, U+1ef2-1eff,
    U+2020, U+20a0-20ab, U+20ad-20cf, U+2113, U+2c60-2c7f, U+a720-a7ff;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(../fonts/0ac14a3c407fb3c4-s.p.woff2) format('woff2');
  unicode-range: U+00??, U+0131, U+0152-0153, U+02bb-02bc, U+02c6, U+02da,
    U+02dc, U+0304, U+0308, U+0329, U+2000-206f, U+2074, U+20ac, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+feff, U+fffd;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/c762c418d6be0c3e-s.woff2) format('woff2');
  unicode-range: U+0460-052f, U+1c80-1c88, U+20b4, U+2de0-2dff, U+a640-a69f,
    U+fe2e-fe2f;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/ce3f06ff8220f479-s.woff2) format('woff2');
  unicode-range: U+0301, U+0400-045f, U+0490-0491, U+04b0-04b1, U+2116;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/20fca0a84b06d374-s.woff2) format('woff2');
  unicode-range: U+1f??;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/2dbc97c4c2289ed4-s.woff2) format('woff2');
  unicode-range: U+0370-03ff;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/57c2f9c15684dfcb-s.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
    U+01a0-01a1, U+01af-01b0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323,
    U+0329, U+1ea0-1ef9, U+20ab;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/2c78b631c1580249-s.woff2) format('woff2');
  unicode-range: U+0100-02af, U+0304, U+0308, U+0329, U+1e00-1e9f, U+1ef2-1eff,
    U+2020, U+20a0-20ab, U+20ad-20cf, U+2113, U+2c60-2c7f, U+a720-a7ff;
}

@font-face {
  font-family: __Source_Sans_Pro;
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(../fonts/fc6fba7ce0876fef-s.p.woff2) format('woff2');
  unicode-range: U+00??, U+0131, U+0152-0153, U+02bb-02bc, U+02c6, U+02da,
    U+02dc, U+0304, U+0308, U+0329, U+2000-206f, U+2074, U+20ac, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+feff, U+fffd;
}

@font-face {
  font-family: __Source_Sans_Pro_Fallback;
  src: local('Arial');
  ascent-override: 104.41%;
  descent-override: 28.97%;
  line-gap-override: 0%;
  size-adjust: 94.24%;
}

.home-page {
  font-family: 'Poppins', sans-serif;
}

.app-page {
  font-family: __Source_Sans_Pro, __Source_Sans_Pro_Fallback, sans-serif;
  font-style: normal;
}
```

**./css/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;

    --ring: 215 20.2% 65.1%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 224 71% 4%;
    --foreground: 213 31% 91%;

    --muted: 223 47% 11%;
    --muted-foreground: 215.4 16.3% 56.9%;

    --popover: 224 71% 4%;
    --popover-foreground: 215 20.2% 65.1%;

    --card: 224 71% 4%;
    --card-foreground: 213 31% 91%;

    --border: 216 34% 17%;
    --input: 216 34% 17%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 1.2%;

    --secondary: 222.2 47.4% 11.2%;
    --secondary-foreground: 210 40% 98%;

    --accent: 216 34% 17%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 63% 31%;
    --destructive-foreground: 210 40% 98%;

    --ring: 216 34% 17%;

    --radius: 0.5rem;
  }

  ::-webkit-scrollbar {
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    @apply bg-white/[20%] rounded-md;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-white/[30%];
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
}

@layer components {
  .inactive-text {
    color: rgba(255, 255, 255, 0.6);
  }
  .custom-scrollbar {
    overflow-y: auto;
  }

  .radial-blur-circle {
    border-radius: 876px;
    background: radial-gradient(
      50% 50% at 50% 50%,
      #3a3af4 0%,
      rgba(58, 58, 244, 0) 100%
    );
    filter: blur(150px);
  }

  .radial-blur-navbar {
    border-radius: 1252px;
    opacity: 0.5;
    background: radial-gradient(
      50% 50% at 50% 50%,
      #3a3af4 0%,
      rgba(58, 58, 244, 0) 100%
    );
    filter: blur(150px);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    -webkit-text-fill-color: #fff;
    /* -webkit-box-shadow: 0 0 0px 1000px #1b1b6c inset; */
    transition: background-color 5000s ease-in-out 0s;
    @apply bg-background;
  }
}
```

**./font/\*.fonts**  
Add the necessary font files to the `./font` directory.

# Note-Taking Web App Backend Guide

This guide provides a concise overview of setting up the backend for a note-taking web application. It covers the essential steps and considerations for developers looking to build a robust backend.

## Setting Up the Express Server

**1. Create a Server Directory**

Start by creating a new directory for project server.

```bash
mkdir server
```

**2. Initialize a Node.js Project**

Navigate into the server directory and initialize a new Node.js project.

```bash
cd server
npm init -y
```

**3. Install Dependencies**

Install the necessary packages for your project.

```bash
npm install express bcryptjs cookie-parser cors dotenv jsonwebtoken multer mysql2 nodemon uuid
```

**4. Update `package.json` Scripts**

Add scripts for development and production environments.

```
"scripts": {
  "dev": "nodemon index.js",
  "start": "node index.js"
}
```

**5. Environment Variables**

Create a `.env` file to store environment variables.

```python
NODE_ENV=development #production
PORT=9000
X_CLIENT_URL=* #http://localhost:3000

DB_HOST=localhost #writer.crxbzf8ajipn.us-east-1.rds.amazonaws.com
DB_USER=root #admin
DB_KEY=root #ptqw0eLsXlbjkLME8tVZfw
DB_NAME=writer

SALT_KEY=10
JWT_SECRET=secret-key
JWT_EXPIRES_IN=7d
JWT_COOKIE_EXPIR_IN=7 # expire in 7 days
```

**6. Create Necessary Folders**

Organize your project by creating directories for controllers, public assets, routes, and uploads

```bash
mkdir controllers
mkdir public
mkdir routes
mkdir upload
```

## Database Setup

Ensure you have a database schema that includes tables for users, notes, folders, bookmarks, and shares. Define relationships between these tables as necessary.

`charset:` utf8mb4  
`collation:` utf8mb4_0900_ai_ci

**Schema Query**

```bash
DROP DATABASE IF EXISTS writer;
CREATE DATABASE writer;
USE writer;

CREATE TABLE users (
    user_id VARCHAR(45) PRIMARY KEY NOT NULL,
    username VARCHAR(45) UNIQUE NOT NULL,
    email VARCHAR(45) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE folders (
    folder_id VARCHAR(45) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(45) NOT NULL,
    CONSTRAINT f_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE notes (
    note_id VARCHAR(45) PRIMARY KEY NOT NULL,
    name VARCHAR(255) DEFAULT NULL,
    content TEXT DEFAULT NULL,
    created_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted BOOLEAN DEFAULT false,
    favorite BOOLEAN DEFAULT false,
    archive BOOLEAN DEFAULT false,
    folder_id VARCHAR(45) NOT NULL,
    CONSTRAINT n_folder_id FOREIGN KEY (folder_id) REFERENCES folders(folder_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id VARCHAR(45) NOT NULL,
    CONSTRAINT n_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE shares (
    share_id VARCHAR(45) PRIMARY KEY NOT NULL,
    note_id VARCHAR(45) UNIQUE NOT NULL,
    CONSTRAINT s_note_id FOREIGN KEY (note_id) REFERENCES notes(note_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id VARCHAR(45) NOT NULL,
    CONSTRAINT s_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE bookmarks (
    bookmark_id VARCHAR(45) PRIMARY KEY NOT NULL,
    share_id VARCHAR(45) NOT NULL,
    CONSTRAINT b_share_id FOREIGN KEY (share_id) REFERENCES shares(share_id) ON DELETE CASCADE ON UPDATE CASCADE,
    user_id VARCHAR(45) NOT NULL,
    CONSTRAINT b_user_id FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## Top Level Files

### ./db.js

```javascript
import dotenv from 'dotenv'
import mysql2 from 'mysql2'

dotenv.config()

export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_KEY,
  database: process.env.DB_NAME,
})
```

### ./index.js

```javascript
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.js'
import imgRoutes from './routes/img.js'
import userRoutes from './routes/users.js'
import folderRoutes from './routes/folders.js'
import noteRoutes from './routes/notes.js'
import sharedRoutes from './routes/share.js'
import bookmarkRoutes from './routes/bookmark.js'
import { db } from './db.js'

dotenv.config()
const app = express()

app.use(cookieParser())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

const corsOptions = {
  credentials: true, // Allow credentials (cookies) to be sent with requests for auth in each request
  methods: 'GET,POST,PUT,DELETE,PATCH,HEAD,OPTIONS', // Define allowed HTTP methods

  // Define a function to dynamically determine allowed CORS origin
  origin: function (origin, callback) {
    // Check if the request origin matches the whitelist or is null (e.g., for requests from file://)
    // if process.env.X_CLIENT_URL === '*' it means that the server will accept requests from any origin (e.g., for requests from file://) or from any domain
    // or if process.env.X_CLIENT_URL === origin it means that the server will accept requests from the specified origin only
    if (
      process.env.X_CLIENT_URL === '*' ||
      !origin ||
      process.env.X_CLIENT_URL === origin
    ) {
      callback(null, true) // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')) // Deny the request
    }
  },
}
app.use(cors(corsOptions))

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use(express.static('public/build'))
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// CLIENT ROUTES
const clientResponse = (req, res, next) => {
  let filePath = path.join(__dirname, 'public', 'build', 'index.html')
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath)
  } else {
    res.send(
      "<span style='font-size:4rem;'><em>I'm sorry, but the page you were looking for does not exist.</em></span>"
    )
  }
}
const routes = ['/', '/login', '/register', '/app', '/app/*']
routes.forEach((route) => {
  app.get(route, clientResponse)
})

// SERVER ROUTES
app.use('/img', imgRoutes) // special route in server
app.get('/api/test', (req, res) => {
  const q = `SELECT favorite FROM notes`

  db.query(q, (err, data) => {
    return res.status(200).json(data)
  })
})
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/folders', folderRoutes)
app.use('/api/notes', noteRoutes)
app.use('/api/shares', sharedRoutes)
app.use('/api/bookmarks', bookmarkRoutes)

// Error handling
if (process.env.NODE_ENV !== 'development') {
  app.use((req, res, next) => {
    const error = new Error('Not found!')
    error.status = 404
    next(error)
  })
  app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.status || 500)
    res.json('something broke!')
  })
} else {
  app.use('*', clientResponse)
}

app.listen(process.env.PORT || 9000, () => {
  console.log('Connected!')
})
```

## Routes Files

### routes/auth.js

```javascript
import express from 'express'
import { verify, register, login, logout } from '../controllers/auth.js'

const router = express.Router()

router.post('/', verify)
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)

export default router
```

### routes/bookmarks.js

```javascript
import express from 'express'
import {
  getBookmarks,
  getBookmark,
  addBookmark,
  deleteBookmark,
} from '../controllers/bookmarks.js'

const router = express.Router()

router.get('/', getBookmarks)
router.get('/:id', getBookmark)
router.post('/', addBookmark)
router.delete('/:id', deleteBookmark)

export default router
```

### routes/folder.js

```javascript
import express from 'express'
import {
  getFolders,
  getFolder,
  addFolder,
  deleteFolder,
  updateFolder,
} from '../controllers/folder.js'

const router = express.Router()

router.get('/', getFolders)
router.get('/:id', getFolder)
router.post('/', addFolder)
router.delete('/:id', deleteFolder)
router.put('/:id', updateFolder)

export default router
```

### routes/img.js

```javascript
import express from 'express'
import { saveFile, addImg, getImg } from '../controllers/img.js'

const router = express.Router()

router.get('/:filename', getImg)
router.post('/', saveFile, addImg)

export default router
```

### routes/notes.js

```javascript
import express from 'express'
import {
  getNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
} from '../controllers/notes.js'

const router = express.Router()

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', addNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

export default router
```

### routes/shares.js

```javascript
import express from 'express'
import {
  getShares,
  getShare,
  addShare,
  deleteShare,
} from '../controllers/shares.js'

const router = express.Router()

router.get('/', getShares)
router.get('/:id', getShare)
router.post('/', addShare)
router.delete('/:id', deleteShare)

export default router
```

### routes/users.js

```javascript
import express from 'express'
import { updateUser } from '../controllers/user.js'

const router = express.Router()

router.put('/', updateUser)

export default router
```

## Controllers Files

### controllers/auth.js

```javascript
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'

dotenv.config()
const { NODE_ENV, SALT_KEY, JWT_SECRET, JWT_EXPIRES_IN, JWT_COOKIE_EXPIR_IN } =
  process.env

export const verify = (req, res) => {
  const token = req.cookies?.access_token

  if (!token) return res.json({ msg: 'Not authenticated', status: 401 })

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.json({ msg: 'Token is not valid!', status: 403 })

    return res.json({
      user_id: userInfo.user_id,
      msg: 'Succesfully authenticated!',
      status: 200,
    })
  })
}

export const register = (req, res) => {
  //CHECK EXISTING USER
  const q = 'SELECT * FROM users WHERE email = ? OR username = ?'

  req.body.email = req.body.email.toLowerCase()
  req.body.username = req.body.username.toLowerCase()

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json('Internal server error!')

    if (data.length) return res.status(409).json('User already exists!')

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(Number(SALT_KEY))
    const hash = bcrypt.hashSync(req.body.password, salt)

    const q =
      'INSERT INTO users(`user_id`,`username`,`email`,`password`) VALUES (?)'
    const values = [uuidv4(), req.body.username, req.body.email, hash]

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json('Internal server error!')

      return res.status(200).json('Succesfully registered!')
    })
  })
}

export const login = (req, res) => {
  //CHECK USER

  const q = 'SELECT * FROM users WHERE email = ? OR username = ?'

  req.body.user = req.body?.user?.toLowerCase()

  if (!req.body.user || !req.body.password)
    return res.status(400).json('Wrong username/email or password!')

  db.query(q, [req.body.user, req.body.user], (err, data) => {
    if (err) return res.status(500).json('Internal server error!')
    if (data.length === 0) return res.status(404).json('User not found!')

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    )

    if (!isPasswordCorrect)
      return res.status(400).json('Wrong username/email or password!')

    const token = jwt.sign({ user_id: data[0].user_id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })
    const { password, ...other } = data[0]

    const cookieOptions = {
      httpOnly: true,
      expires: new Date(
        new Date().setDate(new Date().getDate() + Number(JWT_COOKIE_EXPIR_IN))
      ),
    }
    // if (NODE_ENV === 'production') cookieOptions.secure = true

    res
      .cookie('access_token', token, cookieOptions)
      .status(200)
      .json({ ...other, msg: 'Succesfully logged in!' })
  })
}

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been logged out.')
}
```

### controllers/bookmarks.js

```javascript
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'

import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

// note: share_id in bookmarks table can not be unique because one shared note can be bookmarked by multiple users
export const getBookmarks = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    // get all bookmarks and shared, notes except favorite, folder_name, archive details where shares share_id = bookmarks share_id and  shares note_id = notes note_id and shares user_id = user_id and notes deteled = 0

    // note: n.user_id and s.user_id will always same
    const q = `SELECT
                    b.bookmark_id,
                    s.share_id,
                    n.note_id,
                    n.name,
                    n.content,
                    n.created_date,
                    n.deleted,
                    n.user_id
                FROM
                    bookmarks AS b
                JOIN
                    shares AS s
                ON
                    b.share_id = s.share_id
                JOIN
                    notes AS n
                ON
                    s.note_id = n.note_id
                WHERE
                    n.deleted = 0
                AND
                    b.user_id = ?
                ORDER BY
                    n.created_date DESC
                    `
    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data)
    })
  })
}

// useless function for now but may be useful in future so keeping it here for now :)
export const getBookmark = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q =
      'SELECT b.bookmark_id, n.note_id, s.share_id, n.name, n.content, n.created_date, n.deleted, n.user_id FROM bookmarks b JOIN shares s ON b.share_id = s.share_id JOIN notes n ON s.note_id = n.note_id WHERE n.deleted = 0 AND b.bookmark_id = ? AND b.user_id = ?'

    db.query(q, [req.params.id, userInfo.user_id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('No bookmark found!')

      return res.status(200).json(data[0])
    })
  })
}

export const addBookmark = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const _q = 'SELECT * FROM bookmarks WHERE `share_id` = ? AND `user_id` = ?'
    const q =
      'INSERT INTO bookmarks(`bookmark_id`, `share_id`,`user_id`) VALUES (?, ?, ?)'

    const id = uuidv4()
    const values = [req.body.share_id, userInfo.user_id]

    // check if the share_id is already shared or not for current user if not then add it to shared table and return the shared id

    db.query(_q, values, (_err, _data) => {
      if (_err) {
        return res.status(500).json(_err)
      }

      if (_data.length > 0) {
        return res.json({
          msg: 'Note is already bookmark.',
          bookmark_id: _data[0].bookmark_id,
        })
      } else {
        db.query(q, [id, ...values], (err, data) => {
          if (err) {
            return res.status(500).json(err)
          }

          console.log('Bookmark has been created.')
          return res.json({
            msg: 'Bookmark has been created.',
            bookmark_id: id,
          })
        })
      }
    })
  })
}

export const deleteBookmark = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const bookmark_id = req.params.id
    const q = 'DELETE FROM bookmarks WHERE `bookmark_id` = ? AND `user_id` = ?'

    db.query(q, [bookmark_id, userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can delete only your bookmark!')

      return res.json('bookmark has been deleted!')
    })
  })
}
```

### controllers/folder.js

```javascript
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'
import { checkAndDeleteImg } from './img.js'
import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

export const getFolders = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'SELECT folder_id, name FROM folders WHERE `user_id` = ?'

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('Something went wrong!')

      return res.status(200).json(data)
    })
  })
}

// usless function
export const getFolder = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')
    const q =
      'SELECT folder_id, name, created_date FROM folders WHERE `folder_id` = ? AND user_id = ?'

    db.query(q, [req.params.id, userInfo.user_id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('You can get only your folders!')

      return res.status(200).json(data[0])
    })
  })
}

export const addFolder = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'INSERT INTO folders(`folder_id`,`name`, `user_id`) VALUES (?)'
    const folderId = uuidv4() // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

    const values = [folderId, req.body.name, userInfo.user_id]

    if (req.body.name === '') return res.status(403).json('Name is required!')

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json('Internal server error')

      return res
        .status(200)
        .json({ msg: 'Succesfully created.', folder_id: folderId })
    })
  })
}

export const deleteFolder = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const folderId = req.params.id
    const q = 'DELETE FROM folders WHERE `folder_id` = ? AND `user_id` = ?'

    // get content from all notes from folder
    const qNotes = 'SELECT note_id, content FROM notes WHERE folder_id = ?'
    const oldcontent = []

    db.query(qNotes, [folderId], (_err, _data) => {
      if (_err) return res.status(500).json('Internal server error')

      _data.forEach((note) => {
        let cur = note.content
        oldcontent.push(cur ? cur : '')
      })

      // delete notes from folder
      db.query(q, [folderId, userInfo.user_id], (err, data) => {
        if (err)
          return res.status(403).json('Something went wrong! Try again later.')

        try {
          // delete images from folder
          oldcontent.forEach((content) => {
            checkAndDeleteImg(content, '')
          })
        } catch (err) {
          return res.status(500).json('Internal server error')
        }

        return res.status(200).json({ msg: 'Succesfully deleted.' })
      })
    })
  })
}

export const updateFolder = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const folderId = req.params.id
    const q =
      'UPDATE folders SET `name`=? WHERE `folder_id` = ? AND `user_id` = ?'

    db.query(q, [req.body.name, folderId, userInfo.user_id], (err, data) => {
      if (err) return res.status(500).json('Internal server error')

      return res.status(200).json({ msg: 'Succesfully updated.' })
    })
  })
}
```

### controllers/img.js

```javascript
import multer from 'multer'
import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
// import axios from 'axios'

const __dirname = dirname(fileURLToPath(import.meta.url))

const absoluteImagePath = (filename) => {
  return path.join(__dirname, '..', 'upload', filename)
}

const downloadErrorGif = async (errorGifPath) => {
  // try {
  //   const response = await axios.get(
  //     'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzNlYzBtdWljd2wwdjNmZjh0bG9tYTh3aXoycDhtOG1kaHlhcm5vMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.gif',
  //     {
  //       responseType: 'arraybuffer',
  //     }
  //   )
  //   fs.writeFileSync(errorGifPath, response.data)
  //   console.log('Error GIF image downloaded and saved successfully.')
  // } catch (error) {
  //   console.error('Error downloading or saving the error GIF image:', error)
  // }
}

/*  -------------------------------------------------------
 * [GetImg] - Main Start
 *  ------------------------------------------------------- */
export const getImg = (req, res) => {
  // Construct the absolute path to the image file based on the filename parameter
  const filename = req.params.filename
  const ImagePath = absoluteImagePath(filename)

  // Serve the image using the res.sendFile method
  res.sendFile(ImagePath, (err) => {
    if (err) {
      // Construct the absolute path to the error GIF file
      const errorGifPath = path.join(__dirname, '..', 'upload', 'error.gif') // Adjust the path as needed

      // if errorGifPath not found, then download from internet and save it to the upload folder with 'error.gif' name and then use it

      if (!fs.existsSync(errorGifPath)) {
        downloadErrorGif(errorGifPath)
      }

      // Send the GIF image as a response with a 404 status
      res.status(404).sendFile(errorGifPath, (err) => {
        if (err) {
          console.error('Error sending GIF image:', err)
          res.status(500).send('Internal Server Error')
        }
      })
    }
  })
}
/*  -------------------------------------------------------
 * [GetImg] - Main End
 *  ------------------------------------------------------- */

const replaceSpecialCharactersWithUnderscore = (inputString) => {
  // Use a regular expression to replace all special characters with '_'
  return inputString.replace(/[^a-zA-Z0-9]/g, '_')
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload')
  },
  filename: function (req, file, cb) {
    const filenameArray = file.originalname.split('.')
    cb(
      null,
      Date.now() +
        replaceSpecialCharactersWithUnderscore(
          filenameArray.slice(0, filenameArray.length - 1).join('')
        ) +
        '.' +
        filenameArray[filenameArray.length - 1]
    )
  },
})

/*  -------------------------------------------------------
 * [SaveFile, AddImg] - Main Start
 *  ------------------------------------------------------- */
export const saveFile = multer({ storage }).single('file')

export const addImg = (req, res) => {
  if (req.file === undefined) return res.status(200).json(null)

  const filenameArray = req.file.filename.split('.')

  const filename =
    replaceSpecialCharactersWithUnderscore(
      filenameArray.slice(0, filenameArray.length - 1).join('')
    ) +
    '.' +
    filenameArray[filenameArray.length - 1]

  console.log('File added: ' + filename)
  res.status(200).json(filename)
}
/*  -------------------------------------------------------
 * [SaveFile, AddImg] - Main End
 *  ------------------------------------------------------- */

const deleteImg = (filename) => {
  if (filename === null || filename === undefined) return

  // Construct the absolute path to the image file based on the filename parameter
  const ImagePath = absoluteImagePath(filename)

  // Check if the file exists before attempting to delete it
  if (fs.existsSync(ImagePath)) {
    // Delete the file
    fs.unlink(ImagePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err)
      } else {
        console.log('File deleted: ', filename)
      }
    })
  } else {
    console.error('File does not exist.')
  }
}

export const checkAndDeleteImg = (oldcontent, newContent) => {
  // get array of img src from old content
  const regex = /<img[^>]+src="([^">]+)"/g
  const oldImgs = []
  let match
  while ((match = regex.exec(oldcontent))) {
    oldImgs.push(match[1])
  }

  // get array of img src from new content
  const newImgs = []
  while ((match = regex.exec(newContent))) {
    newImgs.push(match[1])
  }

  // get array of img src that need to be deleted
  const imgsToDelete = oldImgs.filter((img) => !newImgs.includes(img))

  // remove img element from imgsToDelete array that contains 'http://' or 'https://'
  const imgsToDelete2 = imgsToDelete.filter(
    (img) => !img.includes('http://') && !img.includes('https://')
  )

  // delete img from server using filename
  imgsToDelete2.forEach((img) => {
    deleteImg(img.split('/')[img.split('/').length - 1])
  })
}
```

### controllers/notes.js

```javascript
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'
import { checkAndDeleteImg } from './img.js'

import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

// Get and Add notes
export const getNotes = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = `SELECT note_id, name, content, created_date, deleted, archive, favorite, folder_id FROM notes WHERE user_id = ? ORDER BY created_date DESC`

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data)
    })
  })
}

export const getNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = `SELECT note_id, name, content, created_date, deleted, archive, favorite, folder_id FROM notes WHERE note_id = ? AND user_id = ?`

    db.query(q, [req.params.id, userInfo.user_id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data[0])
    })
  })
}

export const addNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q =
      'INSERT INTO notes(`note_id`,`name`, `content`, `folder_id`, `user_id`) VALUES (?)' // `deleted`, `favorite`, `archive`,

    const values = [
      uuidv4(), // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
      req.body.name,
      `${req.body.content}`,
      req.body.folder_id,

      // req.body.deleted || false,
      // req.body.favorite || false,
      // req.body.archive || false,

      userInfo.user_id,
    ]

    if (req.body.name === '')
      return res.status(403).json('Name cannot be empty!')

    db.query(q, [values], (err, data) => {
      console.log(err)
      if (err) return res.status(500).json(err)

      return res.status(200).json('Note has been created.')
    })
  })
}

// delete note
export const deleteNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const noteId = req.params.id
    const q = 'DELETE FROM notes WHERE note_id = ? AND user_id = ?'

    // get note content
    const q2 = 'SELECT content FROM notes WHERE note_id = ? AND user_id = ?'
    let oldContent = ''

    db.query(q2, [noteId, userInfo.user_id], (_err, _data) => {
      if (_err) {
        console.log(_err)
        return res.status(500).json(_err)
      }

      oldContent = _data[0]?.content

      db.query(q, [noteId, userInfo.user_id], (err, data) => {
        if (err) return res.status(500).json(err)

        try {
          checkAndDeleteImg(oldContent ? oldContent : '', '')
        } catch (error) {
          console.log(error)
          return res.status(500).json(error)
        }

        return res.status(200).json('Note has been deleted.')
      })
    })
  })
}

// update note
export const updateNote = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const noteId = req.params.id
    const name = {
      value: req.body.name,
      bool: req.body.name ? req.body.name !== '' : false,
    }
    const content = {
      value: req.body.content,
      bool: req.body.content ? true : false,
    }
    const folderId = {
      value: req.body.folder_id,
      bool: req.body.folder_id ? true : false,
    }
    const archive = {
      value: req.body.archive,
      bool: req.body.archive !== undefined ? true : false,
    }
    const favorite = {
      value: req.body.favorite,
      bool: req.body.favorite !== undefined ? true : false,
    }
    const deleted = {
      value: req.body.deleted,
      bool: req.body.deleted !== undefined ? true : false,
    }

    const q = `UPDATE notes SET ${name.bool ? '`name` = ?' : ''}
    ${content.bool ? (name.bool ? ',' : '') + ` content = ?` : ''}
    ${
      folderId.bool
        ? (name.bool || content.bool ? ',' : '') + ` folder_id = ?`
        : ''
    }
    ${
      archive.bool
        ? (name.bool || content.bool || folderId.bool ? ',' : '') +
          ` archive = ?`
        : ''
    }
    ${
      favorite.bool
        ? (name.bool || content.bool || folderId.bool || archive.bool
            ? ','
            : '') + ` favorite = ?`
        : ''
    }
    ${
      deleted.bool
        ? (name.bool ||
          content.bool ||
          folderId.bool ||
          archive.bool ||
          favorite.bool
            ? ','
            : '') + ` deleted = ?`
        : ''
    }
    WHERE note_id = ? AND user_id = ?`

    const newContent = `${req.body.content}`
    const values = [
      name.bool && `${name.value}`,
      content.bool && `${content.value}`,
      folderId.bool && folderId.value,
      archive.bool && archive.value,
      favorite.bool && favorite.value,
      deleted.bool && deleted.value,
      noteId,
      userInfo.user_id,
    ].filter(function (item) {
      return item !== false
    }) // remove undefined (false) values

    if (name.bool && req.body.name === '')
      return res.status(403).json('Name cannot be empty!')

    const q2 = 'SELECT content FROM notes WHERE note_id = ? AND user_id = ?'
    let oldContent = ''
    db.query(q2, [noteId, userInfo.user_id], (_err, _data) => {
      if (_err) {
        console.log(_err)
        return res.status(500).json("Internal server error. Can't update note.")
      }

      oldContent = _data[0]?.content
      db.query(q, [...values, noteId, userInfo.user_id], (err, data) => {
        if (err) {
          console.log(err)
          return res
            .status(500)
            .json("Internal server error. Can't update note.")
        }

        try {
          checkAndDeleteImg(oldContent ? oldContent : '', newContent)
        } catch (error) {
          console.log(error)
          return res
            .status(500)
            .json("Internal server error. Can't update note.")
        }

        return res.json('Note has been updated.')
      })
    })
  })
}
```

### controllers/shares.js

```javascript
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../db.js'
import { checkAndDeleteImg } from './img.js'

import dotenv from 'dotenv'

dotenv.config()
const { JWT_SECRET } = process.env

export const getShares = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q = 'SELECT * FROM shares WHERE user_id = ?'

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can view only your notes!')

      return res.status(200).json(data)
    })
  })
}

export const getShare = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const q =
      'SELECT s.share_id, n.note_id , name, content, folder_id, n.created_date, deleted, n.user_id FROM shares s JOIN notes n ON s.note_id = n.note_id WHERE s.share_id = ?'

    // not added - favorite, folder_id, archive, folder_name

    db.query(q, [req.params.id], (err, data) => {
      if (err || data.length === 0)
        return res.status(403).json('No shared note found!')

      return res.status(200).json(data[0])
    })
  })
}

export const addShare = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const _q = 'SELECT * FROM shares WHERE `note_id` = ? AND `user_id` = ?'
    const q =
      'INSERT INTO shares(`share_id`, `note_id`,`user_id`) VALUES (?, ?, ?)'

    const id = uuidv4()
    const values = [req.body.note_id, userInfo.user_id]

    // check if the note is already shared or not if not then add it to shared table and return the shared id

    db.query(_q, values, (_err, _data) => {
      if (_err) {
        return res.status(500).json(_err)
      }

      if (_data.length > 0) {
        return res.json({
          msg: 'Note is already shared.',
          share_id: _data[0].share_id,
        })
      } else {
        db.query(q, [id, ...values], (err, data) => {
          if (err) {
            return res.status(500).json(err)
          }

          return res.json({
            msg: 'Shared note has been created.',
            share_id: id,
          })
        })
      }
    })
  })
}

export const deleteShare = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authenticated!')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) return res.status(403).json('Token is not valid!')

    const share_id = req.params.id
    const q = 'DELETE FROM shares WHERE `share_id` = ? AND `user_id` = ?'

    db.query(q, [share_id, userInfo.user_id], (err, data) => {
      if (err) return res.status(403).json('You can delete only your note!')

      return res.json('Note has been deleted!')
    })
  })
}
```

### controllers/users.js

```javascript
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from '../db.js'

dotenv.config()
const { JWT_SECRET } = process.env

export const updateUser = (req, res) => {
  const token = req.cookies.access_token

  if (!token) return res.status(401).json('Not authenticated')

  jwt.verify(token, JWT_SECRET, (err, userInfo) => {
    if (err) {
      return res.status(403).json('Token is not valid!')
    }

    const q = 'SELECT * from users WHERE user_id = ?'

    db.query(q, [userInfo.user_id], (err, data) => {
      if (err || data.length === 0) {
        return res.status(403).json('User does not exist!')
      }

      const isPasswordCorrect = bcrypt.compareSync(
        req.body.currentPassword,
        data[0].password
      )

      if (!isPasswordCorrect) {
        return res
          .status(403)
          .json({ msg: 'Password is not correct!', status: 403 })
      }

      const q = 'UPDATE users SET `password` = ? WHERE `user_id` = ?'

      const salt = bcrypt.genSaltSync(10)
      const hash =
        req.body.password !== ''
          ? bcrypt.hashSync(req.body.password, salt)
          : data[0].password

      const values = [hash, userInfo.user_id]

      db.query(q, values, (err, newData) => {
        if (err) {
          return res.status(500).json(err)
        }

        return res
          .status(200)
          .json({ msg: 'Updated successfully!', status: 200 })
      })
    })
  })
}
```
