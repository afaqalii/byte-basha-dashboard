'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTrainings } from '@/redux/traningSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Spinner from '@/components/ui/loader/loader';
import TrainingCard from './TrainingCard';
import UpdateTraining from './UpdateTraining';

interface TrainingListingProps {
    handleOpen: () => void;
    handleClose: () => void;
}

const TrainingListing = ({ handleOpen, handleClose }: TrainingListingProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { training, loading, error } = useSelector((state: RootState) => state.training);

    useEffect(() => {
        dispatch(listTrainings());
    }, [dispatch]);

    if (loading) return <div className='min-h-screen grid place-items-center'><Spinner /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[900px]:grid-cols-3 gap-5 mt-5">
            {
                training.length > 0 ?
                    training.map((card) => (
                        <TrainingCard
                            handleOpen={handleOpen}
                            key={card.id}
                            id={card.id.toString()}
                            title={card.title}
                            file={card.file}
                            text={card.text}
                        />
                    )) :
                    <h1>No Trainings Added Yet!</h1>
            }
            <UpdateTraining onClose={handleClose} />
        </div>
    );
}

export default TrainingListing;
