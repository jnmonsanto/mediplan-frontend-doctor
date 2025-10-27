<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary-600" style="font-weight: 700">MediPlan</h1>
          <p class="mt-2 text-neutral-600">Doctor Portal</p>
        </div>

        <!-- Instructions -->
        <div class="mb-8 p-4 rounded-lg bg-blue-50 border border-blue-200">
          <p class="text-sm text-blue-800">
            Select your account to log in and manage your patients and exercise plans.
          </p>
        </div>

        <!-- Doctor Selection -->
        <div class="space-y-3">
          <p class="text-sm font-medium text-neutral-700 mb-4">Select Your Account</p>
          <button
            v-for="doctor in doctors"
            :key="doctor.id"
            @click="selectDoctor(doctor)"
            class="w-full flex items-center gap-4 p-4 rounded-lg border-2 border-neutral-200 bg-white transition-all hover:border-primary-500 hover:bg-primary-50"
          >
            <img
              :src="doctor.photo"
              :alt="doctor.name"
              class="h-12 w-12 rounded-full object-cover"
            />
            <div class="text-left flex-1">
              <h3 class="font-semibold text-neutral-900">{{ doctor.name }}</h3>
              <p class="text-sm text-neutral-600">{{ doctor.specialization }}</p>
              <p class="text-xs text-neutral-500">{{ doctor.email }}</p>
            </div>
            <svg class="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Footer -->
        <div class="mt-8 pt-6 border-t border-neutral-200">
          <p class="text-xs text-neutral-500 text-center">
            Version 1.0 • Multi-Doctor Management System
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { mockDoctors } from '../api/mockData'

const router = useRouter()
const { login } = useAuth()

const doctors = ref(mockDoctors)

onMounted(() => {
  // If already logged in, redirect to dashboard
  const saved = localStorage.getItem('currentDoctor')
  if (saved) {
    router.push('/')
  }
})

const selectDoctor = (doctor) => {
  login(doctor)
  router.push('/')
}
</script>
