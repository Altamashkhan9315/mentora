import React from 'react'

const CoverLetterId = async({params}) => {
    const id=await params.id;
  return (
    <div className='mt-28 mx-auto text-center'>
      CoverLetter:{id}
    </div>
  )
}

export default CoverLetterId
