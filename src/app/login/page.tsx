"use client";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/features/loginApi";
import PForm from "@/components/forms/PForm";
import PInput from "@/components/forms/PInput";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [login] = useLoginMutation();

  const handleLoggin: SubmitHandler<FieldValues> = async (values) => {
    console.log(values);
    try {
      if (values.email === "sha@gmail.com" && values.password === "12345") {
        const user = {
          email: values.email,
        };
        // const res = await login(userInfo);
        // console.log(res);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("user login successfully");
        router.refresh();

        router.push(`/`);
      } else {
        setError("Your email or password are not match");
      }
    } catch (err: any) {
      console.log("here are some problem");
    }
  };
  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Box>
              <Image src={logo} alt="logo" width={50} height={50}></Image>
            </Box> */}
            <Box>
              <Typography variant="h5" fontWeight={600}>
                Login Please!!
              </Typography>
            </Box>
          </Stack>
          {error && (
            <Box
              sx={{
                backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "white",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box mt={3}>
            <PForm onSubmit={handleLoggin}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <PInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={12}>
                  <PInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Button
                fullWidth={true}
                sx={{
                  marginTop: "20px",
                  ":hover": {
                    backgroundColor: "#111e42",
                  },
                }}
                type="submit"
              >
                {" "}
                Submit
              </Button>
            </PForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
