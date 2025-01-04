import React, { useRef, useEffect } from 'react'
import InputField from './InputField'
import TextArea from './TextArea'
import SaveButton from './SaveButton'
import CancelButton from './CancelButton'

const AddCard = ({ newCard, setNewCard, description, setDescription, onAddCard, onCancel }) => {
    const inputRef = useRef(null)

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            onAddCard()
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                onCancel()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onCancel])

    return (
        <div
            className="add-card-section flex flex-col gap-3 mt-4"
            ref={inputRef} 
        >
            <InputField 
                value={newCard}
                placeholder="Masukan nama Card"
                onChange={(e) => setNewCard(e.target.value)}
                onKeyPress={handleKeyPress}
            />

            <TextArea 
                placeholder="Masukan deskripsi (opsional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyPress={handleKeyPress}
            />

            <div className="flex gap-3">
                <SaveButton 
                    onClick={onAddCard} 
                    buttonName='Simpan'
                />
                <CancelButton onClick={onCancel} />
            </div>
        </div>
    )
}

export default AddCard
