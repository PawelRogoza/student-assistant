// import { enableFetchMocks } from 'jest-fetch-mock'
// enableFetchMocks()
import { shallowMount } from '@vue/test-utils'
import Notatki from '../../src/views/Notatki.vue'

global.fetch = jest.fn(() => Promise.resolve());

describe('Notatki', () => {
    test('wyświetlanie listy notatek', async () => {
        const wrapper = shallowMount(Notatki)

        await wrapper.setData({pokazNotatke: true})

        expect(wrapper.find('.notatkiLista').exists()).toBe(true)
    }),

    test('wyświetlanie formularza edycji', async () => {
        const wrapper = shallowMount(Notatki)

        await wrapper.setData({pokazFormularz: true})

        expect(wrapper.find('#editForm').exists()).toBe(true)
    })

    // test('ustawienie stylu dla ważnych notatek', async() => {
    //     const wrapper = shallowMount(Notatki)

        
    // })
})