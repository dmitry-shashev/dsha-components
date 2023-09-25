import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { CustomList } from './CustomList'
import { getCustomListData } from './CustomList.test-data'

describe('CustomList', () => {
  it('temp test', async () => {
    const data = getCustomListData()
    const { findByRole } = render(
      <CustomList selected={[]} possible={data} onChange={() => null} />
    )
    const elem = await findByRole('custom-list')
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(elem).toHaveTextContent(data[1].label!)
  })
})
