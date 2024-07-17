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
import { toast } from "sonner";

import DashboardBanner from "@/components/Dashboard/DashboardBanner/DashboardBanner";
import BannerLoader from "@/components/Dashboard/DashboardBanner/BannerLoader";
import {
  useDeleteBlogMutation,
  useGetAllBlogQuery,
} from "@/redux/api/features/blogApi";
// import CreateBlogModal from "./components/CreateBlogModal";

import dynamic from "next/dynamic";

const CreateBlogModal = dynamic(() => import("./components/CreateBlogModal"), {
  ssr: false,
});

const BlogManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading } = useGetAllBlogQuery({});
  const [deleteBlog] = useDeleteBlogMutation();
  const rowData = data?.data.map((row: any) => ({
    ...row,
    id: row._id,
  }));

  const forLoading = [1, 2, 3, 4, 5];

  ///delete operation---------------------------------
  const handleDeletRow = async (_id: string) => {
    console.log(_id);
    try {
      const res = await deleteBlog(_id).unwrap();
      console.log(res);
      if (res?._id) {
        toast.success("Delete blog successfully");
      }
    } catch (err) {
      toast.error("Somthing went wrong");
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Blog Title", width: 400 },
    {
      field: "date",
      headerName: "Date",
      width: 400,
    },

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
              title="Manage Your Blog By Creating & Deleting"
              selfName="Manage Blog"
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
                Post Your Blog
              </Button>
              <CreateBlogModal open={isModalOpen} setOpen={setIsModalOpen} />
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
          <DataGrid
            sx={{ width: "1000px" }}
            rows={rowData}
            columns={columns}
            hideFooter
          />
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
    </Box>
  );
};

export default BlogManagement;
