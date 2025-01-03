import PForm from "@/components/forms/PForm";
import PInput from "@/components/forms/PInput";
import PSmallModal from "@/components/Shared/PModal/PSmallModal";
import { useCreateBlogMutation } from "@/redux/api/features/blogApi";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
// import CustomToolbar from './CustomToolbar'
type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBlogModal = ({ open, setOpen }: TProps) => {
  const [content, setContent] = useState("");
  const [text, setText] = useState("");
  const [createBlog] = useCreateBlogMutation();

  const handleCreateBlog = async (values: FieldValues) => {
    console.log(values);
    const blogData = { ...values, description: content };
    try {
      const res = await createBlog(blogData).unwrap();
      console.log(res);
      if (res?.data?._id) {
        toast.success("Skill Created Successfully");
        setOpen(false);
      }
    } catch (err) {
      toast.error("Somthing went wrong when created a Blog");
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
    },
  };
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];
  return (
    <PSmallModal open={open} setOpen={setOpen} title="Add Your Skill">
      <PForm onSubmit={handleCreateBlog}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12}>
            <PInput name="title" label="Title" fullWidth={true} />
          </Grid>

          <Grid item sm={12} md={12}>
            <ReactQuill
              value={content}
              onChange={(newContent) => setContent(newContent)}
              modules={modules}
              formats={formats}
            />
            {/* <input type="hidden" name="description" value={content} /> */}
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Button
            type="submit"
            sx={{
              ":hover": {
                backgroundColor: "secondary.main",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </PForm>
    </PSmallModal>
  );
};

export default CreateBlogModal;
