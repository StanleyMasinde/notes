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
  <textarea v-model="noteBody" class="
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
import { Ref, ref } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { db } from '../db';


const noteBody: Ref<string> = ref('')
const noteTitle: Ref<string> = ref('')
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

// @ts-expect-error
const parsedUrl = new URL(window.location);
if (parsedUrl.searchParams.get('shared_title') || parsedUrl.searchParams.get('shared_text') || parsedUrl.searchParams.get('shared_url')) {
  const title = parsedUrl.searchParams.get('shared_title')
  const text = parsedUrl.searchParams.get('shared_text')
  const url = parsedUrl.searchParams.get('shared_url')

  if (title) {
    noteTitle.value = title
  }
  if (text) {
    noteBody.value = text
  }
  if (url) {
    noteBody.value += `\n\n${url}`
  }

  noteBody.value = noteBody.value.replace('null', '')
    .replace('undefined', '')
}
</script>