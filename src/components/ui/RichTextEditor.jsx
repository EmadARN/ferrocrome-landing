"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Mention from "@tiptap/extension-mention";
import Suggestion from "@tiptap/suggestion";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { useState } from "react";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight,
  AiOutlineTable,
  AiOutlinePicture,
} from "react-icons/ai";
import { Table } from "@tiptap/extension-table";

export default function RichTextEditor({ content, setContent }) {
  const [alignment, setAlignment] = useState("left");

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Mention.configure({
        suggestion: Suggestion({
          items: ({ query }) =>
            ["Emad", "Admin", "Support", "Manager"].filter((item) =>
              item.toLowerCase().includes(query.toLowerCase())
            ),
        }),
      }),
      BulletList,
      OrderedList,
      Blockquote,
      HorizontalRule,
      Image.configure({ inline: false }),
      ImageResize,
      Table.configure({
        resizable: true, // ❌ ریسایز تیبل غیرفعال
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: content || "",
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose max-w-full focus:outline-none min-h-[200px] p-2 border rounded bg-red",
      },
    },
  });

  if (!editor) return <p>Loading editor...</p>;

  const setFontSize = (size) =>
    editor.chain().focus().setMark("textStyle", { fontSize: size }).run();
  const setFontColor = (color) =>
    editor.chain().focus().setMark("textStyle", { color }).run();
  const setTextAlignment = (align) => {
    editor.chain().focus().setTextAlign(align).run();
    setAlignment(align);
  };

  const insertImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border rounded p-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 mb-2 bg-gray-700 p-1 rounded">
        {/* Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
        >
          <AiOutlineBold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          <AiOutlineItalic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
        >
          <AiOutlineUnderline size={18} />
        </button>

        {/* Alignment */}
        <button
          type="button"
          onClick={() => setTextAlignment("left")}
          className={`p-2 rounded hover:bg-gray-200 ${
            alignment === "left" ? "bg-gray-300" : ""
          }`}
        >
          <AiOutlineAlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => setTextAlignment("center")}
          className={`p-2 rounded hover:bg-gray-200 ${
            alignment === "center" ? "bg-gray-300" : ""
          }`}
        >
          <AiOutlineAlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => setTextAlignment("right")}
          className={`p-2 rounded hover:bg-gray-200 ${
            alignment === "right" ? "bg-gray-300" : ""
          }`}
        >
          <AiOutlineAlignRight size={18} />
        </button>

        {/* Table */}
        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className="p-2 rounded hover:bg-gray-200"
        >
          <AiOutlineTable size={18} />
        </button>

        {/* Image Upload */}
        <label className="p-2 rounded hover:bg-gray-200 cursor-pointer">
          <AiOutlinePicture size={18} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) insertImage(e.target.files[0]);
            }}
          />
        </label>

        {/* Font size */}
        <select
          onChange={(e) => setFontSize(e.target.value)}
          className="ml-2 border rounded p-1"
          defaultValue=""
        >
          <option value="" disabled>
            Font Size
          </option>
          <option value="14px">14</option>
          <option value="16px">16</option>
          <option value="18px">18</option>
          <option value="24px">24</option>
          <option value="32px">32</option>
        </select>

        {/* Font color */}
        <input
          type="color"
          onChange={(e) => setFontColor(e.target.value)}
          className="ml-2 w-10 h-10 p-1 border rounded"
        />
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
