<template>
    <div class="flex h-screen">
        <div class="w-1/4 bg-white dark:bg-tokyo-night-midnight dark:text-tokyo-night-wasabi p-4 ">
            <h1 class="text-3xl font-semibold">All notes</h1>
            <p v-if="notes.length > 0" class="font-light">{{ notes.length }} {{ notes.length === 1 ? 'note' : 'notes' }}</p>
            <p v-else class="font-light">You don't have any notes</p>
            <ul class="mt-4">
                <li v-for="(note, index) in notes" :key="index" class="mb-2">
                    <div class="flex items-center" @click="showNote(note)">
                        <div class="w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full mr-2"></div>
                        <p class="truncate">{{ note.title }}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="w-3/4 bg-gray-100 dark:bg-tokyo-night-skyline dark:text-tokyo-night-midnight p-4">
            <div v-if="currentActiveNote">
                <h1 class="text-2xl font-semibold">{{ currentActiveNote.title }}</h1>
                <p class="text-sm">{{ new Date(currentActiveNote.createdAt).toLocaleString() }}</p>
                <div class="prose prose-green dark:prose-invert mt-4" v-html="marked.parse(currentActiveNote.body || '')"></div>
            </div>
            <div v-else>
                <h1 class="text-2xl font-semibold">No note selected</h1>
                <p class="text-lg">Click on a note from the left to view its content</p>
            </div>
        </div>

        <div class="fixed bottom-1 right-1">
            <RouterLink to="/create">
                <button class="bg-white dark:bg-black dark:text-white p-4 rounded-full shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { marked } from 'marked'
import { ref } from 'vue';
import { onMounted } from 'vue';
import { db } from '../db';

const notes = ref([])
const currentActiveNote = ref(null)

const getNotes = async () => {
    const nts = await db.notes.reverse().toArray()
    notes.value = nts
}

const showNote = (note) => {
    currentActiveNote.value = note
}

onMounted(() => {
    getNotes()
})
</script>
