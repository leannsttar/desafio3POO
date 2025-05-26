package com.edu.resource;

import com.edu.model.Solicitud;
import com.edu.repository.SolicitudRepository;
import com.edu.repository.MascotaRepository;
import com.edu.repository.PersonaRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Path("/solicitudes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SolicitudResource {

    @Inject
    SolicitudRepository solicitudRepo;

    @Inject
    MascotaRepository mascotaRepo;

    @Inject
    PersonaRepository personaRepo;

    @POST
    @Transactional
    public void crear(Solicitud s) {
        s.setFechaSolicitud(LocalDate.now());
        s.setEstado(Solicitud.Estado.pendiente);
        solicitudRepo.persist(s);
    }

    @GET
    public List<Map<String, Object>> listar() {
        List<Solicitud> solicitudes = solicitudRepo.listAll();
        return solicitudes.stream().map(s -> {
            var mascota = mascotaRepo.findById(s.getIdMascota());
            var persona = personaRepo.findById(s.getIdPersona());

            Map<String, Object> solicitudData = new HashMap<>();
            solicitudData.put("id", s.getId());
            solicitudData.put("mascotaNombre", mascota.getNombre());
            solicitudData.put("personaNombre", persona.getNombre());
            solicitudData.put("fechaSolicitud", s.getFechaSolicitud());
            solicitudData.put("estado", s.getEstado());

            return solicitudData;
        }).collect(Collectors.toList());
    }

    @PUT
    @Path("/{id}")
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public void cambiarEstado(@PathParam("id") Long id, SolicitudEstadoDTO estadoDTO) {
        Solicitud s = solicitudRepo.findById(id);
        if (s != null) {
            s.setEstado(Solicitud.Estado.valueOf(estadoDTO.estado.toLowerCase()));
            
            // Si la solicitud es aceptada, actualizar estado de la mascota
            if (estadoDTO.estado.equalsIgnoreCase("aceptada")) {
                var mascota = mascotaRepo.findById(s.getIdMascota());
                if (mascota != null) {
                    mascota.setEstado("adoptado");
                    
                    // Rechazar otras solicitudes pendientes para esta mascota
                    List<Solicitud> solicitudesPendientes = solicitudRepo.list(
                        "idMascota = ?1 and estado = ?2 and id != ?3", 
                        mascota.getId(), 
                        Solicitud.Estado.pendiente,
                        s.getId()
                    );
                    
                    for (Solicitud otraSolicitud : solicitudesPendientes) {
                        otraSolicitud.setEstado(Solicitud.Estado.rechazada);
                    }
                }
            }
        }
    }

    public static class SolicitudDTO {
        public Long idMascota;
        public Long idPersona;
    }

    public static class SolicitudEstadoDTO {
        public String estado;
    }
}
