<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Header -->
    <header class="sticky top-0 z-40 border-b border-neutral-200 bg-white shadow-sm">
      <div class="mx-auto max-w-7xl flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <!-- Logo/Title -->
        <h1 class="text-xl text-primary-600" style="font-weight: 700">MediPlan</h1>

        <!-- Profile Button -->
        <button
          @click="showProfileModal = true"
          class="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors"
          title="Profile"
        >
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-neutral-200 bg-white py-4 text-center">
      <p class="text-sm text-neutral-600">Developed at FCTUC {{ currentYear }}</p>
    </footer>

    <!-- Profile Modal -->
    <ProfileModal v-if="showProfileModal" @close="showProfileModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileModal from '../components/ProfileModal.vue'

const showProfileModal = ref(false)
const currentYear = new Date().getFullYear()
</script>
