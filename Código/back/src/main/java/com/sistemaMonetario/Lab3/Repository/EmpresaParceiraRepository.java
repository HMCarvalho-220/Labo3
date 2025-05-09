package com.sistemaMonetario.Lab3.Repository;

import com.sistemaMonetario.Lab3.Model.EmpresaParceira;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmpresaParceiraRepository extends JpaRepository<EmpresaParceira, Long> {
    Optional<EmpresaParceira> findByCnpj(String cnpj);
    boolean existsByCnpj(String cnpj);
    Optional<EmpresaParceira> findByEmail(String email);
}