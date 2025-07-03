export interface IProject {
  id: number
  name: string
  slug: string
  status: 'in-progress' | 'completed'
  updated_at: string
  created_at: string
  collaborators: string[]
}

export interface ITask {
  id: number
  created_at: string
  name: string
  status: 'in-progress' | 'completed'
  due_date: string
  project_id: number
  collaborators: string[]
}

export interface ILink {
  title: string
  to: string
  icon: string
}
