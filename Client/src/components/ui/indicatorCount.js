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
