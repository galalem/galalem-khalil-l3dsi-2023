package com.ngx.rh.services;

import com.ngx.rh.entities.Address;
import com.ngx.rh.entities.GPSCoordinates;
import com.ngx.rh.entities.Person;
import com.ngx.rh.exceptions.BadRequestException;
import com.ngx.rh.exceptions.RestErrorException;
import com.ngx.rh.exceptions.UniqueFieldTakenException;
import com.ngx.rh.repositories.AddressRepository;
import com.ngx.rh.repositories.GPSCoordinatesRepository;
import com.ngx.rh.repositories.PersonRepository;
import com.ngx.rh.requests.PersonRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public abstract class PersonService<T extends Person, REP extends PersonRepository<T>, R extends PersonRequest,
    BR extends com.ngx.rh.responses.browse.PersonResponse, SR extends com.ngx.rh.responses.show.PersonResponse> {


    @Autowired
    private UserService userService;
    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    protected REP personRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private GPSCoordinatesRepository gpsCoordinatesRepository;
    private String token;

    public List<BR> index() {
        return personRepository.findAllOfType()
            .stream().map(this::toBrowseResponse).toList();
    }

    public List<BR> index(List<Long> ids) {
        return personRepository.findAllOfTypeIn(ids)
            .stream().map(this::toBrowseResponse).toList();
    }

    public List<SR> showAll(List<Long> ids) {
        return personRepository.findAllOfTypeIn(ids)
            .stream().map(this::toShowResponse).toList();
    }

    public long count() {
        return personRepository.countByDeletedFalse();
    }

    public List<com.ngx.rh.responses.stats.PersonResponse> stats() {
        return personRepository.stats();
    }

    public List<com.ngx.rh.responses.stats.PersonResponse> stats(List<Long> ids) {
        return personRepository.stats();
    }

    public Long create(R request, String token) throws BadRequestException, RestErrorException {
        this.token = token;
        T person = this.fromRequest(request);
        person.setActive(true);

        if (personRepository.existsByCode(person.getCode()))
            throw new UniqueFieldTakenException("code", "Code");

        personRepository.save(person);
        addressRepository.save(person.getAddress());
        gpsCoordinatesRepository.save(person.getGpsCoordinates());
        person.setPhoto(request.getPhoto() == null ? null : "storage/person/" + person.getId() + "/photo/" + uploadPhotoFromRequest(request, person.getId()));
        this.createRelations(person);
        person.setUid(userService.createFromPerson(person));
        userService.assignRole(person.getUid(), this.getRole(person));
        personRepository.save(person);
        return person.getId();
    }

    public void createAll(List<R> requests, String token) throws BadRequestException, RestErrorException {
        for (int i=0; i<requests.size(); i++) {
            try {
                this.create(requests.get(i), token);
            } catch (BadRequestException ex) {
                throw new BadRequestException("{\""+i+"\":"+ex.getMessage()+"}");
            }
        }
    }

    public SR show(Long id) {
        Optional<T> result = personRepository.findById(id);
        return result.map(this::toShowResponse).orElse(null);
    }

    public void update(R request, Long id, String token) {
        this.token = token;
        Optional<T> result = personRepository.findById(id);
        if (result.isEmpty())
            return;

        T original = result.get();
        T person = this.fromRequest(request);
        person.setId(id);
        person.setUid(original.getUid());
        person.setCode(original.getCode());
        person.setActive(original.isActive());
        person.setArchived(original.isArchived());
        person.setDeleted(original.isDeleted());
        person.setCreatedAt(original.getCreatedAt());

        person.getAddress().setId(original.getAddress().getId());
        addressRepository.save(person.getAddress());
        person.getGpsCoordinates().setId(original.getGpsCoordinates().getId());
        gpsCoordinatesRepository.save(person.getGpsCoordinates());
        person.setPhoto(request.getPhoto() == null ? null : "storage/person/"+person.getId()+"/photo/" + uploadPhotoFromRequest(request, person.getId()));
        userService.updateFromPerson(person);
        this.updateRelations(person, original);
        personRepository.save(person);
    }

    public void setActive(Long id, boolean active) {
        this.setAllActive(List.of(id), active);
    }
    public void setAllActive(List<Long> ids, boolean active) {
        personRepository.markAllPeopleAsActive(ids, active);
        List<T> people = personRepository.findAllById(ids);
        for (T person : people)
            userService.setEnabled(person.getUid(),
                person.isActive() && !person.isArchived() && !person.isDeleted());
    }

    public void setArchived(Long id, boolean archived) {
        this.setAllArchived(List.of(id), archived);
    }
    public void setAllArchived(List<Long> ids, boolean archived) {
        personRepository.markAllPeopleAsArchived(ids, archived);
        List<T> people = personRepository.findAllById(ids);
        for (T person : people)
            userService.setEnabled(person.getUid(),
                person.isActive() && !person.isArchived() && !person.isDeleted());
    }

    public void delete(Long id) {
        this.deleteAll(List.of(id));
    }
    public void deleteAll(List<Long> ids) {
        personRepository.markAllPeopleAsDeleted(ids, true);
        List<T> people = personRepository.findAllById(ids);
        for (T person : people)
            userService.setEnabled(person.getUid(),
                person.isActive() && !person.isArchived() && !person.isDeleted());
    }

    public void restore(Long id) {
        this.restoreAll(List.of(id));
    }
    public void restoreAll(List<Long> ids) {
        personRepository.markAllPeopleAsDeleted(ids, false);
        List<T> people = personRepository.findAllById(ids);
        for (T person : people)
            userService.setEnabled(person.getUid(),
                person.isActive() && !person.isArchived() && !person.isDeleted());
    }

    public void deletePermanently(Long id) {
        Optional<T> result = personRepository.findById(id);
        if (result.isEmpty())
            return;

        T person = result.get();
        if (person.getAddress() != null)
            addressRepository.deleteById(person.getAddress().getId());
        if (person.getGpsCoordinates() != null)
            gpsCoordinatesRepository.deleteById(person.getGpsCoordinates().getId());
        personRepository.deleteById(id);
        deleteHangingPersonAccount();
    }
    public void deletePermanentlyAll(List<Long> ids) {
        for (Long id : ids)
            this.deletePermanently(id);
    }

    public void deleteHangingPersonAccount(){
        userService.deleteWhereNotIn(personRepository.findAllUsers());
    }

    protected abstract String getRole(T person);
    protected abstract void createRelations(T person);
    protected abstract void updateRelations(T person, T original);
    protected abstract T fromRequest(R personRequest);
    protected abstract BR toBrowseResponse(T person);
    protected abstract SR toShowResponse(T person);

    protected String stringifyCivility(Person.Civility civility, boolean abbreviate) {
        switch (civility) {
            case MR -> {
                return abbreviate ? "M." : "Monsieur";
            }
            case MRS -> {
                return abbreviate ? "Mme." : "Madame";
            }
            case MISS -> {
                return abbreviate ? "Mlle." : "Mademoiselle";
            }
        }
        return "";
    }
    protected Person getParentFromRequest(PersonRequest personRequest) {
        return Person.builder()
            .code(personRequest.getCode())
            .username(personRequest.getUsername())
            .firstName(personRequest.getFirstName())
            .lastName(personRequest.getLastName())
            .gender(personRequest.getGender())
            .civility(personRequest.getCivility())
            .about(personRequest.getAbout())
            .dateOfBirth(personRequest.getDateOfBirth())
            .placeOfBirth(personRequest.getPlaceOfBirth())
            .nationality(personRequest.getNationality())
            .idType(personRequest.getIdType())
            .idNumber(personRequest.getIdNumber())
            .idDateOfIssue(personRequest.getIdDateOfIssue())
            .idPlaceOfIssue(personRequest.getIdPlaceOfIssue())
            .email(personRequest.getEmail())
            .phone(personRequest.getPhone())
            .phone2(personRequest.getPhone2())
            .address(personRequest.getAddress() == null ? new Address() : personRequest.getAddress())
            .gpsCoordinates(personRequest.getGpsCoordinates() == null ? new GPSCoordinates() : personRequest.getGpsCoordinates())
            .build();
    }

    protected com.ngx.rh.responses.browse.PersonResponse getParentBrowseResponse(Person person) {
        return com.ngx.rh.responses.browse.PersonResponse.builder()
            .id(person.getId())
            .code(person.getCode())
            .photo(person.getPhoto())
            .firstName(person.getFirstName())
            .lastName(person.getLastName())
            .gender(person.getGender())
            .civility(person.getCivility())
            .email(person.getEmail())
            .phone(person.getPhone())
            .active(person.isActive())
            .archived(person.isArchived())
            .createdAt(person.getCreatedAt())
            .updatedAt(person.getUpdatedAt())
            .build();
    }

    protected com.ngx.rh.responses.show.PersonResponse getParentShowResponse(T person) {
        return com.ngx.rh.responses.show.PersonResponse.builder()
            .id(person.getId())
            .code(person.getCode())
            .photo(person.getPhoto())
            .uid(person.getUid())
            .username(person.getUsername())
            .firstName(person.getFirstName())
            .lastName(person.getLastName())
            .gender(person.getGender())
            .civility(person.getCivility())
            .about(person.getAbout())
            .dateOfBirth(person.getDateOfBirth())
            .placeOfBirth(person.getPlaceOfBirth())
            .nationality(person.getNationality())
            .idType(person.getIdType())
            .idNumber(person.getIdNumber())
            .idDateOfIssue(person.getIdDateOfIssue())
            .idPlaceOfIssue(person.getIdPlaceOfIssue())
            .email(person.getEmail())
            .phone(person.getPhone())
            .phone2(person.getPhone2())
            .address(person.getAddress())
            .gpsCoordinates(person.getGpsCoordinates())
            .active(person.isActive())
            .archived(person.isArchived())
            .deleted(person.isDeleted())
            .createdAt(person.getCreatedAt())
            .updatedAt(person.getUpdatedAt())
            .build();
    }

    private String uploadPhotoFromRequest(PersonRequest personRequestRequest, Long id) {
        MultipartFile logo = personRequestRequest.getPhoto();
        LinkedMultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        File file = new File(System.getProperty("user.home") + "/ngxHumanResourcesRedirectTargetFile.tmp");
        try {
            logo.transferTo(file);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
        params.add("file", new FileSystemResource(file));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setBearerAuth(token.substring(7));

        HttpEntity<LinkedMultiValueMap<String, Object>> requestEntity =
            new HttpEntity<>(params, headers);

        String name = logo.getOriginalFilename();
        if (name == null)
            name = "photo";
        else if (name.contains("."))
            name = "photo" + name.substring(name.lastIndexOf("."));
        else
            name = "photo";
        restTemplate.put("http://storage/upload/person/"+id.toString()+"/photo/"+name, requestEntity);
        file.delete();
        return name;
    }
}
