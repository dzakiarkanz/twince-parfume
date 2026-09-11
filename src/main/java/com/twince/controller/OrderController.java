package com.twince.controller;

import com.twince.domain.User;
import com.twince.dto.CheckoutRequest;
import com.twince.dto.OrderResponse;
import com.twince.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController("orderControllerV2")
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout(
            @Valid @RequestBody CheckoutRequest request,
            Authentication authentication
    ) {
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User must be authenticated to checkout");
        }

        String userEmail;
        Object principal = authentication.getPrincipal();

        if (principal instanceof User user) {
            userEmail = user.getEmail();
        } else if (principal instanceof UserDetails userDetails) {
            userEmail = userDetails.getUsername();
        } else if (principal instanceof String emailStr) {
            userEmail = emailStr;
        } else {
            userEmail = authentication.getName();
        }

        if (userEmail == null || userEmail.isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid user authentication identity");
        }

        OrderResponse response = orderService.processCheckout(userEmail, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}

