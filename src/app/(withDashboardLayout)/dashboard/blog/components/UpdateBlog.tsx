import PDatePicker from "@/components/forms/PDatePicker";
import PForm from "@/components/forms/PForm";
import PInput from "@/components/forms/PInput";
import PSmallModal from "@/components/Shared/PModal/PSmallModal";
import { useUpdateBlogMutation } from "@/redux/api/features/blogApi";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type defaultValue = {
  title: string;
  image?: string;
  description: string;
  date: string;
};

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  defaultValue: defaultValue;
};
const UpdateBlogPage = ({ open, setOpen, _id, defaultValue }: TProps) => {
  const [updateBlog] = useUpdateBlogMutation();

  const handleUpdateBlog = async (values: FieldValues) => {
    console.log(values, _id);
    try {
      const res = await updateBlog({ ...values, _id }).unwrap();
      console.log(res);
      if (res?.data?._id) {
        toast.success("Blog updated successfully");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Somthing went wrong when you want to update");
    }
  };
  return (
    <PSmallModal open={open} setOpen={setOpen} title="Update Your Skill">
      <PForm onSubmit={handleUpdateBlog} defaultValues={defaultValue}>
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
            <PInput name="date" label="Date" fullWidth={true} />
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
export default UpdateBlogPage;
