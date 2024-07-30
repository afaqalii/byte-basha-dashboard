'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TrainingCardProps } from '@/lib/interfaces';
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AppDispatch, RootState } from '@/redux/store';
import { storage } from '../../../../firebase';
import { addTraining, updateTraining, setField } from '@/redux/traningSlice';
import Spinner from '@/components/ui/loader/loader';

interface UpdateTrainingProps {
    onClose: () => void;
}

const UpdateTraining: React.FC<UpdateTrainingProps> = ({ onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { form, loading, isEditMode } = useSelector((state: RootState) => state.training);
    const { id, title, file, text } = form;
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            dispatch(setField({ field: 'file', value: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!file || !technologies || !category) return; /. to not allow when file or technologies or cateogory is null
        let downloadURL = file || '';
        if (typeof file === "object") {
            if (file) {
                const storageRef = ref(storage, `training/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                await new Promise<void>((resolve, reject) => {
                    uploadTask.on(
                        'state_changed',
                        null,
                        error => {
                            console.error('File upload error:', error);
                            reject(error);
                        },
                        async () => {
                            downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve();
                        }
                    );
                });
            }
        }

        const newTraining: TrainingCardProps = {
            id: id || Date.now().toString(),
            title,
            file: downloadURL,
            text,
        };

        if (isEditMode) {
            dispatch(updateTraining(newTraining));
        } else {
            dispatch(addTraining(newTraining));
        }
        onClose();
    };

    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{isEditMode ? 'Edit Training' : 'Add New Training'}</DialogTitle>
                <DialogDescription>
                    {isEditMode ? 'Make changes to your Training here. Click save when you\'re done.' : 'Fill in the details of your new Training and click save.'}
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
                <div className="flex flex-col gap-3">
                    <label htmlFor="title">
                        Title
                    </label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => dispatch(setField({ field: 'title', value: e.target.value }))}
                        className="col-span-3"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="file">
                        Upload File
                    </label>
                    <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                        className="col-span-3"
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="text">
                        Text
                    </label>
                    <Textarea
                        id="text"
                        value={text}
                        onChange={(e) => dispatch(setField({ field: 'text', value: e.target.value }))}
                        className="col-span-3"
                    />
                </div>
                <DialogFooter>
                    <Button className='min-w-[180px]' type="submit">
                        {
                            // isLoading ?
                            //   <Spinner /> 
                            //   : 
                            isEditMode ? 'Update Training' : 'Add Training'
                        }
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default UpdateTraining;
