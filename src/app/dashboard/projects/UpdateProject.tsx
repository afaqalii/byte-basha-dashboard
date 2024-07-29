'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProjectCardProps } from '@/lib/interfaces';
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { MdAdd, MdRemove } from 'react-icons/md';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AppDispatch } from '@/redux/store';
import { storage } from '../../../../firebase';
import { addProject, updateProject } from '@/redux/projectSlice';

interface UpdateProjectProps {
  project?: ProjectCardProps;
  onClose: () => void;
}

const UpdateProject: React.FC<UpdateProjectProps> = ({ project, onClose }) => {
  const [title, setTitle] = useState(project?.title || '');
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState(project?.text || '');
  const [category, setCategory] = useState(project?.category || '');
  const [technology, setTechnology] = useState('');
  const [technologies, setTechnologies] = useState<string[]>(project?.technologies || []);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setText(project.text);
      setCategory(project.category);
      setTechnologies(project.technologies);
    }
  }, [project]);

  const handleAddTechnology = () => {
    if (technology && !technologies.includes(technology)) {
      setTechnologies([...technologies, technology]);
      setTechnology('');
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let downloadURL = project?.url || '';
    if (file) {
      console.log("Have files")
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

    const newProject: ProjectCardProps = {
      id: project?.id || Date.now().toString(),
      title,
      url: downloadURL,
      text,
      technologies,
      category,
    };

    if (project) {
      dispatch(updateProject(newProject));
    } else {
      dispatch(addProject(newProject));
    }
    onClose(); // Close the dialog after successful submission
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
        <DialogDescription>
          {project ? 'Make changes to your project here. Click save when you\'re done.' : 'Fill in the details of your new project and click save.'}
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
            onChange={(e) => setTitle(e.target.value)}
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
            onChange={(e) => setText(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="category">
            Category
          </label>
          <div className="col-span-3">
            <Select value={category} onValueChange={(value) => setCategory(value)}>
              <SelectTrigger>
                <span>{category}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom-software-solutions">Custom Software Solutions</SelectItem>
                <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                <SelectItem value="wordpress-development">WordPress Development</SelectItem>
                <SelectItem value="app-development">App Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="technology">
            Technologies
          </label>
          <div className="col-span-3 flex items-center">
            <Input
              id="technology"
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              className="flex-grow"
            />
            <Button type="button" onClick={handleAddTechnology}>
              <MdAdd />
            </Button>
          </div>
        </div>
        <div className="col-span-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <div key={index} className="flex items-center gap-2">
              <span>{tech}</span>
              <Button type="button" onClick={() => handleRemoveTechnology(tech)}>
                <MdRemove />
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default UpdateProject;
