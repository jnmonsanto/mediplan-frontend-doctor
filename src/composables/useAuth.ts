import { ref, computed } from 'vue'
import { mockDoctors } from '../api/mockData'
import type { Doctor } from '../types'

const currentDoctor = ref<Doctor | null>(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!currentDoctor.value)

  const loginWithCredentials = (email: string, password: string): Doctor | null => {
    const doctor = mockDoctors.find((d) => d.email === email && d.password === password)
    if (doctor) {
      const { password: _, ...doctorWithoutPassword } = doctor
      currentDoctor.value = doctorWithoutPassword as Doctor
      localStorage.setItem('currentDoctor', JSON.stringify(doctorWithoutPassword))
      return doctorWithoutPassword as Doctor
    }
    return null
  }

  const login = (doctor: Doctor) => {
    currentDoctor.value = doctor
    localStorage.setItem('currentDoctor', JSON.stringify(doctor))
  }

  const logout = () => {
    currentDoctor.value = null
    localStorage.removeItem('currentDoctor')
  }

  const getCurrentDoctor = () => currentDoctor.value

  const initializeAuth = () => {
    const saved = localStorage.getItem('currentDoctor')
    if (saved) {
      try {
        currentDoctor.value = JSON.parse(saved)
      } catch (e) {
        console.error('Failed to restore auth:', e)
        currentDoctor.value = null
      }
    }
  }

  return {
    isAuthenticated,
    currentDoctor,
    login,
    loginWithCredentials,
    logout,
    getCurrentDoctor,
    initializeAuth,
  }
}
