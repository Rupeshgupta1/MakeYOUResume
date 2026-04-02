import React from 'react'

const Title = ({title,description}) => {
  return (
    <div className='text-center mt-10 text-slate-700'>
      <h2 className='ttext-3xl sm:text-4xl font-medium text-center leading-snug tracking-tight'>{title}</h2>
      <p className='max-sm max-w-2xl mt-4  text-1xl text-slate-500'>{description}</p>
    </div>
  )
}

export default Title
