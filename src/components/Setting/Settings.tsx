import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function Setting() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("here is console");
  };
  return (
    <>
      <div style={{ height:'550px', width: "100%" }} className="action-table">
        <Box>
          <Typography variant="h5" className="action-req">
            Settings
          </Typography>
          <Typography className="action-state">
            Choose if you would like to receive a notification email immediately
            after an employee submits their information, or if you would like to
            receive the information at a given interval.{" "}
          </Typography>
        </Box>
        <Box sx={{marginTop:'25px'}}>
          <Typography variant="h5" sx={{fontSize:'20px', fontWeight:'700', lineHeight:'22px'}}>
            Email Notifications
          </Typography>
          <Divider sx={{ marginTop:'10px'}} />
          <Box sx={{ display:'flex', justifyContent:'space-between'}}>
            <Typography sx={{ display:'flex', alignItems:'center'}}>Intermediate notification</Typography>
            <FormControlLabel
              control={<Switch sx={{ m: 1 }} defaultChecked />}
              label=""
            />
          </Box>
          <Divider />
          <Box sx={{ display:'flex', justifyContent:'space-between'}}>
            <Typography sx={{ display:'flex', alignItems:'center'}}>Daily Summary</Typography>
            <FormControlLabel
              control={<Switch sx={{ m: 1 }} />}
              label=""
            />
          </Box>
          <Divider />
          <Box sx={{ display:'flex', justifyContent:'space-between'}}>
            <Typography sx={{ display:'flex', alignItems:'center'}}>Weekly Summary</Typography>
            <FormControlLabel
              control={<Switch sx={{ m: 1 }} />}
              label=""
            />
          </Box>
          <Divider />
        </Box>
        <Box sx={{ display:'flex', flexDirection: 'column', gap:'20px', marginTop:'25px' }}>
          <FormControl sx={{ width: "265px" }}>
            <TextField
              sx={{
                "& .MuiFormLabel-root": {
                  color: "black !important",
                  fontWeight: 500,
                  fontSize:'17px'
                },
                "& .MuiInputBase-root:after": {
                    borderBottom: '2px solid #CECECE'
                }
              }}
              label="Delegate Access"
              variant="standard"
              focused
              placeholder="Enter email"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <img src="/icon/search.svg" alt="" />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button
            variant="contained"
            sx={{
              width: "168px",
              height: "50px",
              textTransform: "capitalize",
              fontSize: "17px",
              borderRadius: "50px",
              "&:hover": { background: "#A51E22" },
            }}
          >
            Submit
          </Button>
        </Box>
      </div>
      <Divider />
      <Stack
        spacing={2}
        direction="row"
        sx={{
          justifyContent: "flex-end",
          marginTop: "25px",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            width: "168px",
            height: "50px",
            textTransform: "capitalize",
            borderColor: "#A51E22",
            fontSize: "17px",
            borderRadius: "50px",
            "&:hover": {
              borderColor: "#A51E22",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "168px",
            height: "50px",
            textTransform: "capitalize",
            fontSize: "17px",
            borderRadius: "50px",
            "&:hover": { background: "#A51E22" },
          }}
        >
          Next
        </Button>
      </Stack>
    </>
  );
}