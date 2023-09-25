import { IValue } from 'value-obj'
import { StructEnum } from 'struct-enum'

//----------------------------------------------------------------

export const getCustomListData = (): Array<IValue> => [
  {
    id: 1,
    label: 'One monday',
    value: 'one',
  },
  {
    id: 2,
    label: 'Two tuesday',
    value: 'two',
  },
  {
    id: 3,
    label: 'Three',
    value: 'three',
  },
  {
    id: 4,
    label: 'Four some very long label',
    value: 'Four',
  },
  {
    id: 5,
    label: 'Five',
    value: 'five',
  },
  {
    id: 6,
    label: 'Six',
    value: 'six',
  },
]

//----------------------------------------------------------------

interface ColorValue extends IValue {
  label: string
  value: string
  color: '' | '#f00' | '#0f0' | '#00f'
}

class Color extends StructEnum<Color, ColorValue> {
  EMPTY = this.buildValue({
    label: '',
    value: '',
    color: '',
  })

  RED = this.buildValue({
    label: 'Red',
    value: 'red',
    color: '#f00',
  })

  GREEN = this.buildValue({
    label: 'Green',
    value: 'green',
    color: '#0f0',
  })

  BLUE = this.buildValue({
    label: 'Blue',
    value: 'blue',
    color: '#00f',
  })
}

const obj: Readonly<Color> = new Color()
export { obj as Color }
