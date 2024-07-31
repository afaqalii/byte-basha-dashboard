'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listInternship } from '@/redux/internshipSlice';
import { AppDispatch, RootState } from '@/redux/store';
import Spinner from '@/components/ui/loader/loader';
import InternshipCard from './InternshipCard';
import UpdateInternship from './UpdateInternship';

interface InternshipListingProps {
    handleOpen: () => void;
    handleClose: () => void;
}

const InternshipListing = ({ handleOpen, handleClose }: InternshipListingProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { internship, loading, error } = useSelector((state: RootState) => state.internship);

    useEffect(() => {
        dispatch(listInternship());
    }, [dispatch]);

    if (loading) return <div className='min-h-screen grid place-items-center'><Spinner /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[900px]:grid-cols-3 gap-5 mt-5">
            {
                internship.length > 0 ?
                    internship.map((card) => (
                        <InternshipCard
                            handleOpen={handleOpen}
                            key={card.id}
                            id={card.id.toString()}
                            title={card.title}
                            file={card.file || ""}
                            text={card.text}
                        />
                    )) :
                    <h1>No internships Added Yet!</h1>
            }
            <UpdateInternship onClose={handleClose} />
        </div>
    );
}

export default InternshipListing;
