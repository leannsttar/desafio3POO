package com.edu.resource;

import com.edu.model.Persona;
import com.edu.repository.PersonaRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/personas")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonaResource {

    @Inject
    PersonaRepository personaRepo;

    @POST
    @Transactional
    public void registrar(Persona persona) {
        personaRepo.persist(persona);
    }

    @GET
    public List<Persona> listar() {
        return personaRepo.listAll();
    }
}
