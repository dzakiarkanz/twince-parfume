package com.twince.service;

import com.twince.domain.Inventory;
import com.twince.domain.Order;
import com.twince.domain.OrderItem;
import com.twince.domain.OrderStatus;
import com.twince.domain.Product;
import com.twince.domain.User;
import com.twince.dto.CheckoutRequest;
import com.twince.dto.OrderItemRequest;
import com.twince.dto.OrderResponse;
import com.twince.exception.InsufficientStockException;
import com.twince.repository.InventoryRepository;
import com.twince.repository.OrderRepository;
import com.twince.repository.ProductRepository;
import com.twince.repository.UserRepository;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service("orderServiceV2")
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;

    @Transactional
    public OrderResponse processCheckout(String userEmail, CheckoutRequest request) {
        if (request == null || request.items() == null || request.items().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Checkout items cannot be empty");
        }

        // 1. Ambil entity User berdasarkan userEmail
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found with email: " + userEmail));

        // 2. Inisialisasi Order baru
        Order order = Order.builder()
                .user(user)
                .status(OrderStatus.PENDING)
                .shippingAddress(request.shippingAddress())
                .notes(request.notes())
                .items(new ArrayList<>())
                .totalAmount(BigDecimal.ZERO)
                .createdAt(Instant.now())
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        // 3. Loop setiap item pada request dan validasi stok secara atomik
        for (OrderItemRequest item : request.items()) {
            Long productId = item.productId();
            int requestedQty = item.quantity();

            // Panggil method inventoryRepository.findByProductIdWithPessimisticLock
            Inventory inventory = inventoryRepository.findByProductIdWithPessimisticLock(productId)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, "Inventory not found for product ID: " + productId));

            // Validasi ketersediaan stok
            if (inventory.getStock() == null || inventory.getStock() < requestedQty) {
                int availableStock = inventory.getStock() == null ? 0 : inventory.getStock();
                String productName = inventory.getProduct() != null ? inventory.getProduct().getName() : "ID " + productId;
                throw new InsufficientStockException(
                        "Insufficient stock for product '" + productName + "'. Requested: " + requestedQty + ", Available: " + availableStock);
            }

            // Kurangi jumlah stok di entitas Inventory dan save
            inventory.setStock(inventory.getStock() - requestedQty);
            inventoryRepository.save(inventory);

            // Ambil snapshot harga saat ini (priceAtOrder)
            Product product = inventory.getProduct();
            if (product == null) {
                product = productRepository.findById(productId)
                        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found: " + productId));
            }

            BigDecimal priceAtOrder = product.getPrice();
            BigDecimal itemTotal = priceAtOrder.multiply(BigDecimal.valueOf(requestedQty));
            totalAmount = totalAmount.add(itemTotal);

            // Buat OrderItem dengan snapshot harga
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(requestedQty)
                    .priceAtOrder(priceAtOrder)
                    .build();

            order.addItem(orderItem);
        }

        // 4. Set total amount dan status
        order.setTotalAmount(totalAmount);
        order.setStatus(OrderStatus.PENDING);

        // 5. Simpan Order ke OrderRepository dan kembalikan OrderResponse
        Order savedOrder = orderRepository.save(order);
        return OrderResponse.fromEntity(savedOrder);
    }
}

