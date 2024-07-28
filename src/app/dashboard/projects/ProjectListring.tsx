import React from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '@/lib/data'

const ProjectListring = () => {
    return (
        <div className="grid grid-cols-1 min-[500px]:grid-cols-2 min-[900px]:grid-cols-3 gap-5 mt-5">
            {projects.map((card, index) => (
                <ProjectCard
                    key={index}
                    index={index}
                    title={card.title}
                    category={card.category}
                    url={card.url}
                    text={card.text}
                    technologies={card.technologies} />
            ))}
        </div>
    )
}

export default ProjectListring