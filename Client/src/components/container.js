import React, { PropsWithChildren } from 'react'

function Container({ children, className }) {
  return <div className={`px-[30px] py-[30px] ${className}`}>{children}</div>
}

export default Container
