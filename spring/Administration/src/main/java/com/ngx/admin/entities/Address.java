package com.ngx.admin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.logging.log4j.util.Strings;

import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Address implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;
    private String city;
    private String state;
    private String country;
    private String code;


    public boolean isBlank() {
        return (Strings.isBlank(street) &&
            Strings.isBlank(city) &&
            Strings.isBlank(state) &&
            Strings.isBlank(country) &&
            Strings.isBlank(code));

    }

    public static boolean isBlank(Address address) {
        if (address == null)
            return true;
        return address.isBlank();
    }

}
