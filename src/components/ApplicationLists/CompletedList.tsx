import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "../../services/api";
import { Box, Button, Checkbox, Stack, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FormControl, InputAdornment, TextField } from "@mui/material";
import { format } from "date-fns";

interface MyData {
  id: number;
  home_country: string;
  host_country: string;
  created_at: string;
  compliance_type: string;
  fillinginfo: string;
  downloadA1: boolean;
}
const columns: GridColDef[] = [
  { field: "id", headerName: "Case ID", width: 120 },
  { field: "home_country", headerName: "Home Country", width: 130 },
  { field: "host_country", headerName: "Host Country", width: 130 },
  { field: "date_submitted", headerName: "Date Submitted", width: 130 },
  { field: "compliance_type", headerName: "Application Type", width: 200 },
  { field: "fillinginfo", headerName: "Filling Information", width: 260 },
  {
    field: "downloadA1",
    headerName: "Download A1",
    width: 200,
    renderHeader: (params) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Checkbox checked={false} indeterminate={false} color="primary" />
        <Typography variant="body1">A1 Download</Typography>
      </div>
    ),
    renderCell: (params) => (
      <Checkbox checked={params.row.downloadA1} color="primary" />
    ),
  },
];

const CompletedList: React.FC = () => {
  const [data, setData] = useState<MyData[]>([]);
  const [homeCountryFilter, setHomeCountryFilter] = useState("");
  const [hostCountryFilter, setHostCountryFilter] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://3.93.15.104/api/compliance/requests"
      );
      const modifiedData = response.data.results.map(
        (data: any, index: number) => ({
          id: index,
          date_submitted: format(new Date(data.created_at), "MM-dd-yyyy"),
          fillinginfo: "None",
          ...data,
        })
      ) as MyData[];
      setData(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleHomeCountryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHomeCountryFilter(event.target.value);
    },
    []
  );

  const handleHostCountryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setHostCountryFilter(event.target.value);
    },
    []
  );

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const homeCountryMatches = row.home_country
        .toLowerCase()
        .includes(homeCountryFilter.toLowerCase());
      const hostCountryMatches = row.host_country
        .toLowerCase()
        .includes(hostCountryFilter.toLowerCase());
      return homeCountryMatches && hostCountryMatches;
    });
  }, [data, homeCountryFilter, hostCountryFilter]);

  return (
    <div style={{ height: 400, width: "100%" }} className="action-table">
      <Box>
        <Typography variant="h5" className="action-req">
          Completed Applications
        </Typography>
        <Typography className="action-state">
          Below is a list of A1 social security applications which have been
          filed. We have also included the relevant filing information which
          were issued along with a copy of the A1 application.
        </Typography>
      </Box>
      <Box sx={{ display: "flex", padding: "25px 0px", gap: "80px" }}>
        <FormControl sx={{ width: "265px" }}>
          <TextField
            label="Home Country"
            variant="standard"
            focused
            placeholder="Search here"
            value={homeCountryFilter}
            onChange={handleHomeCountryChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <img src="/icon/search.svg" alt="" />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={{ width: "265px" }}>
          <TextField
            label="Host Country"
            variant="standard"
            focused
            placeholder="Search here"
            value={hostCountryFilter}
            onChange={handleHostCountryChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <img src="/icon/search.svg" alt="" />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
      <DataGrid
        rows={filteredData}
        columns={columns}
        hideFooter={true}
        getRowId={(row) => row.id}
      />
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
            borderColor: "#A51E22",
            color: "#A51E22",
            borderRadius: "50px",
            "&:hover": {
              borderColor: "#A51E22",
            },
          }}
        >
          EXPORT
        </Button>
        <Button
          variant="contained"
          sx={{
            width: "168px",
            height: "50px",
            background: "#A51E22",
            borderRadius: "50px",
            "&:hover": { background: "#A51E22" },
          }}
        >
          DOWNLOAD
        </Button>
      </Stack>
    </div>
  );
};

export default CompletedList;
