package com.twince.dto;

import com.twince.domain.Order;
import com.twince.domain.OrderItem;
import com.twince.domain.OrderStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
    Long id,
    OrderStatus status,
    BigDecimal totalAmount,
    Instant createdAt,
    String shippingAddress,
    String notes,
    List<OrderItemResponse> items
) {
    public record OrderItemResponse(
        Long id,
        Long productId,
        String productName,
        Integer quantity,
        BigDecimal priceAtOrder,
        BigDecimal subtotal
    ) {
        public static OrderItemResponse fromEntity(OrderItem item) {
            BigDecimal subtotal = item.getPriceAtOrder() != null && item.getQuantity() != null
                ? item.getPriceAtOrder().multiply(BigDecimal.valueOf(item.getQuantity()))
                : BigDecimal.ZERO;

            return new OrderItemResponse(
                item.getId(),
                item.getProduct() != null ? item.getProduct().getId() : null,
                item.getProduct() != null ? item.getProduct().getName() : null,
                item.getQuantity(),
                item.getPriceAtOrder(),
                subtotal
            );
        }
    }

    public static OrderResponse fromEntity(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems() != null
            ? order.getItems().stream().map(OrderItemResponse::fromEntity).toList()
            : List.of();

        return new OrderResponse(
            order.getId(),
            order.getStatus(),
            order.getTotalAmount(),
            order.getCreatedAt(),
            order.getShippingAddress(),
            order.getNotes(),
            itemResponses
        );
    }
}

