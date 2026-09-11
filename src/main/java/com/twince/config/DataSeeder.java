package com.twince.config;

import com.twince.domain.Inventory;
import com.twince.domain.Product;
import com.twince.repository.InventoryRepository;
import com.twince.repository.ProductRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;

    @Autowired(required = false)
    private com.twince.backend.repository.ProductRepository backendProductRepository;

    private record SeedItem(
            String name,
            String slug,
            String sku,
            String category,
            BigDecimal price,
            int stock,
            String topNotes,
            String heartNotes,
            String baseNotes,
            String description,
            String imageUrl
    ) {}

    @Override
    @Transactional
    public void run(String... args) {
        if (productRepository.count() == 0) {
            log.info(">> [DATA SEEDER] Memulai inisialisasi 8 varian parfum mewah TWINCE...");

            List<SeedItem> seedItems = List.of(
                    new SeedItem(
                            "Velvet Santal Extrait",
                            "velvet-santal",
                            "TW-VS-50ML",
                            "Woody",
                            BigDecimal.valueOf(1450000),
                            50,
                            "Cardamom, Calabrian Bergamot",
                            "Florentine Iris, French Violet",
                            "Australian Sandalwood, Cedarwood, Warm Amber",
                            "Aroma kehangatan kayu cendana Australia berpadu rempah kapulaga aromatik dan sentuhan mewah bedak iris.",
                            "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=85&w=800&h=1000"
                    ),
                    new SeedItem(
                            "Oud Nocturne",
                            "oud-nocturne",
                            "TW-ON-50ML",
                            "Woody",
                            BigDecimal.valueOf(1850000),
                            35,
                            "Incense, Pink Pepper",
                            "Smoky Agarwood, Tuscan Leather",
                            "Natural Ambergris, Dark Labdanum",
                            "Intensitas misterius gaharu berasap yang dibalut kulit Italia dan keanggunan abadi ambergris.",
                            "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=85&w=800&h=1000"
                    ),
                    new SeedItem(
                            "Rose Imperiale",
                            "rose-imperiale",
                            "TW-RI-50ML",
                            "Floral",
                            BigDecimal.valueOf(1250000),
                            60,
                            "Pink Pepper, Wild Lychee",
                            "Damask Rose, Taif Rose Petals",
                            "Cashmeran, Warm Amber, White Musk",
                            "Mahakarya floral yang megah dari mawar Damask segar dengan sengatan pedas merica merah muda dan kelembutan cashmeran.",
                            "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=85&w=800&h=1000"
                    ),
                    new SeedItem(
                            "Citrus Bergamota",
                            "citrus-bergamota",
                            "TW-CB-50ML",
                            "Fresh",
                            BigDecimal.valueOf(980000),
                            80,
                            "Calabrian Bergamot, Petitgrain, Lemon Zest",
                            "Tunisian Neroli, Orange Blossom",
                            "Haitian Vetiver, White Cedar",
                            "Sensasi ledakan kesegaran citrus Mediterania yang membangkitkan energi murni, dihiasi kelopak neroli dan vetiver basah.",
                            "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=85&w=800&h=1000"
                    ),
                    new SeedItem(
                            "Vanilla Bourbon Absolu",
                            "vanilla-bourbon",
                            "TW-VB-50ML",
                            "Gourmand",
                            BigDecimal.valueOf(1350000),
                            45,
                            "Aged Caribbean Rum, Brown Sugar",
                            "Madagascar Vanilla Bourbon, Benzoin",
                            "Roasted Tonka Bean, Caramelized Amber",
                            "Kelembutan gourmand adiktif dari ekstrak vanila hitam Madagaskar, diperkaya aged rum dan kacang tonka panggang.",
                            "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=85&w=800&h=1000"
                    ),
                    new SeedItem(
                            "Marine Sauvage",
                            "marine-sauvage",
                            "TW-MS-50ML",
                            "Fresh",
                            BigDecimal.valueOf(1150000),
                            70,
                            "Sea Salt Accord, Ocean Ozone",
                            "Mineral Sage, Crisp Juniper",
                            "Weathered Driftwood, Sun-bleached Cedar",
                            "Embusan angin laut liar beraroma garam samudra dan sage mineral yang menyelimuti kayu apung pesisir pantai karang.",
                            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=85&w=800&h=1000"
                    ),
                    new SeedItem(
                            "Matcha Euphoria",
                            "matcha-euphoria",
                            "TW-ME-50ML",
                            "Fresh",
                            BigDecimal.valueOf(1100000),
                            55,
                            "Ceremonial Uji Matcha, Bergamot Zest",
                            "Green Fig Leaf, White Tea",
                            "Clean White Musk, Cedar Leaves",
                            "Ketenangan meditatif dari serbuk matcha seremonial Jepang, daun ara hijau yang segar, dan selimut white musk yang bersih.",
                            "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=85&w=800&h=1000"
                    ),
                    new SeedItem(
                            "Tobacco Cuir",
                            "tobacco-cuir",
                            "TW-TC-50ML",
                            "Woody",
                            BigDecimal.valueOf(1600000),
                            40,
                            "Virginia Tobacco Leaf, Spiced Wild Honey",
                            "Bitter Cacao, Tonka Accord",
                            "Aged Leather, Smoky Woods",
                            "Pesona wibawa karismatik dari tembakau Virginia kering yang dicelupkan madu hangat, cokelat hitam pahit, dan kulit antik.",
                            "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=85&w=800&h=1000"
                    )
            );

            for (SeedItem item : seedItems) {
                // 1. Simpan Product
                Product product = Product.builder()
                        .name(item.name())
                        .slug(item.slug())
                        .sku(item.sku())
                        .category(item.category())
                        .price(item.price())
                        .stockQuantity(item.stock())
                        .topNotes(item.topNotes())
                        .heartNotes(item.heartNotes())
                        .baseNotes(item.baseNotes())
                        .description(item.description())
                        .imageUrl(item.imageUrl())
                        .concentration("Extrait de Parfum")
                        .isActive(true)
                        .build();

                Product savedProduct = productRepository.save(product);

                // 2. Simpan Inventory stok
                Inventory inventory = Inventory.builder()
                        .product(savedProduct)
                        .stock(item.stock())
                        .build();

                inventoryRepository.save(inventory);

                // 3. Simpan juga ke backendProductRepository jika tersedia
                if (backendProductRepository != null) {
                    try {
                        com.twince.backend.domain.entity.Product beProduct = com.twince.backend.domain.entity.Product.builder()
                                .name(item.name())
                                .slug(item.slug())
                                .sku(item.sku())
                                .concentration("Extrait de Parfum")
                                .price(item.price())
                                .stockQuantity(item.stock())
                                .topNotes(item.topNotes())
                                .heartNotes(item.heartNotes())
                                .baseNotes(item.baseNotes())
                                .imageUrl(item.imageUrl())
                                .isActive(true)
                                .createdAt(LocalDateTime.now())
                                .build();

                        backendProductRepository.save(beProduct);
                    } catch (Exception ex) {
                        log.debug("BackendProductRepository seeding skipped: {}", ex.getMessage());
                    }
                }

                log.info(">> [DATA SEEDER] Terdaftar: {} (Stok: {})", item.name(), item.stock());
            }

            log.info(">> [DATA SEEDER] Selesai seeding 8 varian parfum TWINCE.");
        } else {
            log.info(">> [DATA SEEDER] Katalog parfum TWINCE sudah terisi (Total: {} produk).", productRepository.count());
        }
    }
}

