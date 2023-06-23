import {mount} from '@vue/test-utils'
import Share from '../src/components/Share.vue'
import { expect, test } from 'vitest'

test('Share component', async () => {
    expect(Share).toBeTruthy()

    const wrapper = mount(Share, {props: {content: 'This is a note'}})

    wrapper.find('button').trigger('click')
})