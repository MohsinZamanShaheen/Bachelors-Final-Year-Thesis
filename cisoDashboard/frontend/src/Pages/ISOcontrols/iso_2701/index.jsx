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
import { tokens } from "../../../theme";
import HomeIcon from "@mui/icons-material/Home";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { getSections } from "../../../apiClient";

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
                        key={section.sectionId}
                        selected={activeSectionId === section.sectionId}
                        sx={{
                            backgroundColor:
                                activeSectionId === `section-${section.sectionId}`
                                    ? colors.textColor[100]
                                    : colors.primary[100],
                        }}
                        onClick={() =>
                            document
                                .getElementById(`section-${section.sectionId}`)
                                .scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        <ListItemText primary={`${section.sectionId}. ${section.title}`} />
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
                    key={section.sectionId}
                    ref={sectionRefs[section.sectionId]}
                    id={`section-${section.sectionId}`}
                    data-section-id={section.sectionId}
                    sx={{ my: 2 }}
                >
                    <Paper sx={{ padding: "1em", backgroundColor: colors.primary[100] }}>
                        <Typography
                            variant="h5"
                            color={colors.textColor[100]}
                        >{`${section.sectionId} ${section.title}`}</Typography>
                        <Typography paragraph>{section.content}</Typography>
                        {section.subsections &&
                            section.subsections.map((subsec) => (
                                <Box key={subsec.sectionId} sx={{ mt: 2 }}>
                                    {subsec.title && (
                                        <Typography variant="h6">{`${subsec.sectionId} ${subsec.title}`}</Typography>
                                    )}
                                    <Typography paragraph>{subsec.content}</Typography>
                                    {subsec.subsections &&
                                        subsec.subsections.map((subsubsec) => (
                                            <Box key={subsubsec.sectionId} sx={{ pl: 4, mt: 1 }}>
                                                {subsubsec.title && (
                                                    <Typography variant="subtitle1">{`${subsubsec.sectionId} ${subsubsec.title}`}</Typography>
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
    const [sections, setSections] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        const fetchSections = async () => {
            try {
                const response = await getSections();
                setSections(response.data);
            } catch (error) {
                console.error("Error fetching sections", error);
            }
        };

        fetchSections();
    }, []);

    // Initialize refs and add data-section-id attribute
    sections.forEach((section) => {
        const sectionId = `section-${section.sectionId}`;
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
            </Grid>
            <Grid
                container
                sx={{ m: 2, height: "calc(100vh - 64px)", overflow: "hidden" }}
            >
                <Grid item xs={12} md={3}>
                    <Sidebar
                        sections={sections}
                        activeSectionId={activeSectionId}
                    />
                </Grid>
                <Grid item xs={12} md={9}>
                    <ContentArea
                        sections={sections}
                        sectionRefs={sectionRefs.current}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Requirements;
