import { mount } from '@vue/test-utils'
import Przedmiot from '../../src/views/Przedmioty.vue'

jest.mock('../../db.json')


describe('Przedmioty', () => {
    test('poprawne przekazywanie danych użytkownika z formularza do zmiennych', async () => {
        const wrapper = mount(Przedmiot)

        await wrapper.get('[data-test="przedmiot"]').setValue("vue")
        await wrapper.get('[data-test="zaliczenie"]').setValue("zaliczenie")
        await wrapper.get('[data-test="termin"]').setValue("2021-05-31")
        await wrapper.get('[data-test="notatka"]').setValue("vue web app")
        await wrapper.get('[data-test="wazne"]').setValue(true)

        expect(wrapper.vm.przedmiot).toBe("vue")
        expect(wrapper.vm.zaliczenie).toBe("zaliczenie")
        expect(wrapper.vm.termin).toBe("2021-05-31")
        expect(wrapper.vm.notatka).toBe("vue web app")
        expect(wrapper.vm.wazne).toBe(true)
    })


})