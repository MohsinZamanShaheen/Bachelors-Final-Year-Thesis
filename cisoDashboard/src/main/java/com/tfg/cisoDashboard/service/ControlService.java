package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Control;
import com.tfg.cisoDashboard.repository.ControlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ControlService {

    @Autowired
    private ControlRepository controlRepository;

    public List<Control> getAllControlsByLanguage(String language) {
        return controlRepository.findByLanguage(language);
    }

    public List<Control> getAllControls(){
        return controlRepository.findAll();
    }

    public Optional<Control> getControlById(Long id) {
        return controlRepository.findById(id);
    }

    public Control saveControl(Control control) {
        return controlRepository.save(control);
    }

    public List<Control> getControlsByControlCode(String code) {
        return controlRepository.findByControlCode(code);
    }

    public Control updateControl(Long id, Control controlDetails) {
        Control control = controlRepository.findById(id).orElse(null);
        if (control != null) {
            control.setCategory(controlDetails.getCategory());
            control.setTitle(controlDetails.getTitle());
            control.setDescription(controlDetails.getDescription());
            return controlRepository.save(control);
        }
        return null;
    }

    public void deleteControl(Long id) {
        controlRepository.deleteById(id);
    }
}