package com.ngx.rh.requests;

import com.ngx.rh.entities.Address;
import com.ngx.rh.entities.GPSCoordinates;
import com.ngx.rh.entities.Person.Civility;
import com.ngx.rh.entities.Person.Gender;
import com.ngx.rh.entities.Person.IDType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Calendar;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PersonRequest {

    private MultipartFile photo;

    @NotBlank(message = "le champ \"code\" est obligatoire")
    private String code;
    @NotBlank(message = "le champ \"Nom d'utilisateur\" est obligatoire")
    private String username;
    @NotBlank(message = "le champ \"Prénom\" est obligatoire")
    private String firstName;
    @NotBlank(message = "le champ \"Nom\" est obligatoire")
    private String lastName;
    @NotNull(message = "le champ \"Sexe\" est obligatoire")
    private Gender gender;
    //@NotNull(message = "le champ \"Civilité\" est obligatoire")
    private Civility civility;
    private String about;
    @NotNull(message = "le champ \"Date de Naissance\" est obligatoire")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfBirth;
    @NotBlank(message = "le champ \"Lieu de Naissance\" est obligatoire")
    private String placeOfBirth;
    @NotBlank(message = "le champ \"Nationalité\" est obligatoire")
    private String nationality;
    //@NotNull(message = "le champ \"Pièce d'Identité\" est obligatoire")
    private IDType idType;
    //@NotBlank(message = "le champ \"Numéro de Pièce d'Identité\" est obligatoire")
    private String idNumber;
    //@NotNull(message = "le champ \"Date de Délivrance\" est obligatoire")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate idDateOfIssue;
    //@NotBlank(message = "le champ \"Lieu de Délivrance\" est obligatoire")
    private String idPlaceOfIssue;
    @NotBlank(message = "le champ \"Email\" est obligatoire")
    private String email;
    @NotBlank(message = "le champ \"Téléphone\" est obligatoire")
    private String phone;
    private String phone2;
    private Address address;
    private GPSCoordinates gpsCoordinates;

    public PersonRequest(PersonRequest copy) {
        this.photo = copy.photo;
        this.code = copy.code;
        this.username = copy.username;
        this.firstName = copy.firstName;
        this.lastName = copy.lastName;
        this.gender = copy.gender;
        this.civility = copy.civility;
        this.about = copy.about;
        this.dateOfBirth = copy.dateOfBirth;
        this.placeOfBirth = copy.placeOfBirth;
        this.nationality = copy.nationality;
        this.idType = copy.idType;
        this.idNumber = copy.idNumber;
        this.idDateOfIssue = copy.idDateOfIssue;
        this.idPlaceOfIssue = copy.idPlaceOfIssue;
        this.email = copy.email;
        this.phone = copy.phone;
        this.phone2 = copy.phone2;
        this.address = copy.address;
        this.gpsCoordinates = copy.gpsCoordinates;
    }
}
