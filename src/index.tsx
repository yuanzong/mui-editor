import {
  Card,
  CardProps,
  Divider,
  LinearProgress,
  Snackbar,
  Alert,
  useTheme,
} from '@mui/material';
import { Editor } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { Content, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as React from 'react';
import { ImageProps } from './menu-button-image';
import Toolbar from './toolbar';

interface Props extends Pick<CardProps, 'className' | 'style' | 'variant'> {
  initialContent?: Content;
  editorRef?: React.MutableRefObject<Editor | undefined>;
  onChange: (value: string) => void;
  image?: ImageProps;
}

export { Editor, EditorOptions } from '@tiptap/core';

export default function MUIEditor(props: Props) {
  const theme = useTheme();
  const [error, setError] = React.useState('');
  const onCloseAlert = () => setError('');

  const editor = useEditor({
    content: props.initialContent,
    extensions: [
      StarterKit,
      Image,
      Underline,
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
    ],
    onCreate(params) {
      if (props.editorRef) {
        props.editorRef.current = params.editor;
      }
    },
    onUpdate(params) {
      props.onChange(params.editor.getHTML());
    },
    editorProps: {
      handlePaste(view, event) {
        // Get the data of clipboard
        const clipboardItems = event.clipboardData?.files;
        if (!clipboardItems) return false;

        const image = Array.from(clipboardItems).find(item =>
          item.type.includes('image')
        );
        if (!image) {
          return false;
        }

        // disable paste image
        event.preventDefault();
        return true;
      },
    },
  });

  return (
    <Card
      variant={props.variant}
      className={props.className}
      style={props.style}
    >
      <Toolbar editor={editor} setError={setError} image={props.image} />
      {props.image?.uploading ? (
        <LinearProgress style={{ height: 2 }} />
      ) : (
        <Divider style={{ height: 2 }} />
      )}
      <div
        style={{
          padding: theme.spacing(1, 2),
          backgroundColor: theme.palette.background.default,
          position: 'relative',
        }}
      >
        {error && (
          <Snackbar
            open={Boolean(error)}
            autoHideDuration={5000}
            onClose={onCloseAlert}
            style={{ position: 'absolute' }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Alert onClose={onCloseAlert} severity="warning">
              {error}
            </Alert>
          </Snackbar>
        )}
        <EditorContent
          editor={editor}
          style={{ ...theme.typography.body1, minHeight: 64 }}
        />
      </div>
    </Card>
  );
}
