package com.edu;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/info")
public class InfoResource {
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String info() {
        return "{\"app\": \"Quarkus Demo\", \"status\": \"OK\"}";
    }
}