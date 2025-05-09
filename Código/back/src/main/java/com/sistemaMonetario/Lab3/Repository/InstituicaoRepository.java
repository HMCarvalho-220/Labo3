package com.sistemaMonetario.Lab3.Repository;

import com.sistemaMonetario.Lab3.Model.Instituicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {

    Optional<Instituicao> findByNome(String nome);
    
    List<Instituicao> findByNomeContainingIgnoreCase(String nome);

    List<Instituicao> findByEnderecoContaining(String endereco);
    
    @Query("SELECT i FROM Instituicao i WHERE i.nome LIKE %:termo% OR i.endereco LIKE %:termo%")
    List<Instituicao> buscarPorNomeOuEndereco(String termo);
    
    boolean existsByNome(String nome);
}