import { ref, computed } from 'vue'
import type { Plan, Patient, Exercise, Doctor, PlanExercise } from '../types'

// Mock data storage
const doctor = ref<Doctor>({
  id: '1',
  name: 'Dr. Smith',
  email: 'smith@clinic.com',
  photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
  specialization: 'Orthopedic',
  age: 45,
})

const patients = ref<Patient[]>([
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    snsId: 'SNS123456',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    snsId: 'SNS789012',
  },
])

const exercises = ref<Exercise[]>([
  {
    id: '1',
    name: 'Push-ups',
    jsonData: { difficulty: 'medium', duration: 5 },
  },
  {
    id: '2',
    name: 'Squats',
    jsonData: { difficulty: 'medium', duration: 5 },
  },
  {
    id: '3',
    name: 'Planks',
    jsonData: { difficulty: 'hard', duration: 10 },
  },
])

const plans = ref<Plan[]>([
  {
    id: '1',
    patientId: '1',
    patient: patients.value[0],
    exercises: [
      { exerciseId: '1', sets: 3, repetitions: 10, exercise: exercises.value[0] },
      { exerciseId: '2', sets: 3, repetitions: 15, exercise: exercises.value[1] },
    ],
    score: 8.5,
    rating: 4,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    patientId: '2',
    patient: patients.value[1],
    exercises: [
      { exerciseId: '2', sets: 4, repetitions: 20, exercise: exercises.value[1] },
      { exerciseId: '3', sets: 3, repetitions: 30, exercise: exercises.value[2] },
    ],
    score: 9,
    rating: 5,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
])

export function useAppData() {
  // Doctor
  const getDoctor = () => doctor.value
  const updateDoctor = (updatedDoctor: Doctor) => {
    doctor.value = { ...doctor.value, ...updatedDoctor }
  }

  // Patients
  const getPatients = () => patients.value
  const getPatient = (id: string) => patients.value.find((p) => p.id === id)
  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      id: Date.now().toString(),
      ...patient,
    }
    patients.value.push(newPatient)
    return newPatient
  }
  const updatePatient = (id: string, updatedPatient: Partial<Patient>) => {
    const index = patients.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      patients.value[index] = { ...patients.value[index], ...updatedPatient }
    }
  }
  const deletePatient = (id: string) => {
    patients.value = patients.value.filter((p) => p.id !== id)
  }

  // Exercises
  const getExercises = () => exercises.value
  const getExercise = (id: string) => exercises.value.find((e) => e.id === id)
  const addExercise = (exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      ...exercise,
    }
    exercises.value.push(newExercise)
    return newExercise
  }
  const updateExercise = (id: string, updatedExercise: Partial<Exercise>) => {
    const index = exercises.value.findIndex((e) => e.id === id)
    if (index !== -1) {
      exercises.value[index] = { ...exercises.value[index], ...updatedExercise }
    }
  }
  const deleteExercise = (id: string) => {
    exercises.value = exercises.value.filter((e) => e.id !== id)
  }

  // Plans
  const getPlans = () => plans.value
  const getPlan = (id: string) => plans.value.find((p) => p.id === id)
  const addPlan = (plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPlan: Plan = {
      id: Date.now().toString(),
      ...plan,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    plans.value.push(newPlan)
    return newPlan
  }
  const updatePlan = (id: string, updatedPlan: Partial<Plan>) => {
    const index = plans.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      plans.value[index] = {
        ...plans.value[index],
        ...updatedPlan,
        updatedAt: new Date(),
      }
    }
  }
  const deletePlan = (id: string) => {
    plans.value = plans.value.filter((p) => p.id !== id)
  }

  return {
    // Doctor
    getDoctor,
    updateDoctor,
    // Patients
    getPatients,
    getPatient,
    addPatient,
    updatePatient,
    deletePatient,
    // Exercises
    getExercises,
    getExercise,
    addExercise,
    updateExercise,
    deleteExercise,
    // Plans
    getPlans,
    getPlan,
    addPlan,
    updatePlan,
    deletePlan,
  }
}
