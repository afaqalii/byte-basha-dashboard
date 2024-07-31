'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects } from '@/redux/projectSlice';
import ProjectCard from './ProjectCard';
import { AppDispatch, RootState } from '@/redux/store';
import Spinner from '@/components/ui/loader/loader';
import UpdateProject from './UpdateProject';

interface ProjectListingProps {
    handleOpen: () => void;
    handleClose: () => void;
}

const ProjectListing = ({ handleOpen, handleClose }: ProjectListingProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, loading, error } = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        dispatch(listProjects());
    }, [dispatch]);

    if (loading) return <div className='min-h-screen grid place-items-center'><Spinner /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[900px]:grid-cols-3 gap-5 mt-5">
            {
                projects.length > 0 ?
                    projects.map((card) => (
                        <ProjectCard
                            handleOpen={handleOpen}
                            key={card.id}
                            id={card.id.toString()}
                            title={card.title}
                            category={card.category}
                            file={card.file || ""}
                            text={card.text}
                            technologies={card.technologies}
                        />
                    )) :
                    <h1>No Projects Added Yet!</h1>
            }
            <UpdateProject onClose={handleClose}  />
        </div>
    );
}

export default ProjectListing;
