import PForm from "@/components/forms/PForm";
import PInput from "@/components/forms/PInput";
import PFullScreenModal from "@/components/Shared/PModal/PFullScreenModal";
import PSmallModal from "@/components/Shared/PModal/PSmallModal";
import { useUpdateProjectMutation } from "@/redux/api/features/projectApi";
import { useUpdateSkillMutation } from "@/redux/api/features/skillsApi";
import { Box, Button, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type defaultValue = {
  skillName: string;
  percentage: number;
};

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  _id: string;
  defaultValue: defaultValue;
};
const UpdateSkilPage = ({ open, setOpen, _id, defaultValue }: TProps) => {
  const [updateSkill] = useUpdateSkillMutation();

  const handleUpdateSkill = async (values: FieldValues) => {
    console.log(values, _id);
    try {
      const res = await updateSkill({ ...values, _id }).unwrap();
      console.log(res?.data);
      if (res?.data?._id) {
        toast.success("Skill updated successfully");
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Somthing went wrong");
    }
  };
  return (
    <PSmallModal open={open} setOpen={setOpen} title="Update Your Skill">
      <PForm onSubmit={handleUpdateSkill} defaultValues={defaultValue}>
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
export default UpdateSkilPage;
