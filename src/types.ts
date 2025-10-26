export interface Doctor {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
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
  phone?: string
  address?: string
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
  doctorId: string
  doctor?: Doctor
  patientId: string
  patient?: Patient
  title: string
  description: string
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
