<template>
    <div @click="navMenu = false"
        class="text-center lg:hidden dark:bg-black dark:text-white h-64 flex justify-center align-middle flex-col px-2">
        <div>
            <h1 class=" text-3xl">All notes</h1>
            <p v-if="notes.length > 0" class="font-light">{{ notes.length }} {{ notes.length === 1 ? 'note' : 'notes' }}</p>
            <p v-else class="font-light">You don't have any notes</p>
        </div>
    </div>

    <nav class="flex justify-between px-2 sticky top-0 bg-white dark:bg-black dark:text-white py-3 lg:hidden">
        <ul>
            <li>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </li>
        </ul>

        <ul class="flex">
            <li class="mx-3">
                <RouterLink to="/search?">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </RouterLink>
            </li>
            <li>
                <div class="relative">
                    <div v-show="navMenu" class="absolute bg-gray-200 dark:bg-gray-700 right-0 p-3 rounded-xl w-28">
                        <ul>
                            <li>Edit</li>
                            <li>View</li>
                        </ul>
                    </div>
                    <svg @click="navMenu = true" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </div>
            </li>
        </ul>
    </nav>

    <div @click="navMenu = false" v-if="notes.length === 0"
        class="text-center h-[100vh] flex flex-col lg:justify-center px-2 dark:bg-black dark:text-white">
        <div>
            <h1 class="text-2xl lg:text-3xl font-semibold">You have no notes</h1>
            <p class="font-thin text-lg hidden lg:block">When you start taking notes, they will appear here.</p>
            <p class="text-lg lg:hidden font-thin">Click the button on the bottom right to create the first one</p>

            <div class="flex justify-center">
                <RouterLink to="/create">
                    <button class="hidden lg:block border-2 border-black rounded-lg px-3 py-2 mt-4">
                        Start taking notes
                    </button>
                </RouterLink>
            </div>
        </div>
    </div>

    <!--For small screens Tablet and below-->
    <section v-else class="grid grid-cols-2 px-2 gap-1 dark:bg-black pt-2 dark:text-white lg:hidden">
        <RouterLink :to="`/notes/${note.id}`" v-for="(note, i) in notes" :key="i">
            <div class="border-2 h-52 rounded-2xl dark:bg-gray-900 dark:text-white px-2 py-2 overflow-y-scroll">
                <div class="prose prose-green dark:prose-invert" v-html="marked.parse(note?.body || '')"></div>
            </div>
            <div class="text-center">
                <h1 class=" font-semibold truncate">{{ note?.title }}</h1>
                <p class=" font-thin text-sm">
                    {{ new Date(note?.createdAt).toLocaleDateString() }}
                    {{ new Date(note?.createdAt).toLocaleTimeString() }}</p>
            </div>
        </RouterLink>
    </section>

    <!--For large screens The landing page needs to be a different layout-->
    <div class="w-52 border-2 rounded-r-lg min-h-screen flex flex-col gap-3 p-5">
        <RouterLink :to="`/notes/${note.id}`" v-for="note in notes">
            <div class="max-h-20">
                <h3 class="font-bold">{{ note.title }}</h3>
                <p class=" truncate">{{ note.body }}</p>
            </div>
        </RouterLink>
    </div>


    <!--Floating button for adding a new note-->
    <div class="fixed bottom-1 right-1 lg:hidden">
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
    <!--/Floating button for adding a new note-->
</template>

<script lang="ts" setup>
import { marked } from 'marked'
import { Ref, ref } from 'vue';
import { onMounted } from 'vue';
import { db } from '../db';
import { RouterLink } from 'vue-router';

interface Note {
    id: number,
    title: string,
    body: string,
    createdAt: string
}

const navMenu = ref(false)
const notes: Ref<Note[]> = ref([])

const getNotes = async () => {
    const nts = await db.table<Note>('notes').reverse().toArray()
    notes.value = nts
    return
}
onMounted(async () => {
    await getNotes()
})
</script>
