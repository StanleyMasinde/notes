<template>
    <section class="
      z-10
      h-screen
      fixed
      w-full
      top-0
      bg-white
      dark:bg-black dark:text-white
    ">
        <nav class="py-3">
            <ul class="flex justify-between">
                <li>
                    <svg @click="emit('close')" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </li>


                <li>
                    <ul class="flex gap-3 mr-1">
                        <li>
                            <svg @click="showEditForm = true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>

                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div class="px-2 prose">
            <h1>{{ note.title }}</h1>
            <small>{{ note.createdAt }}</small>
            <div v-html="marked.parse(note.body)"></div>
        </div>
    </section>

    <!--Form for editing a note-->
    <CreateOrEditNoteForm v-if="showEditForm" :model-value="note" @close-form="updateNote(note)" :edit-mode="true" />
    <!--/Form for editing a note-->
</template>
<script lang="ts" setup>
import { marked } from 'marked';
import { ref, Ref } from 'vue';
import CreateOrEditNoteForm from './CreateOrEditNoteForm.vue';
import { db } from '../db';
interface Note {
    id: number,
    title: string,
    body: string,
    createdAt: string
}
const props = defineProps<{
    note: Note
}>()
const emit = defineEmits(['close'])
const showEditForm: Ref<boolean> = ref(false)
const updateNote = async (note) => {
    // @ts-expect-error
    await db.notes.update(note.id, {
        title: note.title,
        body: note.body
    })
    showEditForm.value = false
}
</script>