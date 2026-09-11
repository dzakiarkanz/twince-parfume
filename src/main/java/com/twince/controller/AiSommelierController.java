package com.twince.controller;

import com.twince.dto.AiConsultRequest;
import com.twince.dto.AiConsultResponse;
import com.twince.service.AiSommelierService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiSommelierController {

    private final AiSommelierService aiSommelierService;

    @PostMapping("/sommelier")
    public ResponseEntity<AiConsultResponse> getRecommendation(@Valid @RequestBody(required = false) AiConsultRequest request) {
        if (request == null) {
            request = new AiConsultRequest("");
        }
        AiConsultResponse response = aiSommelierService.getRecommendation(request);
        return ResponseEntity.ok(response);
    }
}

