import React, { useState, useRef, useEffect } from 'react'
import SaveButton from './SaveButton'
import CancelButton from './CancelButton'
import InputField from './InputField'
import AddNewButton from './AddNewButton'
import { showToast } from './ToastNotification'

const AddList = ({ onAddList }) => {
    const [newListTitle, setNewListTitle] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const inputRef = useRef(null)

    const handleAddClick = () => {
        if (!newListTitle.trim()) {
            showToast('Nama List tidak boleh kosong', 'failed')
            return
        }
        onAddList(newListTitle)
        setNewListTitle('')
        setIsAdding(false)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddClick()
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsAdding(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="rounded-lg w-80 flex flex-col flex-wrap ">
            {isAdding ? (
                <div
                    className="list p-4 rounded-lg w-80 bg-white shadow-lg flex flex-col h-fit"
                    ref={inputRef}
                >
                    <InputField 
                        placeholder="Tambah nama list"
                        value={newListTitle}
                        onChange={(e) => setNewListTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <div className="flex gap-3 mt-3">
                        <SaveButton 
                            onClick={handleAddClick}
                            buttonName='Tambahkan'
                        />
                        <CancelButton onClick={() => setIsAdding(false)} />
                    </div>
                </div>
            ) : (
                <AddNewButton 
                    onClick={() => setIsAdding(true)}
                    AddName="Tambah List baru +"
                />
            )}
        </div>
    )
}

export default AddList
