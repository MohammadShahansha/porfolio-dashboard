import PForm from "@/components/forms/PForm";
import PInput from "@/components/forms/PInput";
import PFullScreenModal from "@/components/Shared/PModal/PFullScreenModal";
import { useCreateProjectMutation } from "@/redux/api/features/projectApi";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateProjectModal = ({ open, setOpen }: TProps) => {
  const [createProject] = useCreateProjectMutation();
  const handleCreateProject = async (values: FieldValues) => {
    console.log(values);
    try {
      const res = await createProject(values).unwrap();
      console.log(res);
      if (res?.data?._id) {
        toast.success("Project created successfully");
        setOpen(false);
      }
    } catch (err) {
      toast.error("Somthing went wrong when creat a project");
    }
  };
  return (
    <PFullScreenModal open={open} setOpen={setOpen} title="Create Your Project">
      <PForm onSubmit={handleCreateProject}>
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

export default CreateProjectModal;
