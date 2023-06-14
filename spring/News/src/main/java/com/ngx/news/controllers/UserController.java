package com.ngx.news.controllers;

import com.ngx.news.entities.UserDevice;
import com.ngx.news.repositories.UserDeviceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private UserDeviceRepository repository;

    @PostMapping(value = "/{uid}/device", params = {"playerId"})
    @ResponseStatus(HttpStatus.OK)
    public void addDevice(@PathVariable String uid, @RequestParam("playerId") String device) {
        repository.save(UserDevice.builder().device(device).uid(uid).build());
    }

    @DeleteMapping(value = "/{uid}/device", params = {"playerId"})
    @ResponseStatus(HttpStatus.OK)
    public void removeDevice(@PathVariable String uid, @RequestParam("playerId") String device) {
        repository.deleteById(device);
    }
}
