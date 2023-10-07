import '@testing-library/jest-dom'
import { describe, it } from 'vitest'
import { act, render } from '@testing-library/react'
import { CustomList } from './CustomList'
import { getCustomListData } from './CustomList.test-data'
import {
  ariaLabelHasDataAttribute,
  ariaLabelInTheDocument,
  ariaLabelNotInTheDocument,
  checkboxValueByAriaLabel,
  clickByAriaLabel,
  typeInInputByAriaLabel,
} from 'rtl-utils'
import { ReactNode, useState } from 'react'
import { IValue } from 'value-obj'

const CHECKBOX_ROW_ARIA_LABEL = 'Checkbox list element'
const CHECKBOX_ALL_ARIA_LABEL = 'Checkbox all elements'
const SEARCH_ARIA_LABEL = 'Filter Search'
const POSSIBLE = getCustomListData()

const ControlledCustomList = (): ReactNode => {
  const [selected, setSelected] = useState<Array<IValue>>([])
  return (
    <CustomList
      selected={selected}
      possible={POSSIBLE}
      onChange={setSelected}
    />
  )
}

describe('CustomList', () => {
  it('select one', async () => {
    render(<ControlledCustomList />)

    // nothing is selected
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, false, 0)
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, false, 1)

    // select the second
    await act(() => clickByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, 1))
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, false, 0)
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, true, 1)

    // select the first
    await act(() => clickByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, 0))
    await act(() => clickByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, 1))
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, true, 0)
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, false, 1)
  })

  it('filtering', async () => {
    render(<ControlledCustomList />)

    await ariaLabelInTheDocument(CHECKBOX_ROW_ARIA_LABEL, POSSIBLE.length)

    await act(() => typeInInputByAriaLabel(SEARCH_ARIA_LABEL, 'o'))
    await ariaLabelInTheDocument(CHECKBOX_ROW_ARIA_LABEL, 3)

    await act(() => typeInInputByAriaLabel(SEARCH_ARIA_LABEL, 'on'))
    await ariaLabelInTheDocument(CHECKBOX_ROW_ARIA_LABEL, 2)

    await act(() => typeInInputByAriaLabel(SEARCH_ARIA_LABEL, 'oni'))
    await ariaLabelNotInTheDocument(CHECKBOX_ROW_ARIA_LABEL)

    await act(() => typeInInputByAriaLabel(SEARCH_ARIA_LABEL, ''))
    await ariaLabelInTheDocument(CHECKBOX_ROW_ARIA_LABEL, POSSIBLE.length)
  })

  it('Check all / indeterminate', async () => {
    render(<ControlledCustomList />)

    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, false, 0)
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, false, 1)
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, false, 2)

    await checkboxValueByAriaLabel(CHECKBOX_ALL_ARIA_LABEL, false)
    await ariaLabelHasDataAttribute(
      CHECKBOX_ALL_ARIA_LABEL,
      'indeterminate',
      'false'
    )

    await act(() => clickByAriaLabel(CHECKBOX_ALL_ARIA_LABEL))

    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, true, 0)
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, true, 1)
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, true, 2)
    await checkboxValueByAriaLabel(CHECKBOX_ALL_ARIA_LABEL, true)
    await ariaLabelHasDataAttribute(
      CHECKBOX_ALL_ARIA_LABEL,
      'indeterminate',
      'false'
    )

    await act(() => clickByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, 1))

    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, true, 0)
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, false, 1)
    await checkboxValueByAriaLabel(CHECKBOX_ROW_ARIA_LABEL, true, 2)
    await checkboxValueByAriaLabel(CHECKBOX_ALL_ARIA_LABEL, false)
    await ariaLabelHasDataAttribute(
      CHECKBOX_ALL_ARIA_LABEL,
      'indeterminate',
      'true'
    )
  })
})
