<template>
  <div
    class="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4"
  >
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-primary-600" style="font-weight: 700">MediPlan</h1>
          <p class="mt-2 text-neutral-600">Doctor Portal</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-4 mb-8">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
              placeholder="Enter your password"
            />
          </div>

          <div v-if="error" class="p-3 rounded-lg bg-red-50 border border-red-200">
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <!-- Forgot Password Link -->
        <div class="mt-3 mb-6 text-center">
          <button
            @click="showForgotPassword = !showForgotPassword"
            class="text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        <!-- Password Reset Form -->
        <form v-if="showForgotPassword" @submit.prevent="handleSendResetLink" class="space-y-4 mb-8">
          <h2 class="text-xl font-bold text-neutral-900 mb-3">Reset Password</h2>
          <p class="text-sm text-neutral-600 mb-6">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
            <input
              v-model="resetEmail"
              type="email"
              required
              class="w-full rounded-lg border border-neutral-300 px-4 py-2 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition"
              placeholder="Enter your email"
            />
          </div>

          <div v-if="resetError" class="p-3 rounded-lg bg-red-50 border border-red-200">
            <p class="text-sm text-red-700">{{ resetError }}</p>
          </div>

          <div v-if="resetSuccess" class="p-3 rounded-lg bg-green-50 border border-green-200">
            <p class="text-sm text-green-700">{{ resetSuccess }}</p>
          </div>

          <button
            type="submit"
            :disabled="isResettingPassword"
            class="w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isResettingPassword ? 'Sending...' : 'Send Reset Link' }}
          </button>

          <div class="text-center">
            <button
              type="button"
              @click="showForgotPassword = false"
              class="text-sm text-primary-600 hover:text-primary-700 hover:underline transition-colors"
            >
              Remember your password? Back to Login
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div class="relative mb-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-neutral-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-2 text-neutral-500">Demo Credentials</span>
          </div>
        </div>

        <!-- Demo Credentials List -->
        <div class="space-y-3">
          <div
            v-for="(cred, idx) in demoCredentials"
            :key="idx"
            class="p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-sm"
          >
            <p class="font-semibold text-neutral-900">{{ cred.name }}</p>
            <p class="text-neutral-600">{{ cred.email }}</p>
            <p class="text-neutral-600">
              Password:
              <code class="font-mono bg-white px-2 py-1 rounded">{{ cred.password }}</code>
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 pt-6 border-t border-neutral-200">
          <p class="text-xs text-neutral-500 text-center">
            Multi-Doctor Management System • Version 1.0
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
import { initializeData } from '../composables/useAppData'
import { mockDoctors } from '../api/mockData'

const router = useRouter()
const { loginWithCredentials } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')
const isLoading = ref(false)
const showForgotPassword = ref(false)
const resetEmail = ref('')
const resetPassword = ref('')
const resetPasswordConfirm = ref('')
const resetError = ref('')
const resetSuccess = ref('')
const isResettingPassword = ref(false)

const demoCredentials = ref(
  mockDoctors.map((d) => ({
    name: d.name,
    email: d.email,
    password: d.password,
  })),
)

onMounted(() => {
  // If already logged in, redirect to dashboard
  const saved = localStorage.getItem('currentDoctor')
  if (saved) {
    router.push('/')
  }
})

const handleLogin = async () => {
  error.value = ''
  isLoading.value = true

  try {
    const doctor = loginWithCredentials(email.value, password.value)
    if (doctor) {
      await initializeData()
      router.push('/')
    } else {
      error.value = 'Invalid email or password'
    }
  } catch (e) {
    error.value = 'Login failed. Please try again.'
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

const handleResetPassword = async () => {
  resetError.value = ''
  resetSuccess.value = ''
  isResettingPassword.value = true

  try {
    if (resetPassword.value !== resetPasswordConfirm.value) {
      resetError.value = 'Passwords do not match'
      return
    }

    if (resetPassword.value.length < 6) {
      resetError.value = 'Password must be at least 6 characters'
      return
    }

    const doctor = mockDoctors.find((d) => d.email === resetEmail.value)
    if (!doctor) {
      resetError.value = 'Email not found'
      return
    }

    doctor.password = resetPassword.value
    resetSuccess.value = 'Password reset successfully! You can now log in with your new password.'

    setTimeout(() => {
      showForgotPassword.value = false
      resetEmail.value = ''
      resetPassword.value = ''
      resetPasswordConfirm.value = ''
      resetSuccess.value = ''
    }, 2000)
  } catch (e) {
    resetError.value = 'Password reset failed. Please try again.'
    console.error(e)
  } finally {
    isResettingPassword.value = false
  }
}
</script>
