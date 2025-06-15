import React from "react";

export default function Modal({onClose}) {
    return(
        <>
            <div className='backdrop' onClick={onClose}>
                <dialog className='modal' open> 

                </dialog>
                
            </div>
        
        </>
    )
}