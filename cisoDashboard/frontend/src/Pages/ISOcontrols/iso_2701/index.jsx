import React, { useState, useEffect, useRef } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  Box,
  Divider,
  useTheme,
  Button,
  Grid,
} from "@mui/material";
import Header from "../../../Components/global/Header";
import ISO27001_Sections from "../../../data/ISO27001_Sections.json";
import { tokens } from "../../../theme";
import HomeIcon from "@mui/icons-material/Home";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const Sidebar = ({ sections, activeSectionId }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "100vh",
        overflowY: "auto",
        backgroundColor: colors.primary[100],
      }}
    >
      <List component="nav">
        {sections.map((section) => (
          <ListItemButton
            key={section.id}
            selected={activeSectionId === section.id}
            sx={{
              backgroundColor:
                activeSectionId === `section-${section.id}`
                  ? colors.textColor[100]
                  : colors.primary[100],
            }}
            onClick={() =>
              document
                .getElementById(`section-${section.id}`)
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            <ListItemText primary={`${section.id}. ${section.title}`} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

const ContentArea = ({ sections, sectionRefs }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        overflowY: "auto",
        height: "calc(100vh - 64px)",
      }}
    >
      {sections.map((section) => (
        <Box
          key={section.id}
          ref={sectionRefs[section.id]}
          id={`section-${section.id}`}
          data-section-id={section.id}
          sx={{ my: 2 }}
        >
          <Paper sx={{ padding: "1em", backgroundColor: colors.primary[100] }}>
            <Typography
              variant="h5"
              color={colors.textColor[100]}
            >{`${section.id} ${section.title}`}</Typography>
            <Typography paragraph>{section.content}</Typography>
            {section.subsections &&
              section.subsections.map((subsec) => (
                <Box key={subsec.id} sx={{ mt: 2 }}>
                  {subsec.title && (
                    <Typography variant="h6">{`${subsec.id} ${subsec.title}`}</Typography>
                  )}
                  <Typography paragraph>{subsec.content}</Typography>
                  {subsec.subsections &&
                    subsec.subsections.map((subsubsec) => (
                      <Box key={subsubsec.id} sx={{ pl: 4, mt: 1 }}>
                        {subsubsec.title && (
                          <Typography variant="subtitle1">{`${subsubsec.id} ${subsubsec.title}`}</Typography>
                        )}
                        <Typography paragraph>{subsubsec.content}</Typography>
                      </Box>
                    ))}
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
          </Paper>
        </Box>
      ))}
    </Box>
  );
};

const Requirements = () => {
  const [activeSectionId, setActiveSectionId] = useState("");
  const sectionRefs = useRef({});

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const handleObserverUpdate = (entries) => {
      // Go through each entry and update the state if the section is at the top
      entries.forEach((entry) => {
        // Using isIntersecting and top of the entry bounding box for accuracy
        if (entry.isIntersecting && entry.boundingClientRect.top <= 50) {
          setActiveSectionId(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      handleObserverUpdate,
      observerOptions
    );

    // Add all current sections to the observer
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    // Clean up observer on unmount
    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Initialize refs and add data-section-id attribute
  ISO27001_Sections.sections.forEach((section) => {
    const sectionId = `section-${section.id}`;
    if (!sectionRefs.current[sectionId]) {
      sectionRefs.current[sectionId] = React.createRef();
    }
  });

  return (
    <Grid container>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ m: 2 }}
      >
        <Grid item xs={12} md={8}>
          <Header
            title="ISO 27001 Requirements Complete Documentation"
            subtitle="Information Security Management System Requirements"
            items={[
              { label: "Home", href: "/", icon: HomeIcon },
              { label: "ISO 27001 documentation", href: "/iso2701" },
            ]}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={3.5}
          sx={{ display: "flex", justifyContent: "flex-end", mr: "40px"}}
        >
          <Button
            sx={{
              backgroundColor: colors.buttonColor[100],
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.primary[100]
                    : colors.primary[200],
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download PDF file
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ m: 2, height: "calc(100vh - 64px)", overflow: "hidden" }}
      >
        <Grid item xs={12} md={3}>
          <Sidebar
            sections={ISO27001_Sections.sections}
            activeSectionId={activeSectionId}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <ContentArea
            sections={ISO27001_Sections.sections}
            sectionRefs={sectionRefs.current}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Requirements;
