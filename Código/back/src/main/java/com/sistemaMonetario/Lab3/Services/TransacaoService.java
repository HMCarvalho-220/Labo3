package com.sistemaMonetario.Lab3.Services;

import com.sistemaMonetario.Lab3.DTO.TransacaoDTO;
import com.sistemaMonetario.Lab3.Model.Aluno;
import com.sistemaMonetario.Lab3.Model.Transacao;
import com.sistemaMonetario.Lab3.Model.Transacao.TipoTransacao;
import com.sistemaMonetario.Lab3.Repository.AlunoRepository;
import com.sistemaMonetario.Lab3.Repository.TransacaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransacaoService {

    private final TransacaoRepository transacaoRepository;
    private final AlunoRepository alunoRepository;

    @Transactional
    public TransacaoDTO creditarMoedas(Long alunoId, double valor, String descricao) {
        if (valor <= 0) {
            throw new IllegalArgumentException("Valor deve ser maior que zero");
        }
        
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));
        
        aluno.creditarMoedas(valor);
        alunoRepository.save(aluno);
        
        Transacao transacao = new Transacao();
        transacao.setAluno(aluno);
        transacao.setValor(valor);
        transacao.setTipo(TipoTransacao.CREDITO);
        transacao.setDescricao(descricao);
        
        Transacao saved = transacaoRepository.save(transacao);
        return toDTO(saved);
    }

    @Transactional
    public TransacaoDTO debitarMoedas(Long alunoId, double valor, String descricao) {
        if (valor <= 0) {
            throw new IllegalArgumentException("Valor deve ser maior que zero");
        }
        
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));
        
        if (aluno.getSaldoMoedas() < valor) {
            throw new IllegalArgumentException("Saldo insuficiente");
        }
        
        aluno.debitarMoedas(valor);
        alunoRepository.save(aluno);
        
        Transacao transacao = new Transacao();
        transacao.setAluno(aluno);
        transacao.setValor(valor);
        transacao.setTipo(TipoTransacao.DEBITO);
        transacao.setDescricao(descricao);
        
        Transacao saved = transacaoRepository.save(transacao);
        return toDTO(saved);
    }

    public List<TransacaoDTO> listarTransacoesPorAluno(Long alunoId) {
        Aluno aluno = alunoRepository.findById(alunoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));
        
        return transacaoRepository.findByAlunoOrderByDataTransacaoDesc(aluno).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private TransacaoDTO toDTO(Transacao transacao) {
        TransacaoDTO dto = new TransacaoDTO();
        dto.setId(transacao.getId());
        dto.setAlunoId(transacao.getAluno().getId());
        dto.setAlunoNome(transacao.getAluno().getNome());
        dto.setValor(transacao.getValor());
        dto.setTipo(transacao.getTipo());
        dto.setDescricao(transacao.getDescricao());
        dto.setDataTransacao(transacao.getDataTransacao());
        return dto;
    }
}
