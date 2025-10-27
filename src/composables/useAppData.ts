import { ref } from 'vue'
import { strapiService } from '../api/strapiService'
import { useAuth } from './useAuth'
import type { Plan, Patient, Exercise, Doctor } from '../types'

// Reactive references - initialized from Strapi service
const doctor = ref<Doctor | null>(null)
const patients = ref<Patient[]>([])
const exercises = ref<Exercise[]>([])
const plans = ref<Plan[]>([])

// Load initial data
async function initializeData() {
  try {
    const { getCurrentDoctor } = useAuth()
    const currentDoctor = getCurrentDoctor()

    if (!currentDoctor) {
      console.log('No doctor logged in')
      return
    }

    doctor.value = currentDoctor
    const allPatients = await strapiService.getPatients()
    const allExercises = await strapiService.getExercises()
    const allPlans = await strapiService.getPlans()

    // Filter data by current doctor
    patients.value = allPatients.filter((p) => p.doctorId === currentDoctor.id)
    exercises.value = allExercises // Exercises are global (doctorId = '0')
    plans.value = allPlans.filter((p) => p.doctorId === currentDoctor.id)
  } catch (error) {
    console.error('Error initializing data:', error)
  }
}

// Initialize on module load
initializeData()

export function useAppData() {
  // Doctor
  const getDoctor = () => doctor.value
  const updateDoctor = async (updatedDoctor: Doctor) => {
    const result = await strapiService.updateDoctor(updatedDoctor)
    doctor.value = result
  }

  // Patients
  const getPatients = () => patients.value
  const getPatient = (id: string) => patients.value.find((p) => p.id === id)
  const addPatient = async (patient: Omit<Patient, 'id'>) => {
    const newPatient = await strapiService.addPatient(patient)
    patients.value.push(newPatient)
    return newPatient
  }
  const updatePatient = async (id: string, updatedPatient: Partial<Patient>) => {
    const result = await strapiService.updatePatient(id, updatedPatient)
    const index = patients.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      patients.value[index] = result
    }
  }
  const deletePatient = async (id: string) => {
    await strapiService.deletePatient(id)
    patients.value = patients.value.filter((p) => p.id !== id)
  }

  // Exercises
  const getExercises = () => exercises.value
  const getExercise = (id: string) => exercises.value.find((e) => e.id === id)
  const addExercise = async (exercise: Omit<Exercise, 'id'>) => {
    const newExercise = await strapiService.addExercise(exercise)
    exercises.value.push(newExercise)
    return newExercise
  }
  const updateExercise = async (id: string, updatedExercise: Partial<Exercise>) => {
    const result = await strapiService.updateExercise(id, updatedExercise)
    const index = exercises.value.findIndex((e) => e.id === id)
    if (index !== -1) {
      exercises.value[index] = result
    }
  }
  const deleteExercise = async (id: string) => {
    await strapiService.deleteExercise(id)
    exercises.value = exercises.value.filter((e) => e.id !== id)
  }

  // Plans
  const getPlans = () => plans.value
  const getPlan = (id: string) => plans.value.find((p) => p.id === id)
  const addPlan = async (plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPlan = await strapiService.addPlan(plan)
    plans.value.push(newPlan)
    return newPlan
  }
  const updatePlan = async (id: string, updatedPlan: Partial<Plan>) => {
    const result = await strapiService.updatePlan(id, updatedPlan)
    const index = plans.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      plans.value[index] = result
    }
  }
  const deletePlan = async (id: string) => {
    await strapiService.deletePlan(id)
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
