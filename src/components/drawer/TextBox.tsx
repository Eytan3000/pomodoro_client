import { useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';
import { FormLabel } from '@mui/joy';

interface Props<T> {
  handleOkClick: (textContent: string) => void;
  task?: string;
  setExit?: (newValue: T) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function TextBox({ handleOkClick, task, setExit }: Props) {
  const [italic, setItalic] = useState(false);
  const [fontWeight, setFontWeight] = useState('normal');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [comment, setComment] = useState('');

  const [textContent, setTextContent] = useState<string>(task);

  function handleSubmitTask(e?: React.FormEvent) {
    e?.preventDefault();

    if (textContent.trim() === '') {
      setComment('No Empty Input');
      return;
    }
    handleOkClick(textContent);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      setExit?.(); //call the function only if it exists
    }
    if (event.key === 'Enter') {
      handleSubmitTask();
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setComment('');
    setTextContent(e.currentTarget.value);
  }

  return (
    <form onSubmit={handleSubmitTask}>
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          onChange={handleChange}
          defaultValue={task}
          minRows={3}
          onKeyDown={handleKeyDown}
          endDecorator={
            <Box
              sx={{
                display: 'flex',
                gap: 'var(--Textarea-paddingBlock)',
                pt: 'var(--Textarea-paddingBlock)',
                borderTop: '1px solid',
                borderColor: 'divider',
                flex: 'auto',
              }}>
              <IconButton
                variant="plain"
                color="neutral"
                onClick={(event) => setAnchorEl(event.currentTarget)}>
                <FormatBold />
                <KeyboardArrowDown
                // fontSize="md"
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                size="sm"
                placement="bottom-start"
                sx={{ '--ListItemDecorator-size': '24px' }}>
                {['200', 'normal', 'bold'].map((weight) => (
                  <MenuItem
                    key={weight}
                    selected={fontWeight === weight}
                    onClick={() => {
                      setFontWeight(weight);
                      setAnchorEl(null);
                    }}
                    sx={{ fontWeight: weight }}>
                    <ListItemDecorator>
                      {fontWeight === weight && (
                        <Check
                        //  fontSize="sm"
                        />
                      )}
                    </ListItemDecorator>
                    {weight === '200' ? 'lighter' : weight}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                variant={italic ? 'soft' : 'plain'}
                color={italic ? 'primary' : 'neutral'}
                aria-pressed={italic}
                onClick={() => setItalic((bool) => !bool)}>
                <FormatItalic />
              </IconButton>
              <Button sx={{ ml: 'auto' }} type="submit">
                Ok
              </Button>
            </Box>
          }
          sx={{
            minWidth: 300,
            fontWeight,
            fontStyle: italic ? 'italic' : 'initial',
          }}
        />
        <FormLabel>{comment}</FormLabel>
      </FormControl>
    </form>
  );
}
