import { CardActions, Divider } from '@mui/material';
import {
  FormatBold,
  FormatClear,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  FormatUnderlined,
  Redo,
  SvgIconComponent,
  Undo,
} from '@mui/icons-material';
import { ChainedCommands, Editor } from '@tiptap/react';
import * as React from 'react';
import MenuButton from './menu-button';
import MenuButtonImage, { ImageProps } from './menu-button-image';
import MenuButtonLink from './menu-button-link';
import MenuHeadings from './menu-headings';

interface MenuProps {
  name: string;
  Icon: SvgIconComponent;
  onClick: (commands: ChainedCommands) => ChainedCommands;
}

const formats: MenuProps[] = [
  {
    name: 'bold',
    Icon: FormatBold,
    onClick(cmd) {
      return cmd.toggleBold();
    },
  },
  {
    name: 'italic',
    Icon: FormatItalic,
    onClick(cmd) {
      return cmd.toggleItalic();
    },
  },
  {
    name: 'strike',
    Icon: FormatStrikethrough,
    onClick(cmd) {
      return cmd.toggleStrike();
    },
  },
  {
    name: 'underline',
    Icon: FormatUnderlined,
    onClick(cmd) {
      return cmd.toggleUnderline();
    },
  },
  {
    name: 'orderedList',
    Icon: FormatListNumbered,
    onClick(cmd) {
      return cmd.toggleOrderedList();
    },
  },
  {
    name: 'bulletList',
    Icon: FormatListBulleted,
    onClick(cmd) {
      return cmd.toggleBulletList();
    },
  },
  {
    name: 'blockquote',
    Icon: FormatQuote,
    onClick(cmd) {
      return cmd.toggleBlockquote();
    },
  },
];

export default function Toolbar(props: {
  editor: Editor | null;
  setError: (err: string) => void;
  image?: ImageProps;
}) {
  return (
    <CardActions>
      <MenuHeadings editor={props.editor} levels={[1, 2, 3, 4]} />
      {formats.map((menu, idx) => (
        <MenuButton
          key={idx}
          editor={props.editor}
          name={menu.name}
          onClick={menu.onClick}
        >
          <menu.Icon />
        </MenuButton>
      ))}
      <MenuButtonLink editor={props.editor} />
      {props.image && (
        <MenuButtonImage
          {...props.image}
          editor={props.editor}
          setError={props.setError}
        />
      )}
      <Divider orientation={'vertical'} style={{ height: 24 }} />
      <MenuButton
        editor={props.editor}
        name="reset"
        onClick={cmd => cmd.clearNodes().unsetAllMarks()}
      >
        <FormatClear />
      </MenuButton>
      <MenuButton editor={props.editor} name="redo" onClick={cmd => cmd.redo()}>
        <Redo />
      </MenuButton>
      <MenuButton editor={props.editor} name="undo" onClick={cmd => cmd.undo()}>
        <Undo />
      </MenuButton>
    </CardActions>
  );
}
