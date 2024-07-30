'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectCardProps } from '@/lib/interfaces';
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { MdAdd, MdRemove } from 'react-icons/md';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AppDispatch, RootState } from '@/redux/store';
import { storage } from '../../../../firebase';
import { addProject, updateProject, setField, addTechnology, removeTechnology, resetForm, setForm, setLoading } from '@/redux/projectSlice';
import Spinner from '@/components/ui/loader/loader';

interface UpdateProjectProps {
  onClose: () => void;
}

const UpdateProject: React.FC<UpdateProjectProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { form, isLoading, isEditMode } = useSelector((state: RootState) => state.projects);
  const { id, title, file, text, category, technology, technologies } = form;
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
        const storageRef = ref(storage, `projects/${file.name}`);
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

    const newProject: ProjectCardProps = {
      id: id || Date.now().toString(),
      title,
      file: downloadURL,
      text,
      technologies,
      category,
    };

    if (isEditMode) {
      dispatch(updateProject(newProject));
    } else {
      dispatch(addProject(newProject));
    }
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        <DialogDescription>
          {isEditMode ? 'Make changes to your project here. Click save when you\'re done.' : 'Fill in the details of your new project and click save.'}
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
        <div className="flex flex-col gap-3">
          <label htmlFor="category">
            Category
          </label>
          <Select
            onValueChange={(value) => dispatch(setField({ field: 'category', value }))}
            value={category}
          >
            <SelectTrigger className="col-span-3" />
            <SelectContent>
              <SelectItem value="custom-software-solutions">Custom Software Solutions</SelectItem>
              <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
              <SelectItem value="wordpress-development">WordPress Development</SelectItem>
              <SelectItem value="mobile-app-development">Mobile App Development</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="technology">
            Technologies
          </label>
          <div className="flex items-center gap-2">
            <Input
              id="technology"
              value={technology}
              onChange={(e) => dispatch(setField({ field: 'technology', value: e.target.value }))}
              className="col-span-2"
            />
            <Button type="button" onClick={() => dispatch(addTechnology())}>
              <MdAdd />
            </Button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {technologies?.map((tech, index) => (
              <div key={index} className="flex items-center gap-1">
                <span>{tech}</span>
                <Button type="button" variant="destructive" onClick={() => dispatch(removeTechnology(tech))}>
                  <MdRemove />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isLoading} className='min-w-[180px]' type="submit">
            {isLoading ? <Spinner /> : isEditMode ? 'Update Project' : 'Add Project'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default UpdateProject;
