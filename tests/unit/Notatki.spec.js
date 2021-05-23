import { mount } from '@vue/test-utils'
import Notatki from '../../src/views/Notatki.vue'

describe('Notatki', () => {
    test('Pokaż formularz edycji', async() => {
        const wrapper = mount(Notatki)

        await wrapper.setData({pokazFormularz: true})

        expect(wrapper.find("#editform").exists()).toBe(true)
    })
})