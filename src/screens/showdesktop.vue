<template>
    <main class="flex justify-center">
        <div class="px-2 prose dark:prose-invert">
            <h1>{{ note?.title }}</h1>
            <small>{{ note?.createdAt }}</small>
            <div v-if="note.body" v-html="marked.parse(note?.body || '')"></div>
        </div>
    </main>
</template>
<script lang="ts" setup>
import { marked } from 'marked';
import { onBeforeMount, ref, Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '../db';

interface Note {
    id: number,
    title: string,
    body: string,
    createdAt: string
}

const note: Ref<Note> = ref({ id: 0, title: '', body: '', createdAt: '' })
const $route = useRoute()

watch(
    () => $route.params,
    async (current, old) => {
        console.log(current, old);
        const noteId = current.id as string
        await getNoteFromDb(noteId)
    }
)

async function getNoteFromDb(id: string) {
    note.value = await db.table('notes').where('id').equals(+id).first();
}
onBeforeMount(async () => {
    const id: string = $route.params.id as string
    await getNoteFromDb(id);
})
</script>