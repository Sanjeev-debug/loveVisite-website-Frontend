import React from 'react'
import './Alert.css'
import { useSelector } from 'react-redux'

const Alert = () => {
      
    const {error}=useSelector((state)=>state.data);
    console.log(error)

    return (
        <>
            <div className='alertMain' >
                <div className="alert">
                    <div className="alert alert-danger" role="alert">
                   {error}
                </div>
                </div>
            </div>
        </>
    )
}

export default Alert