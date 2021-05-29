import { mount } from '@vue/test-utils'
import Kalkulator from '../../src/views/Kalkulator.vue';


describe('Kalkulator', () => {
    test('dodawanie nowych ocen do listy przy użyciu przycisku', async () => {
        const wrapper = mount(Kalkulator)

        await wrapper.get('.ocenaTest').setValue(5)
        await wrapper.find('.dodajOcene').trigger('click')

        expect(wrapper.findAll('.oceny').length).toBe(1)
    }),

        test('dodawanie nowych ocen do listy przy wcisnięciu enter', async () => {
            const wrapper = mount(Kalkulator)

            await wrapper.get('.ocenaTest').setValue(3)
            await wrapper.find('.ocenaTest').trigger('keypress.enter')

            expect(wrapper.findAll('.oceny').length).toBe(1)
        }),

        test('usuwanie ocen z listy', async () => {
            const wrapper = mount(Kalkulator)

            await wrapper.setData({ oceny: [5, 4] })
            await wrapper.find('.usunOcene').trigger('click')

            expect(wrapper.findAll('.oceny').length).toBe(1)
        }),

        test('obliczenie średniej ocen z listy', async () => {
            const wrapper = mount(Kalkulator)

            await wrapper.setData({ oceny: [5, 3] })
            await wrapper.find('.obliczSrednia').trigger('click')

            expect(wrapper.vm.suma).toBe(4)

        }),

        test('wyświetlanie komunikatu o błędzie przy wpisaniu niepoprawnej wartości', async () => {
            const wrapper = mount(Kalkulator)

            await wrapper.get('.ocenaTest').setValue('niepoprawna ocena')
            await wrapper.find('.ocenaTest').trigger('keypress.enter')

            expect(wrapper.vm.pokazEnter).toBe(true)
            expect(wrapper.find('.errorMessage').exists()).toBe(true)
        }),

        test('wyświetlanie średniej', async () => {
            const wrapper = mount(Kalkulator)

            await wrapper.setData({ pokazSrednia: true })
            expect(wrapper.find('.srednia').exists()).toBe(true)

            await wrapper.setData({ pokazSrednia: false })
            expect(wrapper.find('.srednia').exists()).toBe(false)
        })
})