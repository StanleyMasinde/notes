<template>
  <section
    class="
      z-10
      h-screen
      fixed
      w-full
      top-0
      bg-white
      dark:bg-black dark:text-white
    "
  >
    <nav class="py-3">
      <ul class="grid grid-cols-11">
        <li>
          <svg
            @click="$emit('closeForm')"
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-10 text-2xl cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </li>
        <li class="col-span-9">
          <input
            v-model="noteData.title"
            type="text"
            name="title"
            id="title"
            v-auto-focus
            class="
              border-0
              w-full
              caret-[#ffe500]
              dark:bg-black
              focus:ring-0
              placeholder:font-semibold placeholder:text-2xl
              text-2xl
            "
            placeholder="Title"
          />
        </li>
        <li>
          <svg v-if="editMode" @click.prevent="" xmlns="http://www.w3.org/2000/svg" class="h-12 w-8 text-2xl" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </li>
      </ul>
    </nav>
    <textarea
      v-model="noteData.body"
      class="
        w-screen
        h-screen
        dark:bg-black
        border-0
        focus:ring-0
        caret-[#3a3500]
        dark:caret-[#ffe500]
        text-xl
      "
    ></textarea>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { vAutoFocus } from "../directives/vAutoFocus";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  editMode: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:ModelValue', 'closeForm'])

const noteData = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:ModelValue', value)
})
</script>