'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useCallback } from 'react'

interface Props {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

type ToolbarButtonProps = {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
  disabled?: boolean
}

function ToolbarButton({ onClick, active, title, children, disabled }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onMouseDown={e => { e.preventDefault(); onClick() }}
      className={[
        'w-8 h-8 flex items-center justify-center rounded-lg text-sm transition select-none',
        active
          ? 'bg-[#0059bb] text-white'
          : 'text-gray-600 hover:bg-gray-100',
        disabled ? 'opacity-30 cursor-not-allowed' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-gray-200 mx-1" />
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-[#0059bb] underline' } }),
      Placeholder.configure({ placeholder: placeholder ?? 'Tulis konten di sini...' }),
    ],
    content: value || '',
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[240px] px-4 py-3 text-sm text-[#0f0f0f] leading-relaxed',
      },
    },
  })

  // Sync value from outside (e.g. when edit opens)
  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() === value) return
    editor.commands.setContent(value || '', { emitUpdate: false })
  }, [value, editor])

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href ?? ''
    const url = window.prompt('URL link:', prev)
    if (url === null) return
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  if (!editor) return null

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#0059bb] focus-within:ring-2 focus-within:ring-[#0059bb]/20 transition">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-100 bg-gray-50">

        {/* Heading */}
        <ToolbarButton
          title="Heading 2"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive('heading', { level: 2 })}
        >
          <span className="font-bold text-[11px]">H2</span>
        </ToolbarButton>
        <ToolbarButton
          title="Heading 3"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive('heading', { level: 3 })}
        >
          <span className="font-bold text-[10px]">H3</span>
        </ToolbarButton>

        <Divider />

        {/* Text format */}
        <ToolbarButton
          title="Bold (Ctrl+B)"
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive('bold')}
        >
          <span className="material-symbols-outlined text-[17px]">format_bold</span>
        </ToolbarButton>
        <ToolbarButton
          title="Italic (Ctrl+I)"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <span className="material-symbols-outlined text-[17px]">format_italic</span>
        </ToolbarButton>
        <ToolbarButton
          title="Underline (Ctrl+U)"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        >
          <span className="material-symbols-outlined text-[17px]">format_underlined</span>
        </ToolbarButton>
        <ToolbarButton
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive('strike')}
        >
          <span className="material-symbols-outlined text-[17px]">strikethrough_s</span>
        </ToolbarButton>

        <Divider />

        {/* List */}
        <ToolbarButton
          title="Bullet List"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          <span className="material-symbols-outlined text-[17px]">format_list_bulleted</span>
        </ToolbarButton>
        <ToolbarButton
          title="Numbered List"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          <span className="material-symbols-outlined text-[17px]">format_list_numbered</span>
        </ToolbarButton>

        <Divider />

        {/* Align */}
        <ToolbarButton
          title="Rata Kiri"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          active={editor.isActive({ textAlign: 'left' })}
        >
          <span className="material-symbols-outlined text-[17px]">format_align_left</span>
        </ToolbarButton>
        <ToolbarButton
          title="Rata Tengah"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          active={editor.isActive({ textAlign: 'center' })}
        >
          <span className="material-symbols-outlined text-[17px]">format_align_center</span>
        </ToolbarButton>
        <ToolbarButton
          title="Rata Kanan"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          active={editor.isActive({ textAlign: 'right' })}
        >
          <span className="material-symbols-outlined text-[17px]">format_align_right</span>
        </ToolbarButton>

        <Divider />

        {/* Blockquote */}
        <ToolbarButton
          title="Blockquote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive('blockquote')}
        >
          <span className="material-symbols-outlined text-[17px]">format_quote</span>
        </ToolbarButton>

        {/* Link */}
        <ToolbarButton
          title="Insert Link"
          onClick={setLink}
          active={editor.isActive('link')}
        >
          <span className="material-symbols-outlined text-[17px]">link</span>
        </ToolbarButton>

        <Divider />

        {/* Undo/Redo */}
        <ToolbarButton
          title="Undo (Ctrl+Z)"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <span className="material-symbols-outlined text-[17px]">undo</span>
        </ToolbarButton>
        <ToolbarButton
          title="Redo (Ctrl+Y)"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <span className="material-symbols-outlined text-[17px]">redo</span>
        </ToolbarButton>

      </div>

      {/* Editor area */}
      <EditorContent editor={editor} />
    </div>
  )
}
