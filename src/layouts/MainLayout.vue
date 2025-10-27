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
          class="rounded-lg p-2 transition-colors hover:bg-primary-100"
          aria-label="Open profile"
        >
          <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
              style="fill: rgb(59, 130, 246); color: rgb(59, 130, 246);"
            />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Profile Modal -->
    <ProfileModal v-if="showProfileModal" @close="showProfileModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileModal from '../components/ProfileModal.vue'

const showProfileModal = ref(false)
</script>
