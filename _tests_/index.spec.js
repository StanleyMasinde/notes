import { mount } from '@vue/test-utils'
import Share from '../src/components/Share.vue'
import { expect, test } from 'vitest'

test('Share component', async () => {
    expect(Share).toBeTruthy()
    const content = '#This is a note\n'
    const urlParamsFormat = new URLSearchParams(content).toString().replace('=', '');
    console.log(urlParamsFormat.toString());
    const wrapper = mount(Share, { props: { content } })

    await wrapper.find('button#shareButton').trigger('click')
    expect(wrapper.html()).contains('Share this note')
    const twitterShareLink = wrapper.find('a#twitter').attributes('href')
    const whatsAppShareLink = wrapper.find('a#whatsApp').attributes('href')
    const telegramShareLink = wrapper.find('a#shareTelegram').attributes('href')
    console.log(twitterShareLink, whatsAppShareLink, telegramShareLink);
    expect(twitterShareLink).toBe(`https://twitter.com/intent/tweet?text=${urlParamsFormat}`)
    expect(whatsAppShareLink).toBe(`https://wa.me/?text=${urlParamsFormat}`)
    expect(telegramShareLink).toBe(`https://t.me/share/url?url=${urlParamsFormat}`)
})