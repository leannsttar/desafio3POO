package com.edu.resource;

import com.edu.model.Mascota;
import com.edu.repository.MascotaRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/mascotas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MascotaResource {

    @Inject
    MascotaRepository mascotaRepo;

    @GET
    public List<Mascota> listar() {
        return mascotaRepo.listAll();
    }

    @POST
    @Transactional
    public void crear(Mascota mascota) {
        mascotaRepo.persist(mascota);
    }

    @PUT
    @Path("/{id}/estado")
    @Transactional
    public void cambiarEstado(@PathParam("id") Long id, String nuevoEstado) {
        Mascota m = mascotaRepo.findById(id);
        m.estado = Mascota.Estado.valueOf(nuevoEstado);
    }
}
