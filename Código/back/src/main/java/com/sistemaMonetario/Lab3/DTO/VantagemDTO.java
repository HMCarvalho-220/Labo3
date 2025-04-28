package com.sistemaMonetario.Lab3.DTO;

import lombok.Data;

@Data
public class VantagemDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private double valorMoedas;
    private Long empresaId;
    private String empresaNome;
    private int quantidadeResgatada;
    private boolean ativa;
}
