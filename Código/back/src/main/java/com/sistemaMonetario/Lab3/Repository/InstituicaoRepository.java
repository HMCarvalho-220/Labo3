package com.sistemaMonetario.Lab3.Repository;

import com.sistemaMonetario.Lab3.Model.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {
    boolean existsByNome(String nome);
    List<Instituicao> findByNomeContainingIgnoreCase(String nome);
}
