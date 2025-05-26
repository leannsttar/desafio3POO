package com.edu.repository;

import com.edu.model.Solicitud;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class SolicitudRepository implements PanacheRepository<Solicitud> {
}
