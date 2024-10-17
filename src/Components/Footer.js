import React from 'react'

function Footer() {
    const todayDtea=new Date().getFullYear()
  return (
    <footer><div className='flex justify-content-center bg-blue-500'>
        <p className='text-color-secondary'> All Rights Resrved {todayDtea}</p>
    </div></footer>
  )
}

export default Footer;