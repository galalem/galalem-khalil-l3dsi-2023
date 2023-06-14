package com.ngx.admin.services;

import com.netflix.discovery.EurekaClient;
import com.ngx.admin.entities.Address;
import com.ngx.admin.entities.Establishment;
import com.ngx.admin.entities.GPSCoordinates;
import com.ngx.admin.repositories.AddressRepository;
import com.ngx.admin.repositories.EstablishmentRepository;
import com.ngx.admin.repositories.GPSCoordinatesRepository;
import com.ngx.admin.requests.EstablishmentRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EstablishmentService {

    private final RestTemplate restTemplate;
    private final EurekaClient eurekaClient;
    private final EstablishmentRepository establishmentRepository;
    private final AddressRepository addressRepository;
    private final GPSCoordinatesRepository gpsCoordinatesRepository;

    private String token;


    public List<com.ngx.admin.responses.browse.EstablishmentResponse> index(String token) {
        this.token = token;
        List<Establishment> establishments = establishmentRepository.findAll();
        return establishments.stream().map(this::toBrowseResponse).toList();
    }



    public void create(EstablishmentRequest establishmentRequest, String token) {
        this.token = token;
        Establishment establishment = fromRequest(establishmentRequest);

        establishmentRepository.save(establishment);
        log.info("Establishment {} was created successfully", establishment.getId());
    }


    public com.ngx.admin.responses.show.EstablishmentResponse show(Long id, String token) {
        this.token = token;
        Optional<Establishment> result = establishmentRepository.findById(id);
        return result.map(this::toShowResponse).orElse(null);
    }

    public boolean update(EstablishmentRequest establishmentRequest, Long id, String token) {
        this.token = token;

        Optional<Establishment> result = establishmentRepository.findById(id);
        if (result.isEmpty())
            return false;

        Establishment establishment = fromRequest(establishmentRequest);
        establishment.setId(id);

        if (!Address.isBlank(establishment.getAddress()))
            addressRepository.save(establishment.getAddress());
        if (!GPSCoordinates.isBlank(establishment.getGpsCoordinates()))
            gpsCoordinatesRepository.save(establishment.getGpsCoordinates());

        establishment.setLogo(establishmentRequest.getLogo() == null ?
            null : uploadFileFromRequest(establishmentRequest));

        establishmentRepository.save(establishment);
        log.info("Establishment {} was updated successfully", id);
        return true;
    }


    public void delete(Long id, String token) {
        this.token = token;
        establishmentRepository.deleteById(id);
        log.info("Establishment {} was deleted successfully", id);
    }



    protected Establishment fromRequest(EstablishmentRequest establishmentRequest) {
        return Establishment.builder()
            .name(establishmentRequest.getName())
            .acronym(establishmentRequest.getAcronym())
            .about(establishmentRequest.getAbout())
            .email(establishmentRequest.getEmail())
            .phone(establishmentRequest.getPhone())
            .phone2(establishmentRequest.getPhone2())
            .address(Address.isBlank(establishmentRequest.getAddress()) ? null : establishmentRequest.getAddress())
            .gpsCoordinates(GPSCoordinates.isBlank(establishmentRequest.getGpsCoordinates()) ? null : establishmentRequest.getGpsCoordinates())
            .build();
    }


    protected com.ngx.admin.responses.browse.EstablishmentResponse toBrowseResponse(Establishment establishment) {
        return com.ngx.admin.responses.browse.EstablishmentResponse.builder()
            .id(establishment.getId())
            .name(establishment.getName())
            .acronym(establishment.getAcronym())
            .createdAt(establishment.getCreatedAt())
            .updatedAt(establishment.getUpdatedAt())
            .build();
    }


    protected com.ngx.admin.responses.show.EstablishmentResponse toShowResponse(Establishment establishment) {
        return com.ngx.admin.responses.show.EstablishmentResponse.builder()
            .id(establishment.getId())
            .logo(downloadFileToResponse(establishment))
            .name(establishment.getName())
            .acronym(establishment.getAcronym())
            .about(establishment.getAbout())
            .email(establishment.getEmail())
            .phone(establishment.getPhone())
            .phone2(establishment.getPhone2())
            .address(establishment.getAddress() == null ? new Address() : establishment.getAddress())
            .gpsCoordinates(establishment.getGpsCoordinates() == null ? new GPSCoordinates() : establishment.getGpsCoordinates())
            .createdAt(establishment.getCreatedAt())
            .updatedAt(establishment.getUpdatedAt())
            .build();
    }

    private String uploadFileFromRequest(EstablishmentRequest establishmentRequest) {
        MultipartFile logo = establishmentRequest.getLogo();
        LinkedMultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        File file = new File(System.getProperty("user.home") + "/ngxRedirectTargetFile.tmp");
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
            name = "logo";
        else if (name.contains("."))
            name = "logo" + name.substring(name.lastIndexOf("."));
        else
            name = "logo";
        restTemplate.put("http://storage/upload/establishment/"+name, requestEntity);
        file.delete();
        return name;
    }

    private String downloadFileToResponse(Establishment establishment) {

        if (establishment.getLogo() == null)
            return null;

        return eurekaClient.getNextServerFromEureka("storage", true).getHomePageUrl() + "storage/establishment/"+establishment.getLogo();
    }
}
