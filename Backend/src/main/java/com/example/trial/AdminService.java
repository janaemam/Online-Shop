package com.example.trial;

import Entity.*;
import jakarta.ejb.Stateless;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.persistence.*;
import jakarta.security.enterprise.credential.Password;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;


@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON )
@Stateless
@Path("/admin")
public class AdminService {
    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    EntityTransaction transaction = entityManager.getTransaction();

    @POST
    @Path("/login")
    public Response login(Admin admin) {
        transaction.begin();
        Query query = entityManager.createQuery("SELECT a FROM Admin a WHERE a.uname = :name ");
        query.setParameter("name", admin.getUname());
        List<Admin> temp1 = query.getResultList();

        Admin temp = (Admin) query.getSingleResult();
        if (admin.getUname().equals(temp.getUname()) && admin.getPassword().equals(temp.getPassword())) {
            transaction.commit();
            JsonObject jsonResponse = Json.createObjectBuilder()
                    .add("message", "Login Successfully")
                    .add("id", temp.getId())
                    .build();
            return Response.status(Response.Status.OK).entity(jsonResponse.toString()).build();
        }else {
            transaction.rollback();
            return Response.status(Response.Status.UNAUTHORIZED).entity("Login Failed").build();
        }
    }



    @Path("/createseller")
    @POST
    public String createSellingCompany(SellingCompany sellingCompany){
        try{
            // Check if a Shippingcompany with the same name already exists
            Query query = entityManager.createQuery("SELECT s FROM Shippingcompany s WHERE s.name = :name");
            query.setParameter("name", sellingCompany.getName());
            List<SellingCompany> existingSellingCompanies = query.getResultList();
            if (!existingSellingCompanies.isEmpty()) {
                return "A Shipping Company with the name " + sellingCompany.getName() + " already exists";
            }

            // Create a new Shippingcompany
            transaction.begin();
            sellingCompany.setPassword(passwordGenerator());
            entityManager.persist(sellingCompany);
            transaction.commit();
            return "Selling Company Created\n"+sellingCompany.getPassword()+" is your login password";

        }finally {
            if (transaction.isActive()) {
                transaction.rollback();
                return "Error creating Selling Company";
            }
            entityManager.close();
            entityManagerFactory.close();
        }
    }


    @Path("/createshipper")
    @POST
    public String createShippingCompany(Shippingcompany shippingcompany){
        try{
            // Check if a Shippingcompany with the same name already exists
            Query query = entityManager.createQuery("SELECT s FROM Shippingcompany s WHERE s.name = :name");
            query.setParameter("name", shippingcompany.getName());
            List<Shippingcompany> existingShippingCompanies = query.getResultList();
            if (!existingShippingCompanies.isEmpty()) {
                return "A Shipping Company with the name " + shippingcompany.getName() + " already exists";
            }

            // Create a new Shippingcompany
            transaction.begin();
            shippingcompany.setPassword(passwordGenerator());
            entityManager.persist(shippingcompany);
            transaction.commit();
            return "Selling Company Created\n"+shippingcompany.getPassword()+" is your login password";

        }finally {
            if (transaction.isActive()) {
                transaction.rollback();
                return "Error creating Shipping Company";
            }
            entityManager.close();
            entityManagerFactory.close();
        }
    }



    @Path("listseller")
    @GET
    public List<SellingCompany> listSellers(){
        try{
            transaction.begin();
            Query query = entityManager.createQuery("SELECT s FROM SellingCompany s");
            List<SellingCompany> sellers= query.getResultList();
            transaction.commit();
            return sellers;

        }finally {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            entityManager.close();
            entityManagerFactory.close();
        }
    }

    @Path("listshipper")
    @GET
    public List<Shippingcompany> listShippers(){
        try{
            transaction.begin();
            Query query = entityManager.createQuery("SELECT s FROM Shippingcompany s");
            List<Shippingcompany> shippers= query.getResultList();
            transaction.commit();
            return shippers;

        }finally {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            entityManager.close();
            entityManagerFactory.close();
        }
    }

    @Path("listusers")
    @GET
    public List<Customer> listUsers(){

        transaction.begin();
        Query query = entityManager.createQuery("SELECT s FROM Customer s");
        List<Customer> users= query.getResultList();
        transaction.commit();
        return users;
    }

    public String passwordGenerator(){
        int number = (int) (Math.random());
        String Upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String Lower = Upper.toLowerCase();
        char upperletter = Upper.charAt((int) (Math.random()*Upper.length()));
        char lowerletter = Lower.charAt((int) (Math.random()*Upper.length()));

        String password= String.valueOf("@"+number+upperletter+lowerletter+"#");
        return password;
    }
}