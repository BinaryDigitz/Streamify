import React from 'react'

function Logo({ variant }) {
    const size = variant ==='small' ? 'text-2xl'  : 'text-4xl'
  return (
    <p className={`font-bold ${size}`}>
      LOGO
    </p>
  )
}

export default Logo
