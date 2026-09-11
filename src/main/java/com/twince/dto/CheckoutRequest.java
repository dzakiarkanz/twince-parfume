package com.twince.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record CheckoutRequest(
    @NotEmpty(message = "Items list cannot be empty")
    @Valid
    List<OrderItemRequest> items,

    String shippingAddress,
    String notes
) {}

