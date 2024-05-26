import { useState, useEffect } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import Header from "../../Components/global/Header";
import { tokens } from "../../theme";
import HomeIcon from "@mui/icons-material/Home";
import { getUserEvents, createEvent, deleteEvent } from "../../apiClient";
import { useCompany } from "../../Context/CompanyContext";

const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { selectedCompany } = useCompany();
    const [currentEvents, setCurrentEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            if (selectedCompany) {
                try {
                    const response = await getUserEvents(selectedCompany);
                    const events = response.data.map(event => ({
                        id: event.id,
                        title: event.title,
                        start: event.startTime,
                        end: event.endTime,
                        allDay: event.allDay
                    }));
                    setCurrentEvents(events);
                } catch (error) {
                    console.error("Error fetching events", error);
                }
            }
        };
        fetchEvents();
    }, [selectedCompany]);

    const handleDateClick = async (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title && selectedCompany) {
            const newEvent = {
                title,
                startTime: selected.startStr,
                endTime: selected.endStr,
                allDay: selected.allDay
            };
            try {
                const response = await createEvent(newEvent,selectedCompany);
                const createdEvent = {
                    id: response.data.id,
                    title,
                    start: selected.startStr,
                    end: selected.endStr,
                    allDay: selected.allDay
                };
                calendarApi.addEvent(createdEvent);
                setCurrentEvents(prevEvents => [...prevEvents, createdEvent]);
            } catch (error) {
                console.error("Error creating event", error);
            }
        }
    };

    const handleEventClick = async (selected) => {
        if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
            try {
                await deleteEvent(selected.event.id);
                selected.event.remove();
                setCurrentEvents(prevEvents => prevEvents.filter(event => event.id !== selected.event.id));
            } catch (error) {
                console.error("Error deleting event", error);
            }
        }
    };

    return (
        <Box m="20px">
            <Header
                title="Calendar"
                subtitle="Full Calendar Interactive Page"
                items={[
                    { label: "Home", href: "/", icon: HomeIcon },
                    { label: "Calendar", href: "/calendar" },
                ]}
            />

            <Box display="flex" justifyContent="space-between">
                {/* CALENDAR SIDEBAR */}
                <Box
                    flex="1 1 20%"
                    backgroundColor={colors.primary[100]}
                    border={`1px solid  ${colors.elementBorders[100]}`}
                    boxShadow={"2px 2px 3px #888888"}
                    p="15px"
                    borderRadius="4px"
                >
                    <Typography variant="h5">Events</Typography>
                    <List>
                        {currentEvents.map((event) => (
                            <ListItem
                                key={event.id}
                                sx={{
                                    backgroundColor: colors.secondary[100],
                                    margin: "10px 0",
                                    borderRadius: "2px",
                                }}
                            >
                                <ListItemText
                                    sx={{
                                        color:
                                            theme.palette.mode === "dark"
                                                ? colors.textColor[100]
                                                : colors.textColor[300],
                                    }}
                                    primary={event.title}
                                    secondary={
                                        <Typography>
                                            {formatDate(event.start, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                {/* CALENDAR */}
                <Box
                    flex="1 1 100%"
                    ml="15px"
                    sx={{
                        backgroundColor: colors.primary[100],
                        border: `1px solid  ${colors.elementBorders[100]}`,
                    }}
                >
                    <FullCalendar
                        height="75vh"
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}
                        events={currentEvents}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Calendar;
