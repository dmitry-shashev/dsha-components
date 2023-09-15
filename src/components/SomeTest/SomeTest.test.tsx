import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { SomeTest } from './SomeTest.tsx'

describe('SomeTest', () => {
  it('simple check', async () => {
    const { findByRole } = render(<SomeTest label="One" />)

    const elem = await findByRole('toster')
    expect(elem).toHaveTextContent('One')
  })
})
