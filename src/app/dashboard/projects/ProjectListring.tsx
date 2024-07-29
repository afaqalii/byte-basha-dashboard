'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProjects } from '@/redux/projectSlice';
import ProjectCard from './ProjectCard';
import { AppDispatch, RootState } from '@/redux/store';
import Spinner from '@/components/ui/loader/loader';

const ProjectListring = () => {
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
                            key={card.id}
                            id={card.id.toString()}
                            title={card.title}
                            category={card.category}
                            url={card.url}
                            text={card.text}
                            technologies={card.technologies}
                        />
                    )) :
                    <h1>No Projects Added Yet!</h1>}
        </div>
    );
}

export default ProjectListring;
