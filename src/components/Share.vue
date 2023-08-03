<script lang="ts" setup>
import { ref } from 'vue';

enum Socials {
    TWITTER,
    WHATSAPP,
    TELEGRAM
}

const props = defineProps<{
    content: string
}>()

const showToast = ref(false)
const showShareDialog = ref(false)

// Function to share the note
const shareNote = async () => {
    try {
        if (navigator.share) {
            return await navigator.share({
                title: 'Shared note',
                text: props.content
            })
        }

        showShareDialog.value = true
    } catch (error) {
        // TODO: Handle this error properly
        throw error
    }
}

// Function to copy text to clipboard
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(props.content)
        showToast.value = true
        setTimeout(() => {
            showToast.value = false
        }, 5000)
    } catch (error) {
        // TODO: Handle this error properly
        throw error
    }
}

const shareIntent = (social: Socials): string  => {
    let shareUrl: URL = new URL('https://example.com')
    switch (social) {
        case Socials.TELEGRAM: {
            const url = new URL('https://t.me/share/url')
            url.searchParams.append('url', props.content)
            shareUrl = url
        }
        break;
        case Socials.TWITTER: {
            const url = new URL('https://twitter.com/intent/tweet')
            url.searchParams.append('text', props.content)
            shareUrl = url
        }
        break;
        case Socials.WHATSAPP:
            const url = new URL('https://wa.me/')
            url.searchParams.append('text', props.content)
            shareUrl = url
            break
        default:
            break;
    }

    return shareUrl.toString()
}
</script>

