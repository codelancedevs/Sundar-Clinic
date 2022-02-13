/**
 * Verify User Account With Information sent in Email
 */

// Dependencies
import React from 'react'
import { useParams } from 'react-router-dom'

function VerifyAccount() {
    const params = useParams();
    console.log(params)
    return (
        <div className='w-full h-full'>VerifyAccount</div>
    )
}

export default VerifyAccount