package com.tfg.cisoDashboard.repository;


import com.tfg.cisoDashboard.model.Control;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ControlRepository extends JpaRepository<Control, Long> {

    List<Control> findByLanguage(String language);
    List<Control> findByControlCode(String code);
}
