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
          { label: "FAQs", href: "/faq" },
        ]}
      />

      <AccordionItem
        question="What is a CISO Dashboard?"
        answer="A CISO Dashboard is a centralized platform that provides Chief Information Security Officers (CISOs) with real-time visibility into their organization's security posture. It aggregates data from various sources to facilitate monitoring, compliance tracking, and risk management."
      />

      <AccordionItem
        question="How does the dashboard help in compliance management?"
        answer="The dashboard provides comprehensive compliance tracking tools that help ensure your organization adheres to necessary regulatory standards. It automatically updates to reflect changes in compliance requirements and displays your current compliance status."
      />

      <AccordionItem
        question="Can I customize the dashboard to fit our specific security needs?"
        answer="Yes, the dashboard is highly customizable, allowing users to configure widgets, alerts, and reports according to their specific security requirements and preferences."
      />

      <AccordionItem
        question="What kind of security incidents can the dashboard detect?"
        answer="The dashboard can detect a wide range of security incidents, including but not limited to unauthorized access, data breaches, and anomalies in user behavior and network traffic."
      />

      <AccordionItem
        question="How does the dashboard ensure data privacy?"
        answer="We implement strict data privacy measures including encryption, access controls, and regular audits to ensure that all data processed through the dashboard is handled securely and in compliance with GDPR and other data protection regulations."
      />

      <AccordionItem
        question="What are the system requirements for using the dashboard?"
        answer="The dashboard is designed to be lightweight and compatible with modern web browsers. It can be accessed from desktops, tablets, and smartphones, ensuring you have critical security insights at any time."
      />

      <AccordionItem
        question="Is there a mobile version or app available for the dashboard?"
        answer="While there is currently no standalone mobile app, the dashboard is mobile-responsive, allowing full access to all features and functionalities from a mobile web browser."
      />

      <AccordionItem
        question="How often is the data on the dashboard updated?"
        answer="Data on the dashboard is updated in real-time, providing continuous monitoring and immediate visibility into the latest security events and status across your network."
      />

      <AccordionItem
        question="Can I integrate third-party security tools with the dashboard?"
        answer="Yes, the dashboard supports integration with a wide range of third-party security tools and platforms, enabling you to leverage existing cybersecurity investments and centralize your security operations."
      />

      <AccordionItem
        question="Who should I contact if I have technical issues with the dashboard?"
        answer="For any technical issues, please contact our support team through the help center on the dashboard, or directly via our support email or phone number provided in the dashboard documentation."
      />
    </Box>
  );
};

export default FAQ;
