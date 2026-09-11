package com.twince.service;

import com.twince.domain.Product;
import com.twince.dto.AiConsultRequest;
import com.twince.dto.AiConsultResponse;
import com.twince.repository.ProductRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiSommelierService {

    private final ProductRepository productRepository;

    public AiConsultResponse getRecommendation(AiConsultRequest request) {
        String prompt = request != null && request.prompt() != null ? request.prompt().trim().toLowerCase() : "";

        List<Product> products = productRepository.findAll();
        Product selectedProduct = null;

        if (!products.isEmpty()) {
            if (!prompt.isBlank()) {
                int maxScore = 0;
                for (Product product : products) {
                    int score = 0;
                    String haystack = (
                            (product.getName() != null ? product.getName() : "") + " " +
                            (product.getDescription() != null ? product.getDescription() : "") + " " +
                            (product.getTopNotes() != null ? product.getTopNotes() : "") + " " +
                            (product.getHeartNotes() != null ? product.getHeartNotes() : "") + " " +
                            (product.getBaseNotes() != null ? product.getBaseNotes() : "") + " " +
                            (product.getCategory() != null ? product.getCategory() : "")
                    ).toLowerCase();

                    for (String word : prompt.split("\\s+")) {
                        if (word.length() > 2 && haystack.contains(word)) {
                            score += 2;
                        }
                    }

                    // Keyword intents (segar/siang, kayu/formal, romantis/malam, hujan/earthy)
                    if ((prompt.contains("segar") || prompt.contains("fresh") || prompt.contains("siang") || prompt.contains("pantai"))
                            && (haystack.contains("bergamot") || haystack.contains("sea salt") || haystack.contains("aéther") || haystack.contains("aether"))) {
                        score += 5;
                    }
                    if ((prompt.contains("kayu") || prompt.contains("woody") || prompt.contains("malam") || prompt.contains("hangat") || prompt.contains("formal"))
                            && (haystack.contains("sandalwood") || haystack.contains("leather") || haystack.contains("cardamom") || haystack.contains("ignis"))) {
                        score += 5;
                    }
                    if ((prompt.contains("romantis") || prompt.contains("kencan") || prompt.contains("misterius") || prompt.contains("manis") || prompt.contains("glamor"))
                            && (haystack.contains("rose") || haystack.contains("jasmine") || haystack.contains("oud") || haystack.contains("plum") || haystack.contains("nox"))) {
                        score += 5;
                    }
                    if ((prompt.contains("hujan") || prompt.contains("santai") || prompt.contains("alam") || prompt.contains("earthy") || prompt.contains("tenang"))
                            && (haystack.contains("moss") || haystack.contains("pine") || haystack.contains("petrichor") || haystack.contains("vetiver") || haystack.contains("terra"))) {
                        score += 5;
                    }

                    if (score > maxScore) {
                        maxScore = score;
                        selectedProduct = product;
                    }
                }
            }

            if (selectedProduct == null) {
                selectedProduct = products.get(0);
            }
        }

        String productName = selectedProduct != null ? selectedProduct.getName() : "AÉTHER";
        String notes = buildNotesSummary(selectedProduct);

        String recommendation = String.format(
                "Berdasarkan preferensi Anda, kami merekomendasikan varian %s dengan karakteristik aroma %s. " +
                "Setiap semprotan formulasi TWINCE menghadirkan transisi piramida aroma yang mewah, harmonis, serta silase tahan lama yang merefleksikan karakter unik Anda.",
                productName,
                notes
        );

        return new AiConsultResponse(recommendation, productName);
    }

    private String buildNotesSummary(Product product) {
        if (product == null) {
            return "Top: Calabrian Bergamot, Heart: French Lavender, Base: Ambroxan & Driftwood";
        }
        StringBuilder sb = new StringBuilder();
        if (product.getTopNotes() != null && !product.getTopNotes().isBlank()) {
            sb.append("Top: ").append(product.getTopNotes());
        }
        if (product.getHeartNotes() != null && !product.getHeartNotes().isBlank()) {
            if (!sb.isEmpty()) sb.append(", ");
            sb.append("Heart: ").append(product.getHeartNotes());
        }
        if (product.getBaseNotes() != null && !product.getBaseNotes().isBlank()) {
            if (!sb.isEmpty()) sb.append(", ");
            sb.append("Base: ").append(product.getBaseNotes());
        }
        if (sb.isEmpty()) {
            return product.getDescription() != null ? product.getDescription() : "ekstrak bahan botani murni pilihan TWINCE";
        }
        return sb.toString();
    }
}

