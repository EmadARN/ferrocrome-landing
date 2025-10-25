import Image from "@tiptap/extension-image";
import { ResizableBox } from "react-resizable";
import React from "react";

export const ResizableImage = Image.extend({
  // این قسمت مهمه تا تصاویر قبلی شناسایی بشن
  parseHTML() {
    return [
      {
        tag: "img", // همه <img> ها تبدیل به این Node شوند
      },
    ];
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const src = node.attrs.src;
      const width = node.attrs.width || 200;
      const height = node.attrs.height || 200;

      const onResize = (event, { size }) => {
        editor
          .chain()
          .focus()
          .setNodeAttribute(getPos(), "width", size.width)
          .run();
      };

      return (
        <ResizableBox
          width={width}
          height={height}
          onResize={onResize}
          resizeHandles={["se"]}
          className="rte-image-wrapper"
        >
          <img
            src={src}
            className="rte-image"
            style={{ width: "100%", height: "100%" }}
          />
        </ResizableBox>
      );
    };
  },
});
