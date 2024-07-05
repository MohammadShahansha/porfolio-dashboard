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
import CreateProjectModal from "./components/CreateProjectModal";
import {
  useDeleteProjectMutation,
  useGetAllProjectQuery,
} from "@/redux/api/features/projectApi";
import DashboardBanner from "@/components/Dashboard/DashboardBanner/DashboardBanner";
import BannerLoader from "@/components/Dashboard/DashboardBanner/BannerLoader";
import UpdateProject from "./components/UpdateProject";

const ProjectManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);

  const [selectedProject, setSelectedProject] = useState<any>(null);

  const { data, isLoading } = useGetAllProjectQuery({});
  const [deleteProject] = useDeleteProjectMutation();
  const rowData = data?.data.map((row: any) => ({
    ...row,
    id: row._id,
  }));

  const forLoading = [1, 2, 3, 4, 5];

  ///delete operation---------------------------------
  const handleDeletRow = async (_id: string) => {
    console.log(_id);
    try {
      const res = await deleteProject(_id).unwrap();
      console.log(res);
      if (res?._id) {
        toast.success("Delete Project successfully");
      }
    } catch (err) {
      toast.error("Somthing went wrong");
    }
  };

  const handleEditRow = (row: any) => {
    setSelectedProject(row);
    setUpdateModalOpen(true);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 150 },

    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        // console.log(row.id);
        return (
          <>
            <IconButton
              onClick={() => handleEditRow(row)}
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
              title="Manage Your Project By Updating & Deleting"
              selfName="Manage Project"
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
                Create Project
              </Button>
              <CreateProjectModal open={isModalOpen} setOpen={setIsModalOpen} />
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
                    <Skeleton sx={{ width: "300px", height: "70px" }} />
                    <Skeleton sx={{ width: "300px", height: "70px" }} />
                    <Skeleton sx={{ width: "300px", height: "70px" }} />
                    <Skeleton sx={{ width: "300px", height: "70px" }} />
                    <Skeleton sx={{ width: "300px", height: "70px" }} />
                    <Skeleton sx={{ width: "100%", height: "70px" }} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      {selectedProject && (
        <UpdateProject
          open={updateModalOpen}
          setOpen={setUpdateModalOpen}
          _id={selectedProject._id}
          defaultValue={selectedProject}
        />
      )}
    </Box>
  );
};

export default ProjectManagement;
