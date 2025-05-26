package com.edu.repository;

import com.edu.model.Mascota;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class MascotaRepository implements PanacheRepository<Mascota> {
}
