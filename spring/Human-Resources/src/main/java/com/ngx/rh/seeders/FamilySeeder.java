package com.ngx.rh.seeders;

import com.github.javafaker.Faker;
import com.ngx.rh.entities.Address;
import com.ngx.rh.entities.GPSCoordinates;
import com.ngx.rh.entities.Parent;
import com.ngx.rh.entities.Person;
import com.ngx.rh.requests.ParentRequest;
import com.ngx.rh.requests.PersonRequest;
import com.ngx.rh.requests.StudentRequest;
import com.ngx.rh.services.ParentService;
import com.ngx.rh.services.StudentService;
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
public class FamilySeeder {

    private static final int COUNT = 150;

    @Autowired
    private ParentService parentService;
    @Autowired
    private StudentService studentService;

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
        parentService.deleteHangingPersonAccount();
    }
    @Transactional
    public void make() {
        String lastName = faker.name().lastName();
        Address address = makeAddress();
        GPSCoordinates gpsCoordinates = makeGPSCoordinates();

        System.out.println("BUILDING ...");

        Long fatherId = null, motherId = null;
        if (Math.random() < 0.8)
            fatherId = parentService.create(
                makeParent(lastName, new Address(address), new GPSCoordinates(gpsCoordinates), Person.Gender.MALE), null);

        System.out.println("FATHER BUILT OR SKIPPED ...");
        if (Math.random() < 0.5 || fatherId == null)
            motherId = parentService.create(
                makeParent(lastName, new Address(address), new GPSCoordinates(gpsCoordinates), Person.Gender.FEMALE), null);

        System.out.println("MOTHER BUILT OR SKIPPED ...");

        int count = (int) Math.floor(Math.random() * 3) + 1;
        for (int i = 0; i < count; i++) {
            studentService.create(makeStudent(lastName, fatherId, motherId), null);
            System.out.println("SIBLING BUILT...");
        }

    }

    private PersonRequest make(String lastName, boolean isParent, Person.Gender gender) {
        boolean hasId = (Math.random() > (isParent ? 0 : 0.8));
        Person.IDType id = (Math.random() > 0.4 ? Person.IDType.NIC : (Math.random() > 0.5 ? Person.IDType.PASSPORT : Person.IDType.RP));
        PersonRequest person = PersonRequest.builder()
            .photo(null)
            .code((isParent ? "PAR" : "STU") + faker.bothify("?????###", true))
            .firstName(faker.name().firstName())
            .lastName(lastName)
            .gender(gender)
            .about(Math.random() > 0.8 ? faker.lorem().sentence(10, 10) : "")
            .dateOfBirth(dateToCalendar(faker.date().birthday(isParent ? 35 : 6, isParent ? 60 : 17)))
            .placeOfBirth(faker.address().city())
            .nationality(faker.country().countryCode2())
            .idType(hasId ? id : null)
            .idNumber(hasId ? faker.idNumber().valid() : null)
            .idDateOfIssue(hasId ? dateToCalendar(faker.date().birthday(1, 5)) : null)
            .idPlaceOfIssue(hasId ? faker.address().city() : "")
            .phone((Math.random() > (isParent ? 0 : 0.8)) ? faker.phoneNumber().phoneNumber() : "")
            .phone2((isParent && Math.random() > 0.8) ? faker.phoneNumber().phoneNumber() : "")
            .build();

        person.setCivility(person.getGender() == Person.Gender.MALE ? Person.Civility.MR : (isParent ? Person.Civility.MRS : Person.Civility.MISS));
        person.setUsername((person.getFirstName() + "_" + person.getLastName()).toLowerCase());
        person.setEmail((person.getFirstName() + "." + person.getLastName() + "@example.com").toLowerCase());
        return person;
    }
    private ParentRequest makeParent(String lastName, Address address, GPSCoordinates gpsCoordinates, Person.Gender gender) {
        ParentRequest parent = new ParentRequest(make(lastName, true, gender));
        parent.setProfession(faker.job().title());
        parent.setOrganisation(faker.company().name());
        parent.setMaritalStatus(Parent.MaritalStatus.MARRIED);
        parent.setAddress(address);
        parent.setGpsCoordinates(gpsCoordinates);
        return parent;
    }
    private StudentRequest makeStudent(String lastName, Long father, Long mother) {
        StudentRequest student = new StudentRequest(make(lastName, false, Math.random() > 0.5 ? Person.Gender.MALE : Person.Gender.FEMALE));
        student.setUseParentAddress(true);
        student.setFatherId(father);
        student.setMotherId(mother);
        return student;
    }
    private Address makeAddress() {
        return Address.builder()
            .street(faker.address().streetAddress())
            .city(faker.address().city())
            .state(faker.address().state())
            .country(faker.address().country())
            .code(faker.address().zipCode())
            .build();
    }
    private GPSCoordinates makeGPSCoordinates() {
        return GPSCoordinates.builder()
            .latitude(new BigDecimal(faker.address().latitude().replace(',', '.')))
            .longitude(new BigDecimal(faker.address().longitude().replace(',', '.')))
            .build();
    }
    private LocalDate dateToCalendar(Date date) {
        return date.toInstant()
            .atZone(ZoneId.systemDefault())
            .toLocalDate();
    }
}
