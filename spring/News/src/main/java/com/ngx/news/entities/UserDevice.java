package com.ngx.news.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UserDevice implements Serializable {

    @Id
    @Column(name = "device_id")
    private String device;
    private String uid;

}
