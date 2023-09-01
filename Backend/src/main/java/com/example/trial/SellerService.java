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
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.node.ArrayNode;
import org.codehaus.jackson.node.ObjectNode;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON )
@Stateful
@SessionScoped
@Path("/seller")
public class SellerService implements Serializable {

    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    EntityTransaction transaction = entityManager.getTransaction();

    @Path("/checkpassword/{name}")
    @GET
    public Response checkPassword(@PathParam("name") String name) {
        // Check if a Shippingcompany with the given name exists
        Query query = entityManager.createQuery("SELECT s FROM SellingCompany s WHERE s.name = :name");
        query.setParameter("name", name);
        List<SellingCompany> sellingCompanies = query.getResultList();
        if (sellingCompanies.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity("No Selling Company found with the name " + name).build();
        }

        // Get the password for the first matching Shippingcompany
        String password = sellingCompanies.get(0).getPassword();

        return Response.ok().entity(password).build();
    }


    @Path("/login")
    @POST
    public Response login(SellingCompany sellingcompany) {
        transaction.begin();
        Query query = entityManager.createQuery("SELECT s FROM SellingCompany s WHERE s.name = :name ");
        query.setParameter("name", sellingcompany.getName());
        List<SellingCompany> temp1 = query.getResultList();

            SellingCompany temp = (SellingCompany) query.getSingleResult();
            if (sellingcompany.getName().equals(temp.getName()) && sellingcompany.getPassword().equals(temp.getPassword())) {
                transaction.commit();
                JsonObject jsonResponse = Json.createObjectBuilder()
                        .add("message", "Login Successfully")
                        .add("sellerid", temp.getId())
                        .build();
                return Response.status(Response.Status.OK).entity(jsonResponse.toString()).build();

        }
        else {
            transaction.rollback();
            return Response.status(Response.Status.UNAUTHORIZED).entity("Login Failed").build();
        }
    }


    @Path("/add/{sellerid}")
    @POST
    public String addProduct( @PathParam("sellerid") int sellerid,Product product){

        transaction.begin();
        Query query = entityManager.createQuery("SELECT p FROM Product p WHERE p.name = :name ");
        query.setParameter("name",product.getName());
        List<Product> temp1 = query.getResultList();
        //Product temp = (Product) query.getSingleResult();
        if(temp1.isEmpty()) {
            product.setSellerid(sellerid);
            entityManager.persist(product);
            transaction.commit();
            return "Product Added Successfully";
        }
        else{
            transaction.rollback();
            return "Product Already Exists";
        }
    }

    @Path("/products/{sellerid}")
    @GET
    public List<Product> getProducts(@PathParam("sellerid") int sellerid){
        Query query = entityManager.createQuery("SELECT p FROM Product p WHERE  p.sellerid= :sellerid");
        query.setParameter("sellerid",sellerid);
        List<Product> products = query.getResultList();
        return products;
    }

    @Path("/remove/{seller_id}/{product_id}")
    @POST
    public String removeProduct( @PathParam("seller_id") int sellerid,@PathParam("product_id") int productId){

        transaction.begin();
        Product product = entityManager.find(Product.class,productId);

        //Product temp = (Product) query.getSingleResult();
        if(product == null) {
            transaction.rollback();
            return "Product Doesn't Exist";
        }
        else{
            entityManager.remove(product);
            entityManager.flush();

            transaction.commit();
            return "Product Removed Successfully";
        }
    }
    @Path("/allproducts/{id}")
    @GET
    public List<Product> getAllProducts(@PathParam("id") int id){
        Query query = entityManager.createQuery("SELECT p FROM Product p WHERE p.sellerid= :id");
        query.setParameter("id",id);
        List<Product> products = query.getResultList();
        return products;
    }

    @Path("/sold/{sellerid}")
    @GET
    public String getSoldProducts(@PathParam("sellerid") int sellerid) throws IOException {
        List<Product> products = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();
        ArrayNode productNodes = mapper.createArrayNode();

        Query query = entityManager.createQuery("SELECT o FROM Orders o WHERE o.status = :status ");
        query.setParameter("status","Delivered");
        List<Orders> orders = query.getResultList();
        if(orders.isEmpty()){
            return "No Products Sold";
        }
        else {
            for (Orders order : orders) {
                String temp[] = order.getItems().split(",");
                for (int i = 0; i < temp.length; i++) {
                    Product p = entityManager.find(Product.class, Integer.parseInt(temp[i]));
                    if (p.getSellerid() == sellerid) {
                        Customer c = entityManager.find(Customer.class, order.getCustomer());
                        Shippingcompany s = entityManager.find(Shippingcompany.class, order.getShipperid());
                        ObjectNode customObject = mapper.createObjectNode();
                        customObject.put("Product Name", p.getName());
                        customObject.put("Price", p.getPrice());
                        customObject.put("Description", p.getDescription());
                        customObject.put("Customer Name", c.getName());
                        customObject.put("Customer Email", c.getEmail());
                        customObject.put("Customer Address", c.getAddress());
                        customObject.put("Shipping Company", s.getName());

                        productNodes.add(customObject);
                    }
                }
            }
        }
        String jsonString = mapper.writeValueAsString(productNodes);
        return jsonString;
    }
}

