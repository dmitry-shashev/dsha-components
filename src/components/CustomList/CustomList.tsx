import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { IValue, vuFilterByString, vuRemoveFromArr } from 'value-obj'
import {
  Checkbox,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface Props<T extends IValue> {
  selected: ReadonlyArray<T>
  possible: ReadonlyArray<T>
  onChange: (newSelected: Array<T>) => void
  placeholder?: string
  compareField?: keyof T
}

export function CustomList<TValue extends IValue = IValue>({
  selected,
  possible,
  onChange,
  placeholder = 'Type ...',
  compareField = 'value',
}: Props<TValue>): ReactNode {
  const [search, setSearch] = useState<string>('')
  const [possibleFiltered, setPossibleFiltered] = useState(possible)

  const onCheckboxChange = (value: boolean, elem: TValue): void => {
    const newCollection = vuRemoveFromArr(elem, selected, compareField)
    if (value) {
      newCollection.push(elem)
    }
    onChange(newCollection)
  }

  useEffect(() => {
    setPossibleFiltered(vuFilterByString(search, possible))
  }, [search, possible])

  const isGlobalChecked = selected.length === possible.length
  const isGlobalIndeterminate =
    selected.length > 0 && selected.length !== possible.length

  const onClear = (): void => {
    setSearch('')
  }

  const onGlobalCheckbox = (): void => {
    onChange(isGlobalChecked ? [] : [...possible])
  }

  const drawRow = (current: TValue): ReactElement => {
    const isChecked = selected.some((p) => p.value === current.value)
    return (
      <ListItem key={current.value} disablePadding>
        <ListItemButton
          onClick={() => {
            onCheckboxChange(!isChecked, current)
          }}
          dense
        >
          <ListItemIcon>
            <Checkbox
              checked={isChecked}
              sx={{
                padding: 0,
              }}
              disableRipple
            />
          </ListItemIcon>
          <ListItemText
            sx={{
              color: current.color,
            }}
            primary={current.label}
          />
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <div
      role="custom-list"
      style={{
        maxWidth: 360,
      }}
    >
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1px',
        }}
      >
        <IconButton
          onClick={onGlobalCheckbox}
          sx={{ p: '10px' }}
          aria-label="menu"
        >
          <Checkbox
            indeterminate={isGlobalIndeterminate}
            checked={isGlobalChecked}
            sx={{
              padding: '2px',
            }}
            disableRipple
          />
        </IconButton>
        <InputBase
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          placeholder={placeholder}
          sx={{
            ml: 1,
            flex: 1,
          }}
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton
          onClick={onClear}
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
        >
          <CloseIcon
            sx={{
              visibility: search ? '' : 'hidden',
            }}
          />
        </IconButton>
      </Paper>
      <Paper>
        <List
          sx={{
            height: 140,
            overflowY: 'auto',
          }}
          dense
        >
          {possibleFiltered.map(drawRow)}
        </List>
      </Paper>
    </div>
  )
}
