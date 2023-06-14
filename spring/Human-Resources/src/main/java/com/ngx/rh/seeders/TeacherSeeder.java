package com.ngx.rh.seeders;

import com.github.javafaker.Faker;
import com.ngx.rh.entities.Address;
import com.ngx.rh.entities.GPSCoordinates;
import com.ngx.rh.entities.Person;
import com.ngx.rh.entities.Teacher;
import com.ngx.rh.requests.PersonRequest;
import com.ngx.rh.requests.TeacherRequest;
import com.ngx.rh.services.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

@Service
public class TeacherSeeder {

    private static final int COUNT = 150;

    @Autowired
    private TeacherService service;

    private final Faker faker = new Faker(Locale.FRENCH);

    public void seed() {
        boolean make;
        for (int i = 0; i < COUNT; i++){
            make = true;
            while (make){
                make = false;
                try {
                    make();
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                    make = true;
                }
            }
        }
        clean();
    }

    public void clean() {
        service.deleteHangingPersonAccount();
    }

    @Transactional
    public void make() {
        TeacherRequest request = new TeacherRequest(PersonRequest.builder()
            .photo(null)
            .code("ENS" + faker.bothify("?????###", true))
            .firstName(faker.name().firstName())
            .lastName(faker.name().lastName())
            .gender(Math.random() > 0.5 ? Person.Gender.MALE : Person.Gender.FEMALE)
            .about(Math.random() > 0.8 ? faker.lorem().sentence(10, 10) : "")
            .dateOfBirth(dateToCalendar(faker.date().birthday(35, 56)))
            .placeOfBirth(faker.address().city())
            .nationality(faker.country().countryCode2())
            .idType((Math.random() > 0.4 ? Person.IDType.NIC : (Math.random() > 0.5 ? Person.IDType.PASSPORT : Person.IDType.RP)))
            .idNumber(faker.idNumber().valid())
            .idDateOfIssue(dateToCalendar(faker.date().birthday(1, 5)))
            .idPlaceOfIssue(faker.address().city())
            .phone(faker.phoneNumber().phoneNumber())
            .phone2(Math.random() > 0.8 ? faker.phoneNumber().phoneNumber() : null)
            .address(Address.builder()
                .street(faker.address().streetAddress())
                .city(faker.address().city())
                .state(faker.address().state())
                .country(faker.address().country())
                .code(faker.address().zipCode())
                .build())
            .gpsCoordinates(GPSCoordinates.builder()
                .latitude(new BigDecimal(faker.address().latitude().replace(',', '.')))
                .longitude(new BigDecimal(faker.address().longitude().replace(',', '.')))
                .build())
            .build()
        );

        request.setCivility(request.getGender() == Person.Gender.MALE ? Person.Civility.MR : (Math.random() > 0.3 ? Person.Civility.MRS : Person.Civility.MISS));
        request.setUsername((request.getFirstName() + "_" + request.getLastName()).toLowerCase());
        request.setEmail((request.getFirstName() + "." + request.getLastName() + "@example.com").toLowerCase());
        request.setTypeOfContract(Math.random() > 0.8 ? Teacher.Contract.CONTRACTOR : Teacher.Contract.PERMANENT);
        request.setRank(Math.random() > 0.5 ? Teacher.Rank.RANK_1 : Teacher.Rank.RANK_2);
        request.setTitle(faker.job().title());
        request.setDateOfRecruitment(dateToCalendar(faker.date().birthday(1, 6)));
        service.create(request, null);
    }
    private LocalDate dateToCalendar(Date date) {
        return date.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate();
    }
}
