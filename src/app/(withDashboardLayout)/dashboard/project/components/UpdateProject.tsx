import PForm from "@/components/forms/PForm";
import PInput from "@/components/forms/PInput";
import PFullScreenModal from "@/components/Shared/PModal/PFullScreenModal";
import { useUpdateProjectMutation } from "@/redux/api/features/projectApi";
import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type defaultValue = {
  name: string;
  image: string;
  tachnologies: string;
  discriptions: string;
  frontedGithubLink: string;
  serverGithubLink?: string;
  liveLink: string;
  projectPrasentationLink?: string;
};

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  defaultValue: defaultValue;
};
const UpdateProject = ({ open, setOpen, _id, defaultValue }: TProps) => {
  const [updateProject] = useUpdateProjectMutation();

  const handleUpdateProject = async (values: FieldValues) => {
    console.log(values, _id);
    try {
      const res = await updateProject({ ...values, _id }).unwrap();
      console.log(res);
      if (res?.data?._id) {
        toast.success("Project updated successfully");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Somthing went wrong");
    }
  };
  return (
    <PFullScreenModal open={open} setOpen={setOpen} title="Update Your Project">
      <PForm onSubmit={handleUpdateProject} defaultValues={defaultValue}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={4}>
            <PInput name="name" label="Name" fullWidth={true} />
          </Grid>

          <Grid item sm={12} md={4}>
            <PInput name="image" label="Image" fullWidth={true} />
          </Grid>
          <Grid item sm={12} md={4}>
            <PInput name="tachnologies" label="Tachnologies" fullWidth={true} />
          </Grid>

          <Grid item sm={12} md={4}>
            <PInput name="discriptions" label="Discriptions" fullWidth={true} />
          </Grid>
          <Grid item sm={12} md={4}>
            <PInput
              name="frontedGithubLink"
              label="Fronted Github Link"
              fullWidth={true}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <PInput
              name="serverGithubLink"
              label="Server Github Link"
              fullWidth={true}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <PInput name="liveLink" label="LiveLink" fullWidth={true} />
          </Grid>
          <Grid item sm={12} md={4}>
            <PInput
              name="projectPrasentationLink"
              label="Project Prasentation Link"
              fullWidth={true}
            />
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
    </PFullScreenModal>
  );
};
export default UpdateProject;
