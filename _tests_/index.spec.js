import {mount} from '@vue/test-utils'
import indexVue from '../src/screens/index.vue'
import { expect, test } from 'vitest'

test('Mount page', async () => {
    expect(indexVue).toBeTruthy()
})