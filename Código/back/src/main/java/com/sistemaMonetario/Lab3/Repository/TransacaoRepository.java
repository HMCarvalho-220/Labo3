package com.sistemaMonetario.Lab3.Repository;

import com.sistemaMonetario.Lab3.Model.Aluno;
import com.sistemaMonetario.Lab3.Model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Long> {
    List<Transacao> findByAlunoOrderByDataTransacaoDesc(Aluno aluno);
}
