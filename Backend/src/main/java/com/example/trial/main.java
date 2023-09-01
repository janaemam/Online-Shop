package com.example.trial;


import Entity.Admin;
import jakarta.persistence.*;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Produces;

public class main {
    public static void main(String[] args) {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("default");
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        EntityTransaction transaction = entityManager.getTransaction();


        try {
            transaction.begin();
            Admin admin = new Admin();
            admin.setUname("Jana");
            admin.setPassword("123");

            entityManager.persist(admin);
            transaction.commit();
        }
        finally {
            if (transaction.isActive()) {
                transaction.rollback();
            }
            entityManager.close();
            entityManagerFactory.close();

        }
    }
}
