"use client";
import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "sonner";

import DashboardBanner from "@/components/Dashboard/DashboardBanner/DashboardBanner";
import BannerLoader from "@/components/Dashboard/DashboardBanner/BannerLoader";
import {
  useDeleteSkillMutation,
  useGetAllSkillQuery,
} from "@/redux/api/features/skillsApi";
import CreateSkillModal from "./components/CreateSkillModa";
import UpdateSkilPage from "./components/UpdateSkill";

const SkillManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const { data, isLoading } = useGetAllSkillQuery({});
  const [deleteSkill] = useDeleteSkillMutation();
  const rowData = data?.data.map((row: any) => ({
    ...row,
    id: row._id,
  }));

  const forLoading = [1, 2, 3, 4, 5];

  ///delete operation---------------------------------
  const handleDeletRow = async (_id: string) => {
    console.log(_id);
    try {
      const res = await deleteSkill(_id).unwrap();
      console.log(res);
      if (res?._id) {
        toast.success("Delete skill successfully");
      }
    } catch (err) {
      toast.error("Somthing went wrong");
    }
  };

  const handleUpdateRow = (row: any) => {
    setSelectedSkill(row);
    setUpdateModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "skillName", headerName: "Skill Name", width: 400 },
    { field: "percentage", headerName: "Percentage(%)", width: 400 },

    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <IconButton
              onClick={() => handleUpdateRow(row)}
              aria-label="update"
              sx={{
                backgroundColor: "primary.main",
                ":hover": {
                  backgroundColor: "secondary.main",
                },
              }}
            >
              <EditIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => handleDeletRow(row._id)}
              aria-label="delete"
              sx={{
                mx: "20px",
                backgroundColor: "red",
                ":hover": {
                  backgroundColor: "secondary.main",
                },
              }}
            >
              <DeleteIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box>
      <Box>
        {!isLoading ? (
          <Box>
            <DashboardBanner
              title="Manage Your Skill By Updating & Deleting"
              selfName="Manage Skill"
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                onClick={() => setIsModalOpen(true)}
                sx={{ ":hover": { backgroundColor: "secondary.main" } }}
              >
                Add Your Skill
              </Button>
              <CreateSkillModal open={isModalOpen} setOpen={setIsModalOpen} />
            </Stack>
          </Box>
        ) : (
          <Box>
            <BannerLoader />
            <Skeleton
              sx={{
                width: "120px",
                height: "60px",
                borderRadius: "5px",
                my: "10px",
              }}
            />
          </Box>
        )}
      </Box>

      <Box mt={2}>
        {!isLoading ? (
          <DataGrid rows={rowData} columns={columns} hideFooter />
        ) : (
          <Box>
            {forLoading.map((item: number) => {
              return (
                <Box key={item}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                    }}
                  >
                    <Skeleton sx={{ width: "500px", height: "70px" }} />
                    <Skeleton sx={{ width: "500px", height: "70px" }} />

                    <Skeleton sx={{ width: "100%", height: "70px" }} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      {selectedSkill && (
        <UpdateSkilPage
          open={updateModalOpen}
          setOpen={setUpdateModalOpen}
          _id={selectedSkill?._id}
          defaultValue={selectedSkill}
        />
      )}
    </Box>
  );
};

export default SkillManagement;
