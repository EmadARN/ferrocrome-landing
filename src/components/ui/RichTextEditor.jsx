"use client";

import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextAlign } from "@tiptap/extension-text-align";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import { ResizableImage } from "./ResizableImage";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  ImageIcon,
  TableIcon,
  Square,
} from "lucide-react";

const RichTextEditor = forwardRef(({ initialContent = "" }, ref) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Underline,
      Strike,
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      ResizableImage.configure({ inline: false, allowResize: true }),
      Superscript,
      Subscript,
    ],

    content: initialContent || "<p></p>",
    editorProps: { attributes: { class: "rte-editor" } },
    immediatelyRender: false,
  });

  useImperativeHandle(ref, () => ({
    getContent: () => editor?.getHTML() || "",
  }));

  if (!isClient || !editor) return null;

  const buttonClass = "p-2 border rounded hover:bg-gray-400 cursor-pointer";

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      editor.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="border p-4 rounded-md rte-container">
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap gap-2 items-center rte-toolbar ">
        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={16} />
        </button>

        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            type="button"
            key={level}
            className={buttonClass}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
          >
            H{level}
          </button>
        ))}

        <buttonپ
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          {" "}
          <AlignRight size={16} />
        </buttonپ>
        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={16} />
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={16} />
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={16} />
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={16} />
        </button>

        <button
          type="button"
          className={buttonClass}
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
              .run()
          }
        >
          <TableIcon size={16} />
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Square size={16} />
        </button>

        {/* Table controls */}

        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().addRowAfter().run()}
        >
          Row
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => editor.chain().focus().addColumnBefore().run()}
        >
          Col
        </button>

        {/* Upload image */}
        <label
          className={`${buttonClass} cursor-pointer flex items-center gap-1`}
        >
          <ImageIcon size={16} /> Upload
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files[0] && handleFileUpload(e.target.files[0])
            }
          />
        </label>
        <input
          type="color"
          className="w-8 h-8 p-0 border-0 cursor-pointer"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />
      </div>

      <EditorContent
        editor={editor}
        className="border p-2 min-h-[300px] rte-editor pr-8"
      />

      {/* CSS */}
      <style jsx>{`
        .rte-editor table {
          width: 100%;
          border-collapse: collapse;
          margin: 10px 0;
        }
        .rte-editor th,
        .rte-editor td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        .rte-editor ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        .rte-editor ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
        }
        .rte-editor h1 {
          @apply text-3xl font-bold my-4;
        }
        .rte-editor h2 {
          @apply text-2xl font-bold my-3;
        }
        .rte-editor h3 {
          @apply text-xl font-bold my-2;
        }
        .rte-editor h4 {
          @apply text-lg font-semibold my-2;
        }
        .rte-editor h5 {
          @apply text-base font-semibold my-1;
        }
        .rte-editor h6 {
          @apply text-sm font-semibold my-1;
        }
        .rte-editor p {
          @apply my-1;
        }
        .rte-editor img {
          @apply max-w-full h-auto block my-2;
          resize: both;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
});

export default RichTextEditor;
