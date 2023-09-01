package com.example.trial;

import jakarta.persistence.*;
import Entity.*;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.ArrayList;
import java.util.List;

@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON )
public class OrderService {

    EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
    EntityManager entityManager = entityManagerFactory.createEntityManager();
    EntityTransaction transaction = entityManager.getTransaction();


    public String placeOrder(Customer customer){
        List<Product> products = new ArrayList<>();
        try {
            transaction.begin();
            Orders order = new Orders();
            order.setItems(customer.getCart());
            order.setCustomer(customer.getId());
            order.setStatus("Order Placed");

            int Cost = 0;
            if(customer.getCart()==null){
                return "Cart is Empty";
            }
            else {
                String[] items = customer.getCart().split(",");
                for (int i = 0; i < items.length; i++) {
                    Product product = entityManager.find(Product.class, Integer.parseInt(items[i]));
                    products.add(product);
                    product.setQuantity(product.getQuantity() - 1);
                    product.setOrder(order);
                    entityManager.persist(product);
                    Cost += product.getPrice();
                }
                order.setCost(Cost);
                order.setProducts(products);
                entityManager.persist(order);
                transaction.commit();
                customer.setCart("");
                return "Order Placed Successfully";
            }
        }
        catch(Exception e){
            transaction.rollback();
            return "Order Failed\n"+e.getMessage();
        }

    }

    public List<Orders> orders ( int id){
            Query query = entityManager.createQuery("SELECT o FROM Orders o WHERE o.userid = :id ");
            query.setParameter("id", id);

            List<Orders> temp = query.getResultList();
            return temp;
        }

    public Orders getOrder(int id){
        Query query = entityManager.createQuery("SELECT o FROM Orders o WHERE o.userid = :id and o.status = 'Order Placed' ");
        query.setParameter("id",id);
        Orders temp = (Orders) query.getSingleResult();
        return temp;
    }
    }

