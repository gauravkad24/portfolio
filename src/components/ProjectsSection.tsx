import { useEffect, useState } from 'react'
import { fetchProjectsFromDB } from '../lib/supabase'

export function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    async function loadProjects() {
      const data = await fetchProjectsFromDB()
      setProjects(data)
    }
    loadProjects()
  }, [])

  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <div key={project.id} className="project-card">
          <img src={project.image_url} alt={project.title} />
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="links">
            <a href={project.github_url} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={project.demo_url} target="_blank" rel="noreferrer">
              Live Demo
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}