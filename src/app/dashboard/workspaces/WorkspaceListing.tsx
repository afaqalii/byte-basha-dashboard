'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import Spinner from '@/components/ui/loader/loader';
import WorkspaceCard from './WorkspaceCard';
import UpdateWorkspace from './UpdateWorkspace';
import { listworkspace } from '@/redux/workspaceSlice';

interface WorkspaceListingProps {
    handleOpen: () => void;
    handleClose: () => void;
}

const WorkspaceListing = ({ handleOpen, handleClose }: WorkspaceListingProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { workspace, loading, error } = useSelector((state: RootState) => state.workspace);

    useEffect(() => {
        dispatch(listworkspace());
    }, [dispatch]);

    if (loading) return <div className='min-h-screen grid place-items-center'><Spinner /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[900px]:grid-cols-3 gap-5 mt-5">
            {
                workspace.length > 0 ?
                    workspace.map((card) => (
                        <WorkspaceCard
                            handleOpen={handleOpen}
                            key={card.id}
                            id={card.id.toString()}
                            title={card.title}
                            file={card.file}
                            text={card.text}
                        />
                    )) :
                    <h1>No Workspaces Added Yet!</h1>
            }
            <UpdateWorkspace onClose={handleClose} />
        </div>
    );
}

export default WorkspaceListing;
