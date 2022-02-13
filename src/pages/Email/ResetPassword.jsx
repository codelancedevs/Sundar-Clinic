/**
 * Reset User Password With Information sent in Email
 */

// Dependencies
import React from 'react'
import { useParams } from 'react-router-dom'

function ResetPassword() {
    const params = useParams();
    console.log(params)
    return (
        <div className='w-full h-full'>ResetPassword</div>
    )
}

export default ResetPassword