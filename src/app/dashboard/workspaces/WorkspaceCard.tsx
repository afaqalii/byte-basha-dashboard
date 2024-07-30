'use client'
import { useDispatch } from 'react-redux';
import { deleteworkspace, setEditMode, setForm, } from '@/redux/workspaceSlice';
import { WorkspaceCardProps } from '@/lib/interfaces';
import { MdDelete, MdEdit } from 'react-icons/md';
import Image from 'next/image';
import { useState } from 'react';
import { AppDispatch } from '@/redux/store';

const WorkspaceCard = ({ id, title, file, text, handleOpen }: WorkspaceCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDelete = () => {
        dispatch(deleteworkspace(id));
    };
    const handleEdit = () => {
        dispatch(setEditMode(true))
        dispatch(setForm({
            id,
            title,
            file,
            text,
        }));
        if (handleOpen) {
            handleOpen()
        }
    };
    return (
        <div className="w-full max-w-96 shadow-xl p-4 max-[500px]:mx-auto">
            <figure className='h-[300px]'>
                <Image
                    priority
                    className='w-full h-full object-cover'
                    src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                    alt={title}
                    width={300}
                    height={300}
                />
            </figure>
            <div>
                <div className='flex justify-between items-center gap-3 my-3'>
                    <h2 className="capitalize tracking-tighter text-xl pt-1">{title}</h2>
                    <div className='flex gap-1 text-xl'>
                        <MdEdit onClick={handleEdit} className='hover:text-blue-500 cursor-pointer' />
                        <MdDelete onClick={handleDelete} className='hover:text-red-500 cursor-pointer' />
                    </div>
                </div>
                <p className={`text-gray-400 text-xs ${isExpanded ? '' : 'line-clamp-3'}`}>
                    {text}
                </p>
                <button className="text-yellowDark text-sm mt-2" onClick={toggleReadMore}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            </div>
        </div>
    );
};

export default WorkspaceCard;
