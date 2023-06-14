package com.ngx.news.services;

import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    @Qualifier("nonLoadBalancedRestTemplate")
    private RestTemplate restTemplate;
    @Value("${one-signal.app-id}")
    private String appId;
    @Value("${one-signal.rest-key}")
    private String token;

    public void push(String message, String title, List<String> targets) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Basic " + token);

        JSONObject requestBody = new JSONObject();
        requestBody.put("app_id", appId);
        if (targets != null)
            requestBody.put("include_player_ids", targets);
        else
            requestBody.put("included_segments", List.of("All"));
        JSONObject headings = new JSONObject();
        headings.put("en", title);
        requestBody.put("headings", headings);
        JSONObject contents = new JSONObject();
        contents.put("en", message);
        requestBody.put("contents", contents);

        String data = requestBody.toString();
        System.out.println(data);
        HttpEntity<String> request = new HttpEntity<>(data, headers);
        restTemplate.exchange("https://onesignal.com/api/v1/notifications", HttpMethod.POST, request, String.class);
    }

}
