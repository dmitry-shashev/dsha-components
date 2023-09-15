import { FC } from 'react'
import { css } from '@emotion/react'
import { Button } from '@mui/material'

interface Props {
  label: string
}

export const SomeTest: FC<Props> = ({ label }) => {
  const id = 'some-id'
  return (
    <div
      role="toster"
      id={id}
      css={css`
        color: purple;

        & > div {
          font-size: 24px;
        }
      `}
    >
      <Button>Hello</Button>
      <div>{label}</div>
    </div>
  )
}
