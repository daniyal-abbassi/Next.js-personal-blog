import { Editor } from "@tinymce/tinymce-react";

type TinyEditorProps = {
  value: string;
  onChange: (content: string) => void;
};

export default function TinyEditor({ value, onChange }: TinyEditorProps) {
  return (
    <Editor
      apiKey="wmyc1y00b3dpkmjczhrtw15q2auki9lttyl28jq8add1vcr1"
      value={value}
      onEditorChange={onChange}
      init={{
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" },
        ],
        exportpdf_converter_options: {
          format: "Letter",
          margin_top: "1in",
          margin_right: "1in",
          margin_bottom: "1in",
          margin_left: "1in",
        },
        exportword_converter_options: {
          document: { size: "Letter" },
        },
        importword_converter_options: {
          formatting: {
            styles: "inline",
            resets: "inline",
            defaults: "inline",
          },
        },
      }}
    />
  );
}
