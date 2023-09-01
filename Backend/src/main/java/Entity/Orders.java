package Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.json.bind.annotation.JsonbAnnotation;
import jakarta.json.bind.annotation.JsonbProperty;
import jakarta.persistence.*;
import Entity.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Orders {





    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
    private List<Product> products = new ArrayList<>();

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "cost")
    private Integer cost;

    @Basic
    @Column(name = "items")
    private String items;

    @Basic
    @Column(name = "status")
    private String status;

    @Basic
    @Column(name = "customer_id")
    private int userid;

    @Basic
    @Column(name = "shipper_id")
    private int shipperid;

    public int getId() {
        return id;
    }

    public String getItems() {
        return items;
    }

    public void setItems(String items) {
        this.items = items;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCustomer() {
        return userid;
    }

    public void setCustomer(Integer userid) {
        this.userid = userid;
    }

    public Integer getShipperid() {
        return shipperid;
    }

    public void setShipperid(Integer shipperid) {
        this.shipperid = shipperid;
    }


    public void setId(int id) {
        this.id = id;
    }

    public Integer getCost() {
        return cost;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

}
