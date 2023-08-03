import { mount } from '@vue/test-utils'
import Share from '../src/components/Share.vue'
import { expect, test } from 'vitest'

test('Share component', async () => {
    expect(Share).toBeTruthy()
    const content = '#This is a note\n'
    const expectedTwitterLink = new URL('https://twitter.com/intent/tweet')
    expectedTwitterLink.searchParams.append('text', content)

    const expectedWhatAppLink = new URL('https://wa.me')
    expectedWhatAppLink.searchParams.append('text', content)

    const expectedTelegramShareLink = new URL('https://t.me/share/url')
    expectedTelegramShareLink.searchParams.append('url', content)
    
    const wrapper = mount(Share, { props: { content } })

    await wrapper.find('button#shareButton').trigger('click')
    expect(wrapper.html()).contains('Share this note')
    const twitterShareLink = wrapper.find('a#twitter').attributes('href')
    const whatsAppShareLink = wrapper.find('a#whatsApp').attributes('href')
    const telegramShareLink = wrapper.find('a#shareTelegram').attributes('href')
    expect(twitterShareLink).toBe(expectedTwitterLink.toString())
    expect(whatsAppShareLink).toBe(expectedWhatAppLink.toString())
    expect(telegramShareLink).toBe(expectedTelegramShareLink.toString())
})