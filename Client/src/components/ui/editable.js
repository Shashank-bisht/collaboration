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
