'use client'
import { useDispatch } from 'react-redux';
import { deleteProject, setEditMode, setForm, } from '@/redux/projectSlice';
import { ProjectCardProps } from '@/lib/interfaces';
import { MdDelete, MdEdit } from 'react-icons/md';
import Image from 'next/image';
import { useState } from 'react';
import { AppDispatch } from '@/redux/store';

const ProjectCard = ({ id, title, file, text, technologies, category, handleOpen }: ProjectCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const handleDelete = () => {
        dispatch(deleteProject(id));
    };
    const handleEdit = () => {
        dispatch(setEditMode(true))
        dispatch(setForm({
            id,
            title,
            file,
            text,
            category,
            technologies,
            technology: "",
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
                <p className='text-gray-400 text-xs mt-2'>
                    Category: <span className='text-black font-semibold uppercase'>{category}</span>
                </p>
                <button className="text-yellowDark text-sm mt-2" onClick={toggleReadMore}>
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
                <div className="flex flex-wrap gap-3 my-3">
                    {technologies?.map((badge) => (
                        <span key={badge} className="py-1 px-3 min-w-10 text-center uppercase text-xs text-yellowDark rounded-full border border-yellowDark">
                            {badge}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
