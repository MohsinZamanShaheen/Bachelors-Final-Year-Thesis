package com.tfg.cisoDashboard.service;

import com.tfg.cisoDashboard.model.Photo;
import com.tfg.cisoDashboard.repository.PhotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PhotoService {
    @Autowired
    private PhotoRepository photoRepository;
    public Photo savePhoto(Photo photo) {
        return photoRepository.save(photo);
    }
}
