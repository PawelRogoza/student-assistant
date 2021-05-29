import { mount } from '@vue/test-utils'
import Notatki from '../../src/views/Notatki.vue'


describe('Notatki', async () => {
    test('wyświetlanie listy notatek', async () => {
        const wrapper = mount(Notatki)

        await wrapper.setData({ pokazNotatke: true })

        expect(wrapper.find('.notatkiLista').exists()).toBe(true)
    }),

    test('wyświetlanie formularza do edycji notatki', async () => {
        const wrapper = mount(Notatki)

        await wrapper.setData({pokazFormularz: true})
    })
})