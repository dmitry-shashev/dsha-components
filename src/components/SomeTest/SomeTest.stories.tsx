import type { Meta, StoryObj } from '@storybook/react'
import { SomeTest } from './SomeTest.tsx'

const meta = {
  title: 'Some Test Component',
  component: SomeTest,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SomeTest>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Hi',
  },
}
