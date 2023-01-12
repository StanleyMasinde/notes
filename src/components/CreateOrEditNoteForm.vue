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
            @keydown.enter.prevent="noteBodyFocus"
            @keydown.down="noteBodyFocus"
            ref="noteTitleRef"
          />
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
      ref="noteBodyRef"
      @keydown.up="noteTitleRef.focus()"
    ></textarea>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
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
});

const noteBodyRef = ref(null)
const noteTitleRef = ref(null)

const noteBodyFocus = () => {
  if(props.modelValue.title) noteBodyRef.value.focus()
};

</script>