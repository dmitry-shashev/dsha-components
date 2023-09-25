import '@testing-library/jest-dom'
import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { CustomList } from './CustomList'
import { getCustomListData } from './CustomList.test-data'
import { textInTheDocument } from 'rtl-utils'

describe('CustomList', () => {
  it('temp test', async () => {
    const data = getCustomListData()
    render(<CustomList selected={[]} possible={data} onChange={() => null} />)
    await textInTheDocument('Two tuesday')
  })
})
