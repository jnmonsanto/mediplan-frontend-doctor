export interface Doctor {
  id: string
  name: string
  email: string
  photo?: string
  specialization: string
  age: number
}

export interface Patient {
  id: string
  doctorId: string
  doctor?: Doctor
  name: string
  email: string
  photo?: string
  snsId: string
}

export interface Exercise {
  id: string
  doctorId: string
  doctor?: Doctor
  name: string
  description: string
  jsonData?: Record<string, unknown>
}

export interface PlanExercise {
  exerciseId: string
  sets: number
  repetitions: number
  duration: number
  exercise?: Exercise
}

export interface Plan {
  id: string
  patientId: string
  patient?: Patient
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exercises: PlanExercise[]
  score: number
  rating: number
  videoUrl: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

export interface SortOption {
  label: string
  value: string
}
