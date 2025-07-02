/* eslint-env node */

import { fakerEN_US as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  throw new Error('Missing Supabase credentials in env.')
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const seedProjects = async (num) => {
  const projects = []

  for (let i = 0; i < num; i++) {
    const name = faker.lorem.word(5)

    projects.push({
      name: name,
      slug: name.toLocaleLowerCase().replace('/ /g', '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements(['1', '2', '3']),
    })
  }

  const { data, error } = await supabase.from('projects').insert(projects).select('id')

  if (error) {
    console.log('Error inserting projects', error)
    process.exit(1)
  }

  return data?.map((p) => p.id ?? [])
}

const seedTasks = async (num, projectIds) => {
  const tasks = []

  for (let i = 0; i < num; i++) {
    tasks.push({
      name: faker.lorem.words(5),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      due_date: faker.date.future().toISOString(),
      description: faker.lorem.paragraph(),
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  const { error } = await supabase.from('tasks').insert(tasks)
  if (error) {
    console.log('Error inserting tasks', error)
    process.exit(1)
  }
}

const run = async () => {
  console.log('Sending projects...')
  const projectsId = await seedProjects(10)
  console.log(`Inserted ${projectsId.length}`)
  await seedTasks(20, projectsId)
  console.log('Seeding complete!')
}

run()
