<template>
    <div class="fixed top-0 left-0 w-full h-screen bg-white dark:bg-black dark:text-white">
        <nav class="py-3">
            <ul class="grid grid-cols-11">
                <li>
                    <RouterLink to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-10 text-2xl" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </RouterLink>
                </li>
                <li class=" col-span-9">
                    <input v-model="searchQuery" type="text" name="title" id="title"
                        class="border-0 w-full caret-[#ffe500] dark:bg-black focus:ring-0 placeholder:font-semibold placeholder:text-2xl text-2xl"
                        placeholder="Search">
                </li>
            </ul>
        </nav>

        <div class="grid grid-cols-2 px-2 gap-1 dark:bg-black pt-2 dark:text-white min-h-[100vh]">
            <RouterLink :to="`/notes/${note.id}`" v-for="note in searchResults">
                <div class="border-2 h-52 rounded-2xl dark:bg-gray-900 dark:text-white px-2 py-2">
                    <p class=" text-xs" v-html="marked.parse(note.body)"></p>
                </div>
                <div class="text-center">
                    <h1 class=" font-semibold">{{ note.title }}</h1>
                    <p class=" font-thin text-sm">{{ new Date(note.createdAt).toLocaleDateString() }} {{
                        new
                    Date(note.createdAt).toLocaleTimeString()
                    }}</p>
                </div>
            </RouterLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, Ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import { db } from '../db';

interface Note {
    id: number,
    title: string,
    body: string,
    createdAt: string
}

const searchResults: Ref<Note[]> = ref([])
const $route = useRoute()
//const query = $route.query.q as string
const searchQuery: Ref<string> = ref('')

watch(searchQuery, () => {
    searchNotes()
})

const searchNotes = async () => {

    const nts = await db.table('notes').where('title')
        .startsWithIgnoreCase(searchQuery.value)
        .or('body')
        .startsWithIgnoreCase(searchQuery.value)
        .reverse()
        .toArray()
    searchResults.value = nts
    return
}

onBeforeMount(() => {
    console.log($route.query.q);
})
</script>