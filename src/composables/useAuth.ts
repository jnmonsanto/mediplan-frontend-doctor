import { ref, computed } from 'vue'
import type { Doctor } from '../types'

const currentDoctor = ref<Doctor | null>(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!currentDoctor.value)

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
    logout,
    getCurrentDoctor,
    initializeAuth,
  }
}
