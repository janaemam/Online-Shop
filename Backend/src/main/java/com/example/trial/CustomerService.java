package com.example.trial;

import Entity.*;
import com.example.trial.OrderService;
import com.example.trial.ShippingService;
import jakarta.ejb.Stateful;
import jakarta.enterprise.context.SessionScoped;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.persistence.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON )
@Path("/customer")
//@Stateful
@SessionScoped
public class CustomerService implements Serializable {
    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    EntityTransaction transaction = entityManager.getTransaction();

    @POST
    @Path("register")
    public String registerCustomer(Customer customer){

        Query query = entityManager.createQuery("SELECT c FROM Customer c WHERE c.email = :email ");
        query.setParameter("email",customer.getEmail());
        if (query.getResultList().isEmpty()){
            transaction.begin();

            entityManager.persist(customer);
            transaction.commit();
            return "Customer Registered Successfully";
        }
        else{
            return "Email is Already Registered\nLogin or Register Another Email";
        }
    }

    @POST
    @Path("/login")
    public Response login(Customer customer) {
        transaction.begin();
        Query query = entityManager.createQuery("SELECT c FROM Customer c WHERE c.email = :email ");
        query.setParameter("email",customer.getEmail());
        List<Customer> temp1 = query.getResultList();
        Customer temp = (Customer) query.getSingleResult();
        if(customer.getEmail().equals(temp.getEmail()) && customer.getPassword().equals(temp.getPassword())){
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

    @POST
    @Path("/add/{product_id},{id}")
    public String addToOrder(@PathParam("product_id") int productId, @PathParam("id") int id){
        transaction.begin();

        Customer c = entityManager.find(Customer.class,id);
        if(c.getCart()==null){
            c.setCart("");
        }
        c.setCart(c.getCart()+productId+",");
        entityManager.persist(c);
        transaction.commit();
        return "Product Added to Cart";
    }

    @POST
    @Path("/remove/{product_id},{id}")
    public String removeFromOrder(@PathParam("product_id") int productId, @PathParam("id") int id){
        transaction.begin();
        Customer c = entityManager.find(Customer.class,id);
        String temp = c.getCart();
        temp = temp.replace(productId+",","");
        c.setCart(temp);
        entityManager.persist(c);
        transaction.commit();
        return "Product Removed from Cart";
    }
    @GET
    @Path("/cart/{id}")
    public List<Product> listCart(@PathParam("id") int id){
        List<Product> products= new ArrayList<>();
        transaction.begin();
        Customer c = entityManager.find(Customer.class,id);
        String cart = c.getCart();
        String[] temp1 = cart.split(",");
        for(int i=0;i<temp1.length;i++){
            if(entityManager.find(Product.class,temp1[i])!=null){
                products.add(entityManager.find(Product.class,temp1[i]));
            }
        }
        transaction.commit();
        return products;
    }

    @GET
    @Path("/carts/{id}")
    public String cart(@PathParam("id") int id){
        transaction.begin();
        Customer c = entityManager.find(Customer.class,id);
        String cart = c.getCart();
        transaction.commit();
        return cart;
    }

    @POST
    @Path("/place/{id}")
    public String placeOrder(@PathParam("id") int id){
        transaction.begin();
        Customer c = entityManager.find(Customer.class,id);
        ShippingService shippingService = new ShippingService();
        OrderService orderService = new OrderService();
        String result = orderService.placeOrder(c);
        transaction.commit();
        return result;


    }
    @POST
    @Path("/shipping/{id}/{id2}")
    public String setShipping(@PathParam("id") int shippingid,@PathParam("id2") int customerid){

        String result ="Shipping Company Not Available in Your Area";

        Shippingcompany shippingcompany= entityManager.find(Shippingcompany.class,shippingid);

        String areas[]=shippingcompany.getArea().split(",");
        Customer customer = entityManager.find(Customer.class,customerid);

        for(int i=0;i<areas.length;i++){
            if(customer.getAddress().equalsIgnoreCase(areas[i])) {
                transaction.begin();
                OrderService orderService = new OrderService();
                Orders order = orderService.getOrder(customerid);
                if (order.getStatus().equals("Order Placed")) {
                    order.setShipperid(shippingcompany.getId());
                    order.setStatus("Shipping in Progress");
                    Orders mergedOrder = entityManager.merge(order);
                    customer.setCart(null);
                    entityManager.merge(customer);
                    result = "Shipping Company Set";
                    transaction.commit();
                    break;
                }
            }

        }
        return result;

    }

    @GET
    @Path("/companies")
    public List<Shippingcompany> companies(){
        transaction.begin();
        Query query = entityManager.createQuery("SELECT s FROM Shippingcompany s");
        List<Shippingcompany> shippingcompanies = query.getResultList();
        transaction.commit();
        return shippingcompanies;
    }

    @GET
    @Path("/orders/{customerid}")
    public List<Orders> getAllorders(@PathParam("customerid") int id){
        Query query = entityManager.createQuery("SELECT o FROM Orders o WHERE o.userid = :id");
        query.setParameter("id",id);
        List<Orders> orders = query.getResultList();

        return orders;
    }

    /*@GET
    @Path("/orders/{id}")
    public List<Orders> orders(@PathParam("id") int id){
        OrderService orderService  = new OrderService();
        return orderService.orders(id);
    }*/

    @GET
    @Path("/products")
    public List<Product> products(){
        transaction.begin();
        Query query = entityManager.createQuery("SELECT p FROM Product p  WHERE p.quantity > 0");
        List<Product> products = query.getResultList();
        transaction.commit();
        return products;
    }


/*
    @GET
    @Path("/orders/{id}")
    public String orders(@PathParam("id") int id){
        OrderService orderService  = new OrderService();
        transaction.begin();

        Query query = entityManager.createQuery("SELECT o FROM Order o WHERE o.userid = :id ");
        query.setParameter("id",id);
        List<Order> temp = query.getResultList();


        Customer c = entityManager.find(Customer.class,id);
        String orders = c.getOrders();
        transaction.commit();
        return orders;
    }
*/


    /*public String addToCart(@PathParam("product_id") int productId, @PathParam("id") int id){
        transaction.begin();
        Query query = entityManager.createQuery("SELECT p FROM Product p WHERE p.id = :id ");
        query.setParameter("id",productId);
        Product product = (Product)query.getSingleResult();
        Customer customer = entityManager.find(Customer.class,id);
        product.setCustomer(customer);
        customer.addToCart(product);
        transaction.commit();
        return "Product Added to Cart";
    }*/


    /*    @POST
    @Path("add/{product_id},{id}")
    public String addToCart(@PathParam("product_id") int productId, Customer customer){
        transaction.begin();
        Query query = entityManager.createQuery("SELECT p FROM Product p WHERE p.id = :id ");
        query.setParameter("id",productId);
        Product product = (Product)query.getSingleResult();
        customer.addToCart(product);
        return "Product Added to Cart";
    }*/
    /*
    @POST
    @Path("remove/{product_id}")
    public String removeFromCart(@PathParam("product_id") int productId, Customer customer){
        transaction.begin();
        Query query = entityManager.createQuery("SELECT p FROM Product p WHERE p.id = :id ");
        query.setParameter("id",productId);
        Product product = (Product)query.getSingleResult();
        customer.removeFromCart(product);
        return "Product Removed from Cart";
    }

    @POST
    @Path("buy")
    public String buy(Customer customer){
        OrderService orderService = new OrderService();
        Order order = new Order();
        transaction.begin();
        for(int i =0;i<customer.getCart().size();i++){
            int itemId = customer.getCart().get(i).getId();
            order.setItems(order.getItems()+itemId+",");
        }

        order.setUserid(customer.getId());
        String result = orderService.placeOrder(order);
        transaction.commit();
        return result;
    }
    @GET
    @Path("/cart/{id}")
    public List<Product> getCart(@PathParam("id") int id){
        transaction.begin();
        Query query = entityManager.createQuery("SELECT c FROM Customer c WHERE c.id = :id ");
        query.setParameter("id",id);
        Customer customer = (Customer)query.getSingleResult();
        List<Product> cart = customer.getCart();
        transaction.commit();
        return cart;
    }*/



}
