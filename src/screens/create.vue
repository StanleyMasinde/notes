<template>
  <nav class="py-3">
    <ul class="grid grid-cols-11">
      <li>
        <RouterLink to="/">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-10 text-2xl cursor-pointer dark:text-white" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
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
            " placeholder="Title" ref="noteTitleRef" />
      </li>
    </ul>
  </nav>
  <textarea ref="noteBodyRef" id="body" v-model="noteBody" class="
        w-screen
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
import { Ref, onMounted, ref } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { db } from '../db';

interface ShareSchema {
  shared_title?: string,
  shared_text?: string,
  shared_url?: string
}


const noteBody: Ref<string | undefined> = ref('')
const noteTitle: Ref<string | undefined> = ref('')
const noteTitleRef: Ref<HTMLInputElement | null> = ref(null)
const noteBodyRef: Ref<HTMLTextAreaElement | null> = ref(null)
const $route = useRoute()

onBeforeRouteLeave(async () => {
  if (noteBody.value) {
    await db.table('notes').put({
      title: noteTitle.value,
      body: noteBody.value,
      createdAt: new Date()
    })
  }
})

const shareObject: ShareSchema = $route.query
if (shareObject.shared_title || shareObject.shared_text || shareObject.shared_url) {
  const { shared_title, shared_text, shared_url } = shareObject
  noteTitle.value = shared_title
  noteBody.value = shared_text
  noteBody.value += `\n\n${shared_url}`
  noteBody.value = noteBody.value?.replace('null', '')
    .replace('undefined', '')
}

onMounted(() => {
  noteTitleRef.value?.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') {
      noteBodyRef.value?.focus()
    }
  })
})
</script>