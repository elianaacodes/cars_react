import React from 'react'
import CarInfo from './CarInfo';
// import Background from '../assets/images/';

type Props = {
    id?: string[];
    open: boolean;
    onClose: () => void;
}

const Modal = ( props: Props ) => {
    if ( !props.open ) return (<></>);
    return (
        <div 
            // style={{ backgroundImage: `url(${Background})`}}
            onClick={ props.onClose } 
            className='fixed left-0 top-0 overflow-y-auto overflow-x-hidden outline-none w-full h-auto flex overflow-auto  justify-center align-middle bg-gray-700 bg-opacity-25'
        >
            <div
                className='flex flex-shrink-0 max-w-300px w-auto h-auto fixed  z-1 mt-10 bg-white shadow-xl rounded'
                onClick={(e) => {
                    e.stopPropagation()
                }}    
            >
                <div className="w-auto h-auto flex flex-col justify-items-center bg-contain">
                    <div className="flex flex-row space-apart">
                        <button className="flex justify-center m-2 bg-slate-100 p-3 rounded hover:bg-slate-900 text-black hover:text-white"
                        onClick={props.onClose}>
                            <i className="fa-sharp fa-regular fa-circle-xmark fa-lg"></i>
                            X
                        </button>
                    </div>
                    <div className="flex flex-col items-center text-center m-3 p-2">
                        <CarInfo id={ props.id }/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal