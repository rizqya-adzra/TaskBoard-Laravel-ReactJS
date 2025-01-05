import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import TextArea from './TextArea';
import SaveButton from './SaveButton';
import Label from './Label';
import Button from './Button';
import { showToast } from './ToastNotification';
import axios from 'axios';
import CardIcon from './CardIcon';
import DropdownMenu from './DropdownMenu';
import ColorOption from './ColorOption';
import TextEditor from './TextEditor';

const ModalDynamic = ({
    visible,
    title,
    subTitle,
    onClose,
    placeholderName,
    placeholderDesc,
    cardId,
    refreshCards,
    positionOptions,
    initialPosition,
    handlePositionChange,
    cardColor
}) => {
    if (!visible) return null;

    const [name, setName] = useState(placeholderName || '');
    const [description, setDescription] = useState(placeholderDesc || '');
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [color, setColor] = useState(cardColor || '');
    const [memberId, setMemberId] = useState('');
    const [selectedPosition, setSelectedPosition] = useState(initialPosition);
    const [isColorOptionVisible, setIsColorOptionVisible] = useState(false);
    const [iconPosition, setIconPosition] = useState(null);
    const [position, setPosition] = useState({ left: 0, top: 0 });

    const DescriptionDisplay = ({ description }) => {
        return (
            <div className="p-2 border text-sm rounded-md bg-gray-100">
                {description ? (
                    <div className="list-disc list-inside">
                        {ReactHtmlParser(description)}
                    </div>
                ) : (
                    'Tidak ada deskripsi'
                )}
            </div>
        );
    };

    useEffect(() => {
        setSelectedPosition(initialPosition);
    }, [initialPosition]);

    useEffect(() => {
        if (isColorOptionVisible && iconPosition) {
            const rect = iconPosition.getBoundingClientRect();
            setPosition({
                left: rect.right + 10,
                top: rect.top,
            });
        }
    }, [isColorOptionVisible, iconPosition]);

    const onPositionChange = (newPosition) => {
        setSelectedPosition(newPosition);
        handlePositionChange(newPosition);
    };

    const handleSave = async () => {
        try {
            await axios.put(`/api/kanban/card/put/${cardId}`, {
                name,
                description,
                color,
                member_id: memberId,
                position: selectedPosition,
            });
            showToast('Berhasil diubah', 'success');
            refreshCards();
            onClose();
        } catch (error) {
            console.error('Error', error);
            showToast('Gagal menyimpan perubahan', 'failed');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/kanban/card/delete/${cardId}`);
            showToast('Card berhasil dihapus', 'success');
            refreshCards();
            onClose();
        } catch (error) {
            console.error('Error', error);
            showToast('Gagal menghapus card', 'failed');
        }
    };

    const toggleColorOption = (e) => {
        setIconPosition(e.target);
        setIsColorOptionVisible(!isColorOptionVisible);
    };

    const handleColorSelect = (selectedColor) => {
        setColor(selectedColor); // Update the selected color
        setIsColorOptionVisible(false); // Close the color picker
    };

    return (
        <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 overflow-auto"
            onClick={onClose}
        >
            <div
                className="bg-white min-h-[70vh] max-w-[100vh] rounded-lg p-6 w-full space-y-6"
                onClick={(e) => e.stopPropagation()}
                style={color ? { borderTop: `5vh solid ${color}` } : {}}
            >
                <div className="flex flex-col space-y-2">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    {subTitle && <h3 className="text-gray-500 text-sm">{subTitle}</h3>}
                </div>

                <div className="grid grid-cols-12 gap-9">
                    <div className="col-span-9">
                        <div>
                            <Label labelName="Nama Card" />
                            <InputField value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="mt-3 max-h-[50vh]">
                            <Label labelName="Deskripsi Card" />
                            {isEditingDescription ? (
                                <>
                                    <TextEditor
                                        value={description}
                                        onChange={(content) => setDescription(content)}
                                        placeholder="Tambahkan deskripsi..."
                                    />
                                    <div className="flex justify-end mt-2">
                                        <Button
                                            onClick={() => setIsEditingDescription(false)}
                                            buttonName="Batal"
                                        />
                                        <SaveButton
                                            onClick={handleSave}
                                            buttonName="Simpan"
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="p-2 border text-sm rounded-md bg-gray-100">
                                    {description ? (
                                        <div className='list-disc list-inside' dangerouslySetInnerHTML={{ __html: description }} />
                                    ) : (
                                        'Tidak ada deskripsi'
                                    )}
                                </div>
                            )}
                            {!isEditingDescription && (
                                <Button
                                    onClick={() => setIsEditingDescription(true)}
                                    buttonName="Edit"
                                    className="mt-4"
                                />
                            )}
                        </div>
                        <div className="mt-3">
                            <div className="flex space-x-4">
                                <div className="flex-col">
                                    <Label labelName="Posisi List" />
                                    <DropdownMenu
                                        items={positionOptions}
                                        name={positionOptions.find(item => item.value === selectedPosition)?.label || 'Pilih Posisi'}
                                        onSelect={(item) => onPositionChange(item.value)}
                                    />
                                </div>
                                <div className="flex-col">
                                    <Label labelName="Posisi" />
                                    <DropdownMenu
                                        items={positionOptions}
                                        name={positionOptions.find(item => item.value === selectedPosition)?.label || 'Pilih Posisi'}
                                        onSelect={(item) => onPositionChange(item.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3 flex flex-col items-start justify-start space-y-2">
                        <CardIcon
                            svg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                            </svg>}
                            name="Warna"
                            onClick={toggleColorOption}
                        />
                        <CardIcon
                            svg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                            </svg>}
                            name="Gabung"
                        />
                        <CardIcon
                            svg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>}
                            name="Hapus"
                            onClick={handleDelete}
                        />
                    </div>
                </div>

                <div className="flex justify-between space-x-4">
                    <Button onClick={onClose} buttonName="Batal" />
                    <SaveButton onClick={handleSave} buttonName="Simpan" />
                </div>
            </div>

            {isColorOptionVisible && (
                <ColorOption
                    onColorSelect={handleColorSelect}
                    onClose={toggleColorOption}
                    position={position}
                />
            )}
        </div>
    );
};

export default ModalDynamic;
