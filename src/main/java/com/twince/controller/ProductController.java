package com.twince.controller;

import com.twince.domain.Product;
import com.twince.repository.InventoryRepository;
import com.twince.repository.ProductRepository;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("comTwinceProductController")
@RequestMapping({"/api/products", "/api/v1/products"})
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllProducts() {
        List<Map<String, Object>> result = productRepository.findAll().stream().map(p -> {
            Integer stock = inventoryRepository.findByProductId(p.getId())
                    .map(inv -> inv.getStock())
                    .orElse(p.getStockQuantity() != null ? p.getStockQuantity() : 10);

            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", String.valueOf(p.getId()));
            map.put("sku", p.getSku() != null ? p.getSku() : "TW-" + p.getId());
            map.put("name", p.getName());
            map.put("slug", p.getSlug() != null ? p.getSlug() : p.getName().toLowerCase().replace(" ", "-"));
            map.put("concentration", p.getConcentration() != null ? p.getConcentration() : "Extrait de Parfum");
            map.put("price", p.getPrice());
            map.put("stockQuantity", stock);
            map.put("stock", stock);
            map.put("topNotes", p.getTopNotes() != null ? p.getTopNotes() : "");
            map.put("heartNotes", p.getHeartNotes() != null ? p.getHeartNotes() : "");
            map.put("baseNotes", p.getBaseNotes() != null ? p.getBaseNotes() : "");
            map.put("category", p.getCategory() != null ? p.getCategory() : "Woody");
            map.put("scentType", p.getCategory() != null ? p.getCategory() : "Woody");
            map.put("imageUrl", p.getImageUrl() != null ? p.getImageUrl() : "");
            map.put("image", p.getImageUrl() != null ? p.getImageUrl() : "");
            map.put("desc", p.getDescription() != null ? p.getDescription() : p.getName() + " Extrait de Parfum.");
            map.put("isActive", p.getIsActive() != null ? p.getIsActive() : true);
            return map;
        }).toList();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

