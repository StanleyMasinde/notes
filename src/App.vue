<template>
  <div class="text-center dark:bg-black dark:text-white h-64 flex justify-center align-middle flex-col px-2">
    <div>
      <h1 class=" text-3xl">All notes</h1>
      <p class=" font-light">0 notes</p>
    </div>
  </div>

  <nav class="flex justify-between px-2 sticky top-0 bg-white dark:bg-black dark:text-white py-3">
    {{ topPos }}
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

  <section class="grid grid-cols-2 px-2 gap-1 dark:bg-black pt-2">
    <div v-for="i in 50" :key="i" class="border-2 h-52 rounded-2xl dark:bg-gray-900 dark:text-white">
      Hohohho
    </div>
  </section>

  <div class=" fixed bottom-1 right-1">
    <button class=" bg-white dark:bg-black dark:text-white p-4 rounded-full shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
        stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
// 
</script>
