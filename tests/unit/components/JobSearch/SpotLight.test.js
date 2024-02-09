import {
  render,
  screen,
} from '@testing-library/vue'

import axios from 'axios'

import SpotLight from '@/components/JobSearch/SpotLight.vue'

vi.mock('axios')

describe('SpotLight', () => {
  const mockSpotLightResponse = (
    spotlight = {}
  ) => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'some image',
          title: 'some title',
          description: 'some description',
          ...spotlight,
        },
      ],
    })
  }
  it('provides an image to parent component', async () => {
    mockSpotLightResponse({ img: 'some image' })
    render(SpotLight, {
      slots: {
        default: `<template #default="{img}">
                    <img :src="img" alt="post image"  />
                  </template>`,
      },
    })

    const img = await screen.findByRole('img', {
      name: /post image/i,
    })

    expect(img).toBeInTheDocument()
  })
  it('provides a title to parent component', async () => {
    mockSpotLightResponse({ title: 'some title' })
    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
                    <h1>{{slotProps.title}}</h1>
                  </template>`,
      },
    })

    const text =
      await screen.findByText('some title')
    expect(text).toBeInTheDocument()
  })
  it('provides a title to descirption component', async () => {
    mockSpotLightResponse({
      description: 'some description',
    })
    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
                    <h1>{{slotProps.description}}</h1>
                  </template>`,
      },
    })

    const text = await screen.findByText(
      'some description'
    )
    expect(text).toBeInTheDocument()
  })
})
