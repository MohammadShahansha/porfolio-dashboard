import PForm from "@/components/forms/PForm";
import PInput from "@/components/forms/PInput";
import PFullScreenModal from "@/components/Shared/PModal/PFullScreenModal";
import PSmallModal from "@/components/Shared/PModal/PSmallModal";
import { useCreateProjectMutation } from "@/redux/api/features/projectApi";
import { useCreateSkillMutation } from "@/redux/api/features/skillsApi";
import { Box, Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const CrateSkillModal = ({ open, setOpen }: TProps) => {
  const [createSkill] = useCreateSkillMutation();
  const handleCreateSkill = async (values: FieldValues) => {
    console.log(values);
    try {
      const res = await createSkill(values).unwrap();
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
    <PSmallModal open={open} setOpen={setOpen} title="Add Your Skill">
      <PForm onSubmit={handleCreateSkill}>
        <Grid container spacing={2}>
          <Grid item sm={12} md={12}>
            <PInput name="skillName" label="Skill Name" fullWidth={true} />
          </Grid>

          <Grid item sm={12} md={12}>
            <PInput
              name="percentage"
              label="Percetage Of This Skill (e.g: 70)"
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
    </PSmallModal>
  );
};

export default CrateSkillModal;
