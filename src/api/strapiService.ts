import type { Doctor, Patient, Exercise, Plan, PlanExercise } from '../types'
import { mockDoctor, mockPatients, mockExercises, mockPlans } from './mockData'

const API_URL = import.meta.env.VITE_STRAPI_URL

interface StrapiResponse<T> {
  data: T | T[]
  meta?: Record<string, unknown>
}

class StrapiService {
  private useMockData: boolean

  constructor() {
    this.useMockData = !API_URL
    if (!this.useMockData) {
      console.log(`[Strapi] Connected to: ${API_URL}`)
    } else {
      console.log('[Strapi] Using mock data (no VITE_STRAPI_URL configured)')
    }
  }

  private async fetchFromStrapi<T>(endpoint: string): Promise<T> {
    if (!API_URL) {
      throw new Error('Strapi URL not configured')
    }

    const response = await fetch(`${API_URL}${endpoint}`)
    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.statusText}`)
    }

    const data: StrapiResponse<T> = await response.json()
    return Array.isArray(data.data) ? (data.data as T) : data.data
  }

  // Doctor methods
  async getDoctor(): Promise<Doctor> {
    if (this.useMockData) {
      return mockDoctor
    }

    try {
      return await this.fetchFromStrapi<Doctor>('/api/doctor')
    } catch (error) {
      console.error('Error fetching doctor:', error)
      return mockDoctor
    }
  }

  async updateDoctor(doctor: Doctor): Promise<Doctor> {
    if (this.useMockData) {
      return doctor
    }

    try {
      const response = await fetch(`${API_URL}/api/doctor`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctor),
      })

      if (!response.ok) {
        throw new Error(`Update failed: ${response.statusText}`)
      }

      const data: StrapiResponse<Doctor> = await response.json()
      return Array.isArray(data.data) ? data.data[0] : data.data
    } catch (error) {
      console.error('Error updating doctor:', error)
      return doctor
    }
  }

  // Patients methods
  async getPatients(): Promise<Patient[]> {
    if (this.useMockData) {
      return mockPatients
    }

    try {
      return await this.fetchFromStrapi<Patient[]>('/api/patients')
    } catch (error) {
      console.error('Error fetching patients:', error)
      return mockPatients
    }
  }

  async addPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    if (this.useMockData) {
      return { id: Date.now().toString(), ...patient }
    }

    try {
      const response = await fetch(`${API_URL}/api/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      })

      if (!response.ok) {
        throw new Error(`Create failed: ${response.statusText}`)
      }

      const data: StrapiResponse<Patient> = await response.json()
      return Array.isArray(data.data) ? data.data[0] : data.data
    } catch (error) {
      console.error('Error adding patient:', error)
      return { id: Date.now().toString(), ...patient }
    }
  }

  async updatePatient(id: string, patient: Partial<Patient>): Promise<Patient> {
    if (this.useMockData) {
      return { id, ...patient } as Patient
    }

    try {
      const response = await fetch(`${API_URL}/api/patients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient),
      })

      if (!response.ok) {
        throw new Error(`Update failed: ${response.statusText}`)
      }

      const data: StrapiResponse<Patient> = await response.json()
      return Array.isArray(data.data) ? data.data[0] : data.data
    } catch (error) {
      console.error('Error updating patient:', error)
      return { id, ...patient } as Patient
    }
  }

  async deletePatient(id: string): Promise<void> {
    if (this.useMockData) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/patients/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error deleting patient:', error)
    }
  }

  // Exercises methods
  async getExercises(): Promise<Exercise[]> {
    if (this.useMockData) {
      return mockExercises
    }

    try {
      return await this.fetchFromStrapi<Exercise[]>('/api/exercises')
    } catch (error) {
      console.error('Error fetching exercises:', error)
      return mockExercises
    }
  }

  async addExercise(exercise: Omit<Exercise, 'id'>): Promise<Exercise> {
    if (this.useMockData) {
      return { id: Date.now().toString(), ...exercise }
    }

    try {
      const response = await fetch(`${API_URL}/api/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
      })

      if (!response.ok) {
        throw new Error(`Create failed: ${response.statusText}`)
      }

      const data: StrapiResponse<Exercise> = await response.json()
      return Array.isArray(data.data) ? data.data[0] : data.data
    } catch (error) {
      console.error('Error adding exercise:', error)
      return { id: Date.now().toString(), ...exercise }
    }
  }

  async updateExercise(id: string, exercise: Partial<Exercise>): Promise<Exercise> {
    if (this.useMockData) {
      return { id, ...exercise } as Exercise
    }

    try {
      const response = await fetch(`${API_URL}/api/exercises/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
      })

      if (!response.ok) {
        throw new Error(`Update failed: ${response.statusText}`)
      }

      const data: StrapiResponse<Exercise> = await response.json()
      return Array.isArray(data.data) ? data.data[0] : data.data
    } catch (error) {
      console.error('Error updating exercise:', error)
      return { id, ...exercise } as Exercise
    }
  }

  async deleteExercise(id: string): Promise<void> {
    if (this.useMockData) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/exercises/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error deleting exercise:', error)
    }
  }

  // Plans methods
  async getPlans(): Promise<Plan[]> {
    if (this.useMockData) {
      return mockPlans
    }

    try {
      return await this.fetchFromStrapi<Plan[]>('/api/plans')
    } catch (error) {
      console.error('Error fetching plans:', error)
      return mockPlans
    }
  }

  async addPlan(plan: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>): Promise<Plan> {
    if (this.useMockData) {
      return {
        id: Date.now().toString(),
        ...plan,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    try {
      const response = await fetch(`${API_URL}/api/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      })

      if (!response.ok) {
        throw new Error(`Create failed: ${response.statusText}`)
      }

      const data: StrapiResponse<Plan> = await response.json()
      return Array.isArray(data.data) ? data.data[0] : data.data
    } catch (error) {
      console.error('Error adding plan:', error)
      return {
        id: Date.now().toString(),
        ...plan,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }
  }

  async updatePlan(id: string, plan: Partial<Plan>): Promise<Plan> {
    if (this.useMockData) {
      return { id, ...plan, updatedAt: new Date() } as Plan
    }

    try {
      const response = await fetch(`${API_URL}/api/plans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plan),
      })

      if (!response.ok) {
        throw new Error(`Update failed: ${response.statusText}`)
      }

      const data: StrapiResponse<Plan> = await response.json()
      return Array.isArray(data.data) ? data.data[0] : data.data
    } catch (error) {
      console.error('Error updating plan:', error)
      return { id, ...plan, updatedAt: new Date() } as Plan
    }
  }

  async deletePlan(id: string): Promise<void> {
    if (this.useMockData) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/plans/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Delete failed: ${response.statusText}`)
      }
    } catch (error) {
      console.error('Error deleting plan:', error)
    }
  }
}

export const strapiService = new StrapiService()
