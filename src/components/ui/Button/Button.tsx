import React from 'react'
import s from './b.module.scss'

import clsx from 'clsx'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  ref?: React.ForwardedRef<HTMLButtonElement>
}

function Button({ children, className, ref, ...props }: ButtonProps) {
  return (
    <button ref={ref} className={clsx(s.button, className)} {...props}>
      {children}
    </button>
  )
}
export default Button
