import React from 'react'
import InputField from './InputField'
import TextArea from './TextArea'
import SaveButton from './SaveButton'
import SwatchIcon from '../assets/SwatchIcon'
import UserIcon from '../assets/UserIcon'

const   ModalDynamic = ({ visible, title, subTitle, name1, name2, onClose, onConfirm, placeholder }) => {
    if(!visible) return null

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex flex-col justify-center items-center z-50'>
            <div className='bg-white flex-col justify-between rounded-lg p-6 max-w-md w-full'>
                <div className='flex justify-between gap-4 items-center'>
                <h2 className='text-xl font-semibold mb-4'>{title}</h2>
                <h2 className='mb-4'>{subTitle}</h2>
                </div>
            <div className='row-auto'>
                <div className='grid col-span-9 gap-4'>
                    <InputField
                        placeholder={placeholder}
                    />
                    <TextArea
                        placeholder={placeholder}

                    />
                    <h3 className=''></h3>
                    <InputField
                        placeholder={placeholder}
                    />
                </div>
                <div className='grid col-span-3'> 
                    <SwatchIcon 
                        name={name1}
                    />
                    <UserIcon 
                        name={name2}
                    />
                </div>
            </div>
            <div className='flex justify-between'>
                <SaveButton
                    onClick={onClose}
                    buttonName="Batal"
                />
                <SaveButton
                    onClick={onConfirm}
                    buttonName="Simpan"
                />
            </div>
        </div>
        </div>

  )
}

export default ModalDynamic