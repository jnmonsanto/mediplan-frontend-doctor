import type { Doctor, Patient, Exercise, Plan } from '../types'

export const mockDoctor: Doctor = {
  id: '1',
  name: 'Dr. Smith',
  email: 'smith@clinic.com',
  photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
  specialization: 'Orthopedic',
  age: 45,
}

export const mockPatients: Patient[] = [
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
]

export const mockExercises: Exercise[] = [
  {
    id: '1',
    name: 'Push-ups',
    description: 'A classic upper body exercise that strengthens chest, shoulders, and triceps.',
    duration: 5,
    reps: 10,
    sets: 3,
    jsonData: { difficulty: 'medium', duration: 5 },
  },
  {
    id: '2',
    name: 'Squats',
    description: 'A fundamental lower body exercise targeting quadriceps, hamstrings, and glutes.',
    duration: 5,
    reps: 15,
    sets: 3,
    jsonData: { difficulty: 'medium', duration: 5 },
  },
  {
    id: '3',
    name: 'Planks',
    description: 'Core strengthening exercise that improves stability and endurance.',
    duration: 10,
    reps: 30,
    sets: 3,
    jsonData: { difficulty: 'hard', duration: 10 },
  },
]

export const mockPlans: Plan[] = [
  {
    id: '1',
    patientId: '1',
    patient: mockPatients[0],
    title: 'Upper Body Strength Training',
    description: 'A comprehensive upper body workout plan focusing on chest, shoulders, and arms.',
    duration: 30,
    difficulty: 'intermediate',
    exercises: [
      { exerciseId: '1', sets: 3, repetitions: 10, exercise: mockExercises[0] },
      { exerciseId: '2', sets: 3, repetitions: 15, exercise: mockExercises[1] },
    ],
    score: 8.5,
    rating: 4,
    videoUrl: 'https://example.com/videos/upper-body.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    patientId: '2',
    patient: mockPatients[1],
    title: 'Core Stability Program',
    description: 'An advanced core training regimen designed to build strength and stability.',
    duration: 45,
    difficulty: 'advanced',
    exercises: [
      { exerciseId: '2', sets: 4, repetitions: 20, exercise: mockExercises[1] },
      { exerciseId: '3', sets: 3, repetitions: 30, exercise: mockExercises[2] },
    ],
    score: 9,
    rating: 5,
    videoUrl: 'https://example.com/videos/core-stability.mp4',
    imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
]
