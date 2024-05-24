package com.tfg.cisoDashboard.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private OffsetDateTime startTime;
    private OffsetDateTime endTime;
    private boolean allDay;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
