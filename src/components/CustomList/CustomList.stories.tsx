import type { Meta, StoryObj } from '@storybook/react'
import { CustomList } from './CustomList.tsx'
import { Color, getCustomListData } from './CustomList.test-data.ts'
import { useArgs } from '@storybook/client-api'

const POSSIBLE_DATA = getCustomListData()
const POSSIBLE_COLORED_DATA = Color.getAll()

//--------------------------------------------------------------------------

type ComponentPropsType = Parameters<typeof CustomList>[0]
const meta = {
  title: 'Custom List',
  component: CustomList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      const [args, setArgs] = useArgs<ComponentPropsType>()

      args.onChange = (newValue) => {
        setArgs({
          ...args,
          selected: newValue,
        })
      }

      return (
        <div>
          <Story args={args} />
        </div>
      )
    },
  ],
} satisfies Meta<typeof CustomList>
type Story = StoryObj<typeof meta>

export default meta

//--------------------------------------------------------------------------

export const Primary: Story = {
  args: {
    possible: POSSIBLE_DATA,
    selected: [POSSIBLE_DATA[1], POSSIBLE_DATA[3]],
  },
}

export const Colored: Story = {
  args: {
    possible: POSSIBLE_COLORED_DATA,
    selected: [],
  },
}
