import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";

const PDFGenerator = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("Sample Notice");

  const applyStyle = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const applyFontSize = (size) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (range.collapsed) return;

    const selectedText = range.extractContents();
    const span = document.createElement("span");

    span.style.fontSize = size; // e.g., "18pt"
    span.appendChild(selectedText);

    range.insertNode(span);
    range.setStartAfter(span);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const downloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    doc.html(editorRef.current, {
      callback: (doc) => {
        doc.save(`${title || "Notice"}.pdf`);
      },
      x: 40,
      y: 40,
      width: 515,
      windowWidth: 800,
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 text-black">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">
          MS Word-Like PDF Generator
        </h2>

        {/* Toolbar */}
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <input
            type="text"
            className="border px-3 py-2 rounded w-full sm:w-auto"
            placeholder="Title of Document"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={() => applyStyle("bold")} className="btn">
            Bold
          </button>
          <button onClick={() => applyStyle("italic")} className="btn">
            Italic
          </button>
          <button onClick={() => applyStyle("underline")} className="btn">
            Underline
          </button>
          <button onClick={() => applyStyle("justifyLeft")} className="btn">
            Left
          </button>
          <button onClick={() => applyStyle("justifyCenter")} className="btn">
            Center
          </button>
          <button onClick={() => applyStyle("justifyRight")} className="btn">
            Right
          </button>

          {/* Font Size Dropdown */}
          <select
            onChange={(e) => {
              const val = e.target.value;
              if (val) applyFontSize(val);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="">Font Size</option>
            <option value="12pt">12pt</option>
            <option value="14pt">14pt</option>
            <option value="16pt">16pt</option>
            <option value="18pt">18pt</option>
            <option value="20pt">20pt</option>
            <option value="24pt">24pt</option>
            <option value="30pt">30pt</option>
          </select>
        </div>

        {/* Editable content area */}
        <div
          className="overflow-auto mb-4 border rounded p-6 bg-white"
          style={{
            height: "842px",
            maxwidth: "595px", // A4 size in pt
            margin: "0 auto",
            border: "1px solid #ccc",
          }}
        >
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning={true}
            className="outline-none whitespace-pre-wrap max-w-full"
            style={{
              // minHeight: "100vh",
              // width: "100vw",
              fontSize: "14pt",
              lineHeight: "1.5",
              fontFamily: "'Times New Roman', serif",
            }}
          >
            <h3 style={{ textAlign: "center" }}>{title}</h3>
            <p>Type your official notice here...</p>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadPDF}
          className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-800 transition"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PDFGenerator;
