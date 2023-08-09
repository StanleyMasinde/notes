[![Netlify Status](https://api.netlify.com/api/v1/badges/a3e32b59-108f-4d8a-b9ba-b8d5e4e811e6/deploy-status)](https://app.netlify.com/sites/notes-n/deploys)

# Notes App
> Inspired by Samsung notes. I wanted to create a web application with the same features as the Samsung notes web application.

### How it works
This application is meant to work completely offline. You only need to connect to the internet when installing it or when there is a new update. The underlying tech is the [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) API. 
All your notes are stored on your device's browser storage so clearing your browser data will also delete your notes. You can try it [here](https://notes-n.netlify.app) 

### Tech used
* [Tailwind.CSS](https://tailwindcss.com) for styling.
* [Dexie.JS](https://dexie.org) A wrapper around somewhat complex indexed db.
* [Vue.JS](https://vuejs.org) needs no introduction.
* [Vue Router](https://router.vuejs.org) The offlicial routing library for Vue.JS.
* [Netlify hosting](https://www.netlify.com) focus on the product not hosting.
* [Marked](https://marked.js.org) For Markdown support.
* [Vite](https://vitejs.dev) Next generation frontend tooling.
* [Cypress](https://cypress.io) Test. Automate. Accelerate.
* [Vitest](https://vitest.dev) Blazing Fast Unit Test Framework.
* [Vue Test Utils](https://test-utils.vuejs.org) The official testing suite utils for Vue.js 3.

### Features
* Installable as a PWA.
* Works fully offline.
* Share text from other apps to this one.
* Dark mode uses the system preference.
* Super small in size (This is where we beat native apps).
* You can search your notes.


### Screenshots
<div style="display: flex; gap: 3px; border: 1px solid black">
 <img width="150" alt="Light mode" src="https://user-images.githubusercontent.com/35426405/188124054-e980b2bc-0d88-46e3-b562-d9820a069f6d.png">
 <img width="150" alt="Dark mode" src="https://user-images.githubusercontent.com/35426405/188124536-27185bc5-1d98-4438-a536-ac093435001c.png">
 <img width="150" alt="Creation in dark mode" src="https://user-images.githubusercontent.com/35426405/188125587-38812da2-2e39-41bf-aa44-0065a04d2db8.png">
 <img width="150" alt="With one note" src="https://user-images.githubusercontent.com/35426405/188125801-441a8327-7868-4ade-8b69-b27cabc4815c.png">
</div>

### Development
This project uses [PNPM](https://https://pnpm.io) for as a package manager. Please maker sure it is installed.
1. Clone this repositoty
2. Install dependencies with `pnpm install`
3. Run `pnpm run dev` and you make changes.
4. Preview live changes on while editing <http://localhost:5137>

#### TDD
When developing features that are not UI specific e.g component behaviour, it will be a better experience to use the TDD format. Both testing tools in this project support this.
##### Use cases
 - When building Vue components (SFCs)
 - When working on a user flow e.g how the application handles typing

1. For SFCs `pnpm run test:unit`. This will launch vitest and you can continue to build your application with tests running on every save. This assumes you have already written tests for your expected behaviour. You can also use Cypress for [component testing](https://docs.cypress.io/guides/component-testing/overview). The Vitest version uses [Vue test utils](https://test-utils.vuejs.org).
2. For end to end testing, this project uses [Cypress](https://cypress.io). To get started, run
```shell
pnpm run build
pnpm run test:e2e
```


### Contributions && suggestions
This project uses both [Vitest](https://vitest.dev) and [Cypress](https://cypress.io) for testing.

Write your unit test in the \_tests_ directory and e2e tests in `cypress/e2e` directory.

All contributions are welcome. If you have suggestions or you'd like to raise a bug raise an issue. 
Thank you for Stopping by.

