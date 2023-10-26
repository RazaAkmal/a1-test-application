import { Box } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: "70px",
        background: "#1F3543",
        alignItems: "center",
        position: "relative",
        zIndex: "9999",
        marginTop: "25px",

      }}
    >
      <Box>
        <ul className="footer-links">
          <li>
            <a href="#">FAQ</a>
          </li>
          <li>
            <a href="#">About us</a>
          </li>
          <li>
            <a href="#">Terms of services</a>
          </li>
          <li>
            <a href="#">Term of use</a>
          </li>
          <li>
            <a href="#">Contact us</a>
          </li>
        </ul>
      </Box>
      <Box sx={{ display: "flex", gap: "15px", marginRight: "20px" }}>
        <a href="#">
          <img src="/icon/facebook.svg" alt="Facebook" />
        </a>
        <a href="#">
          <img src="/icon/linkdin.svg" alt="LinkdIn" />
        </a>
        <a href="#">
          <img src="/icon/twitter.svg" alt="Twitter" />
        </a>
      </Box>
    </Box>
  );
};

export default Footer;
