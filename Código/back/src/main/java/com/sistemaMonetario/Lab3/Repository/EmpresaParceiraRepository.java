package com.sistemaMonetario.Lab3.Repository;

import com.sistemaMonetario.Lab3.Model.EmpresaParceira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpresaParceiraRepository extends JpaRepository<EmpresaParceira, Long> {
    boolean existsByCnpj(String cnpj);
    boolean existsByEmail(String email);
    Optional<EmpresaParceira> findByEmail(String email);
}
