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
