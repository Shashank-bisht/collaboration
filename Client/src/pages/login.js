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

    if (!loginInputs.user || !loginInputs.password) {
      setLoginMsg({
        style: 'tomato',
        msg: 'please fill all fields',
      })
      return
    }

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
