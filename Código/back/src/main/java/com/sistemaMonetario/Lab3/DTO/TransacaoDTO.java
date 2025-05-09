package com.sistemaMonetario.Lab3.DTO;

import com.sistemaMonetario.Lab3.Model.Transacao.TipoTransacao;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TransacaoDTO {
    private Long id;
    private Long alunoId;
    private String alunoNome;
    private double valor;
    private TipoTransacao tipo;
    private String descricao;
    private LocalDateTime dataTransacao;
}
