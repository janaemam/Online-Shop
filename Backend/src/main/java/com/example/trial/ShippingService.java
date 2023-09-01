package com.example.trial;

import jakarta.ejb.Stateful;
import jakarta.enterprise.context.SessionScoped;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.persistence.*;
import jakarta.ws.rs.*;
import Entity.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.Serializable;
import java.util.List;
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON )
@Path("/shipping")
@Stateful
@SessionScoped
public class ShippingService implements Serializable {
    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    EntityTransaction transaction = entityManager.getTransaction();
    @Path("/checkpassword/{name}")
    @GET
    public Response checkPassword(@PathParam("name") String name) {
        // Check if a Shippingcompany with the given name exists
        Query query = entityManager.createQuery("SELECT s FROM Shippingcompany s WHERE s.name = :name");
        query.setParameter("name", name);
        List<Shippingcompany> shippingCompanies = query.getResultList();
        if (shippingCompanies.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity("No Shipping Company found with the name " + name).build();
        }

        // Get the password for the first matching Shippingcompany
        String password = shippingCompanies.get(0).getPassword();

        return Response.ok().entity(password).build();
    }



    @Path("/login")
    @POST
    public Response login(Shippingcompany shippingcompany){
        transaction.begin();
        Query query = entityManager.createQuery("SELECT s FROM Shippingcompany s WHERE s.name = :name ");
        query.setParameter("name",shippingcompany.getName());
        List<Shippingcompany> temp1 = query.getResultList();
        Shippingcompany temp = (Shippingcompany) query.getSingleResult();
        if (shippingcompany.getName().equals(temp.getName()) && shippingcompany.getPassword().equals(temp.getPassword())) {
            transaction.commit();
            JsonObject jsonResponse = Json.createObjectBuilder()
                    .add("message", "Login Successfully")
                    .add("id", temp.getId())
                    .build();
            return Response.status(Response.Status.OK).entity(jsonResponse.toString()).build();
        }
        else {
            transaction.rollback();
            return Response.status(Response.Status.UNAUTHORIZED).entity("Login Failed").build();
        }
    }

    @Path("/list/{id}")
    @GET
    public List<Orders> getOrders(@PathParam("id")int id){
        Query query = entityManager.createQuery("SELECT o FROM Orders o WHERE o.shipperid = :id ");
        query.setParameter("id",id);
        List<Orders> temp = query.getResultList();
        return temp;
    }

    @Path("/update/{shipperid},{orderid}")
    @POST
    public String updateOrder(@PathParam("shipperid")int shipperid, @PathParam("orderid")int orderid){
        transaction.begin();
        Query query = entityManager.createQuery("SELECT o FROM Orders o WHERE o.id = :id ");
        query.setParameter("id",orderid);
        Orders temp = (Orders) query.getSingleResult();
        temp.setStatus("Delivered");
        entityManager.merge(temp);
        transaction.commit();
        return "Order Updated";
    }




}