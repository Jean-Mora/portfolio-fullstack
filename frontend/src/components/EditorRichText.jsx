import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const EditorRichText = ({ value, onChange }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return <ReactQuill theme="snow" value={value} onChange={onChange} modules={modules} />;
};

export default EditorRichText;