<template>
    <button id="shareButton" @click.prevent="shareNote">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-7 h-7 cursor-pointer dark:text-white">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
    </button>

    <div v-if="showShareDialog" class="fixed inset-0 grid place-items-center backdrop-blur backdrop-brightness-50 dark:backdrop-brightness-100">
        <div>
            <div class="bg-white/50 dark:bg-black/50 dark:shadow-white dark:shadow w-96 rounded-xl shadow-md p-5 flex flex-col gap-10 backdrop-blur-lg ">
                <div>
                    <h1 class=" text-xl font-bold">Share this note</h1>
                </div>
                <div class="flex justify-center gap-5">
                    <a id="twitter" :href="shareIntent(Socials.TWITTER)" target="_blank" title="Twitter">
                        <svg class=" h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 276" fill="#3ba9ee">
                            <path
                                d="m302 70a195 195 0 0 1 -299 175 142 142 0 0 0 97 -30 70 70 0 0 1 -58 -47 70 70 0 0 0 31 -2 70 70 0 0 1 -57 -66 70 70 0 0 0 28 5 70 70 0 0 1 -18 -90 195 195 0 0 0 141 72 67 67 0 0 1 116 -62 117 117 0 0 0 43 -17 65 65 0 0 1 -31 38 117 117 0 0 0 39 -11 65 65 0 0 1 -32 35" />
                        </svg>
                    </a>
                    <a id="shareTelegram" target="_blank" :href="shareIntent(Socials.TELEGRAM)" title="Telegram">
                        <svg class="h-10" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                            <g>
                                <path
                                    d="M128,0 C57.307,0 0,57.307 0,128 L0,128 C0,198.693 57.307,256 128,256 L128,256 C198.693,256 256,198.693 256,128 L256,128 C256,57.307 198.693,0 128,0 L128,0 Z"
                                    fill="#40B3E0">

                                </path>
                                <path
                                    d="M190.2826,73.6308 L167.4206,188.8978 C167.4206,188.8978 164.2236,196.8918 155.4306,193.0548 L102.6726,152.6068 L83.4886,143.3348 L51.1946,132.4628 C51.1946,132.4628 46.2386,130.7048 45.7586,126.8678 C45.2796,123.0308 51.3546,120.9528 51.3546,120.9528 L179.7306,70.5928 C179.7306,70.5928 190.2826,65.9568 190.2826,73.6308"
                                    fill="#FFFFFF">

                                </path>
                                <path
                                    d="M98.6178,187.6035 C98.6178,187.6035 97.0778,187.4595 95.1588,181.3835 C93.2408,175.3085 83.4888,143.3345 83.4888,143.3345 L161.0258,94.0945 C161.0258,94.0945 165.5028,91.3765 165.3428,94.0945 C165.3428,94.0945 166.1418,94.5735 163.7438,96.8115 C161.3458,99.0505 102.8328,151.6475 102.8328,151.6475"
                                    fill="#D2E5F1">

                                </path>
                                <path
                                    d="M122.9015,168.1154 L102.0335,187.1414 C102.0335,187.1414 100.4025,188.3794 98.6175,187.6034 L102.6135,152.2624"
                                    fill="#B5CFE4">

                                </path>
                            </g>
                        </svg>
                    </a>
                    <a id="whatsApp" :href="shareIntent(Socials.WHATSAPP)" target="_blank" title="whatsApp">
                        <svg class="h-10" viewBox="-2.73 0 1225.016 1225.016" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
                            <path fill="#E0E0E0"
                                d="M1041.858 178.02C927.206 63.289 774.753.07 612.325 0 277.617 0 5.232 272.298 5.098 606.991c-.039 106.986 27.915 211.42 81.048 303.476L0 1225.016l321.898-84.406c88.689 48.368 188.547 73.855 290.166 73.896h.258.003c334.654 0 607.08-272.346 607.222-607.023.056-162.208-63.052-314.724-177.689-429.463zm-429.533 933.963h-.197c-90.578-.048-179.402-24.366-256.878-70.339l-18.438-10.93-191.021 50.083 51-186.176-12.013-19.087c-50.525-80.336-77.198-173.175-77.16-268.504.111-278.186 226.507-504.503 504.898-504.503 134.812.056 261.519 52.604 356.814 147.965 95.289 95.36 147.728 222.128 147.688 356.948-.118 278.195-226.522 504.543-504.693 504.543z" />
                            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="609.77" y1="1190.114" x2="609.77"
                                y2="21.084">
                                <stop offset="0" stop-color="#20b038" />
                                <stop offset="1" stop-color="#60d66a" />
                            </linearGradient>
                            <path fill="url(#a)"
                                d="M27.875 1190.114l82.211-300.18c-50.719-87.852-77.391-187.523-77.359-289.602.133-319.398 260.078-579.25 579.469-579.25 155.016.07 300.508 60.398 409.898 169.891 109.414 109.492 169.633 255.031 169.57 409.812-.133 319.406-260.094 579.281-579.445 579.281-.023 0 .016 0 0 0h-.258c-96.977-.031-192.266-24.375-276.898-70.5l-307.188 80.548z" />
                            <image overflow="visible" opacity=".08" width="682" height="639"
                                transform="translate(270.984 291.372)" />
                            <path fill-rule="evenodd" clip-rule="evenodd" fill="#FFF"
                                d="M462.273 349.294c-11.234-24.977-23.062-25.477-33.75-25.914-8.742-.375-18.75-.352-28.742-.352-10 0-26.25 3.758-39.992 18.766-13.75 15.008-52.5 51.289-52.5 125.078 0 73.797 53.75 145.102 61.242 155.117 7.5 10 103.758 166.266 256.203 226.383 126.695 49.961 152.477 40.023 179.977 37.523s88.734-36.273 101.234-71.297c12.5-35.016 12.5-65.031 8.75-71.305-3.75-6.25-13.75-10-28.75-17.5s-88.734-43.789-102.484-48.789-23.75-7.5-33.75 7.516c-10 15-38.727 48.773-47.477 58.773-8.75 10.023-17.5 11.273-32.5 3.773-15-7.523-63.305-23.344-120.609-74.438-44.586-39.75-74.688-88.844-83.438-103.859-8.75-15-.938-23.125 6.586-30.602 6.734-6.719 15-17.508 22.5-26.266 7.484-8.758 9.984-15.008 14.984-25.008 5-10.016 2.5-18.773-1.25-26.273s-32.898-81.67-46.234-111.326z" />
                            <path fill="#FFF"
                                d="M1036.898 176.091C923.562 62.677 772.859.185 612.297.114 281.43.114 12.172 269.286 12.039 600.137 12 705.896 39.633 809.13 92.156 900.13L7 1211.067l318.203-83.438c87.672 47.812 186.383 73.008 286.836 73.047h.255.003c330.812 0 600.109-269.219 600.25-600.055.055-160.343-62.328-311.108-175.649-424.53zm-424.601 923.242h-.195c-89.539-.047-177.344-24.086-253.93-69.531l-18.227-10.805-188.828 49.508 50.414-184.039-11.875-18.867c-49.945-79.414-76.312-171.188-76.273-265.422.109-274.992 223.906-498.711 499.102-498.711 133.266.055 258.516 52 352.719 146.266 94.195 94.266 146.031 219.578 145.992 352.852-.118 274.999-223.923 498.749-498.899 498.749z" />
                        </svg>
                    </a>
                    <li title="Clipboard">
                        <button @click="copyToClipboard()">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-10 dark:text-white">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                            </svg>
                        </button>
                    </li>
                </div>

                <div class="flex justify-center">
                    <button @click.prevent="showShareDialog = false" class="bg-blue-500 text-white rounded-lg px-5 py-2">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!--Clipboard toast-->
    <div v-if="showToast" class="fixed inset-x-0 bottom-2 flex justify-center">
        <div class="relative bg-white/50 dark:bg-black/50 dark:text-white dark:shadow-white px-5 shadow-md dark:shadow rounded-lg w-56 py-4">
            <h1>Note copied to clipboard!</h1>
        </div>
    </div>
    <!--Clipboard toast-->
</template>