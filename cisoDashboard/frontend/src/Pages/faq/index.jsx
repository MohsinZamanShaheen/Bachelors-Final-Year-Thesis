import { Box, useTheme } from "@mui/material";
import Header from "../../Components/global/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import HomeIcon from "@mui/icons-material/Home";

const AccordionItem = ({ question, answer }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Accordion sx={{ m: "0 0 10px 0", background: colors.primary[100] }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={colors.textColor[100]} variant="h5">
          {question}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography color={colors.textColor[100]}>{answer}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

const FAQ = () => {
  return (
    <Box m="20px">
      <Header
        title="FAQ"
        subtitle="Frequently Asked Questions Page"
        items={[
          { label: "Home", href: "/", icon: HomeIcon },
          { label: "FAQs", href: "/faq"},
        ]}
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />

      <AccordionItem
        question="An Important Question"
        answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget."
      />
    </Box>
  );
};

export default FAQ;
