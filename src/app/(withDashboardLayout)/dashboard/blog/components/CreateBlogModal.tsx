import PForm from "@/components/forms/PForm";
import PInput from "@/components/forms/PInput";
import PSmallModal from "@/components/Shared/PModal/PSmallModal";
import { useCreateBlogMutation } from "@/redux/api/features/blogApi";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateBlogModal = ({ open, setOpen }: TProps) => {
  const [createBlog] = useCreateBlogMutation();
  const handleCreateBlog = async (values: FieldValues) => {
    console.log(values);
    try {
      const res = await createBlog(values).unwrap();
      console.log(res);
      if (res?.data?._id) {
        toast.success("Skill created successfully");
        setOpen(false);
      }
    } catch (err) {
      toast.error("Somthing went wrong when created a Blog");
    }
  };
  return (
    <PSmallModal open={open} setOpen={setOpen} title="Add Your Skill">
      <PForm onSubmit={handleCreateBlog}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12}>
            <PInput name="title" label="Title" fullWidth={true} />
          </Grid>
          <Grid item sm={12} md={12}>
            <PInput name="image" label="Image" fullWidth={true} />
          </Grid>
          <Grid item sm={12} md={12}>
            <PInput name="description" label="Description" fullWidth={true} />
          </Grid>

          <Grid item sm={12} md={12}>
            <PInput name="date" label="MM/Day/YYYY" fullWidth={true} />
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
