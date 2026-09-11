package com.twince.repository;

import com.twince.domain.Inventory;
import jakarta.persistence.LockModeType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("twinceInventoryRepository")
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT i FROM TwinceInventory i WHERE i.product.id = :productId")
    Optional<Inventory> findByProductIdWithPessimisticLock(@Param("productId") Long productId);

    Optional<Inventory> findByProductId(Long productId);
}

