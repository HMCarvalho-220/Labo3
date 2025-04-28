package com.sistemaMonetario.Lab3.Repository;

import com.sistemaMonetario.Lab3.Model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    boolean existsByCpf(String cpf);
    boolean existsByEmail(String email);
    Optional<Aluno> findByEmail(String email);
}
