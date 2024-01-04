<template>
    <nav class="py-3">
        <ul class="grid grid-cols-11">
            <li>
                <RouterLink :to="`/notes/${noteId}`">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-10 text-2xl dark:text-white cursor-pointer"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </RouterLink>
            </li>
            <li class="col-span-9">
                <input v-model="noteTitle" type="text" name="title" id="title" class="
              border-0
              w-full
              caret-[#ffe500]
              dark:bg-black
              dark:text-white
              focus:ring-0
              placeholder:font-semibold placeholder:text-2xl
              text-2xl
            " placeholder="Title" />
            </li>
        </ul>
    </nav>
    <textarea id="body" v-model="noteBody" class="
        w-full
        h-screen
        dark:bg-black
        dark:text-white
        border-0
        focus:ring-0
        caret-[#3a3500]
        dark:caret-[#ffe500]
        text-xl
      "></textarea>
</template>

<script lang="ts" setup>
import { onBeforeMount, Ref, ref } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { db } from '../db';

interface Note {
    id: number,
    title: string,
    body: string,
    createdAt: string
}

const noteTitle: Ref<string> = ref('')
const noteBody: Ref<string> = ref('')
const noteId: Ref<number> = ref(0)
const $route = useRoute()
onBeforeRouteLeave(async () => {
    if (noteBody.value) {
        await db.table('notes').update(noteId.value, {
            title: noteTitle.value,
            body: noteBody.value,
        })
    }
})
onBeforeMount(async () => {
    const id: string = $route.params.id as string
    const note: Note = await db.table('notes').where('id').equals(+id).first()
    noteTitle.value = note.title
    noteBody.value = note.body
    noteId.value = note.id
})
</script>