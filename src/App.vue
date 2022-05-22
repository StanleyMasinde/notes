<template>
  <div class="text-center dark:bg-black dark:text-white h-64 flex justify-center align-middle flex-col px-2">
    <div>
      <h1 class=" text-3xl">All notes</h1>
      <p class=" font-light">{{ notes.length }} {{ notes.length === 1 ? 'note' : 'notes' }}</p>
    </div>
  </div>

  <nav class="flex justify-between px-2 sticky top-0 bg-white dark:bg-black dark:text-white py-3">
    <ul>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </li>
    </ul>

    <ul class="flex">
      <li class="mx-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      </li>
    </ul>
  </nav>

  <div v-if="notes.length === 0" class="text-center h-[69vh] flex flex-col justify-center">
    <div>
      <h1 class=" text-2xl font-semibold">You have no notes</h1>
      <p class=" text-lg font-thin">Click the button on the bottom right to create the first one</p>
    </div>
  </div>

  <section v-else class="grid grid-cols-2 px-2 gap-1 dark:bg-black pt-2 dark:text-white min-h-[60vh]">
    <div v-for="(note, i) in notes" :key="i" @click.prevent="editNote(note)">
      <div class="border-2 h-52 rounded-2xl dark:bg-gray-900 dark:text-white px-2 py-2">
        <p class=" text-xs">{{ note.body }}</p>
      </div>
      <div class="text-center">
        <h1 class=" font-semibold">{{ note.title }}</h1>
        <p class=" font-thin text-sm">{{ new Date(note.createdAt).toLocaleDateString() }} {{ new Date(note.createdAt).toLocaleTimeString() }}</p>
      </div>
    </div>
  </section>


  <!--Floating button for adding a new note-->
  <div class=" fixed bottom-1 right-1">
    <button @click="toggleCreateForm" class=" bg-white dark:bg-black dark:text-white p-4 rounded-full shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  </div>
  <!--/Floating button for adding a new note-->

  <!--Form for creating a new note-->
  <section v-if="showCreateForm" class=" z-10 h-screen fixed w-full top-0 bg-white dark:bg-black dark:text-white">
    <nav class="py-3">
      <ul class="grid grid-cols-11">
        <li>
          <svg @click="toggleCreateForm" xmlns="http://www.w3.org/2000/svg" class="h-12 w-10 text-2xl" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </li>
        <li class=" col-span-9">
          <input v-model="newNoteData.title" type="text" name="title" id="title"
            class="border-0 w-full caret-[#ffe500] dark:bg-black focus:ring-0 placeholder:font-semibold placeholder:text-2xl text-2xl"
            placeholder="Title">
        </li>
      </ul>
    </nav>
    <textarea autofocus v-model="newNoteData.body"
      class="w-screen h-screen dark:bg-black border-0 focus:ring-0 caret-[#3a3500] dark:caret-[#ffe500] text-xl"></textarea>
  </section>
  <!--/Form for creating a new note-->

  <!--Form for editing a note-->
  <section v-if="showEditForm" class=" z-10 h-screen fixed w-full top-0 bg-white dark:bg-black dark:text-white">
    <nav class="py-3">
      <ul class="grid grid-cols-11">
        <li>
          <svg @click="updateNote(currentNote)" xmlns="http://www.w3.org/2000/svg" class="h-12 w-10 text-2xl" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </li>
        <li class=" col-span-9">
          <input v-model="currentNote.title" type="text" name="title" id="title"
            class="border-0 w-full caret-[#ffe500] dark:bg-black focus:ring-0 placeholder:font-semibold placeholder:text-2xl text-2xl"
            placeholder="Title">
        </li>
      </ul>
    </nav>
    <textarea v-model="currentNote.body"
      class="w-screen h-screen dark:bg-black border-0 focus:ring-0 caret-[#ffe500] text-xl"></textarea>
  </section>
  <!--/Form for editing a note-->
</template>

<script setup>
import { reactive, ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { db } from './db';

const showCreateForm = ref(false)
const showEditForm = ref(false)
const notes = ref([])
const newNoteData = reactive({
  title: null,
  body: null
})
const currentNote = reactive({
  id: null,
  title: null,
  body: null
})

const getNotes = async () => {
  const nts = await db.notes.reverse().toArray()
  notes.value = nts
  return
}

const editNote = async (note) => {
  const nt = await db.notes.where({
    id: note.id
  }).first()
  currentNote.id = nt.id
  currentNote.title = nt.title
  currentNote.body = nt.body
  showEditForm.value = true
}

const updateNote = async (note) => {
  await db.notes.update(note.id, {
    title: note.title,
    body: note.body
  })
  getNotes()
  showEditForm.value = false
}

onMounted(() => {
  getNotes()
})

const toggleCreateForm = () => {
  if (showCreateForm.value) {
    if (newNoteData.body) {
      db.notes.put({
        title: newNoteData.title,
        body: newNoteData.body,
        createdAt: new Date()
      })
      getNotes()
      newNoteData.title = null
      newNoteData.body = null
    }
  }
  showCreateForm.value = !showCreateForm.value
}
</script>
