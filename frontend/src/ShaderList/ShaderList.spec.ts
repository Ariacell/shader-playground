
import { flushPromises, mount } from '@vue/test-utils';
import ShaderList from './ShaderList.vue';
import { describe, it, expect, vi, type MockedFunction } from 'vitest'; // if global: false in vite.config.js
import axios, { type AxiosResponse } from 'axios';
import { beforeEach } from 'node:test';
import type { ShaderListDataEntry } from '@/models/ShaderListDataEntry';

vi.mock('axios', () => {
    return {
        default: {
            post: vi.fn(),
            get: vi.fn(),
            delete: vi.fn(),
            put: vi.fn(),
            create: vi.fn().mockReturnThis(),
            interceptors: {
                request: {
                    use: vi.fn(),
                    eject: vi.fn(),
                },
                response: {
                    use: vi.fn(),
                    eject: vi.fn(),
                },
            },
        },
    };
});

describe('ShaderList', () => {
    beforeEach(() => {
        (axios.get as MockedFunction<typeof axios.post>).mockResolvedValue(
            () => Promise.resolve({ status: 200 })
        );
    })
    it('has a heading for the list of available shaders', () => {
        (axios.get as MockedFunction<typeof axios.post>).mockResolvedValue(
            () => Promise.resolve({ status: 200 }))
        const wrapper = mount(ShaderList);
        expect(wrapper.text()).toContain('Available shaders to load:');
    });

    it('emits an event on button click', async () => {
        const mockShaderListData: ShaderListDataEntry[] = [{
            id: "blah",
            title: "some title",
            content: "version #330\nuniform blah;",
            author: "me"
        }];
        (axios.get as MockedFunction<typeof axios.post>).mockResolvedValue(
            Promise.resolve<Partial<AxiosResponse>>({ status: 200, data: mockShaderListData })
        );
        const wrapper = mount(ShaderList);
        await flushPromises();
        const firstEntry = expect(wrapper.text()).toContain(mockShaderListData[0]?.title);
    });
});