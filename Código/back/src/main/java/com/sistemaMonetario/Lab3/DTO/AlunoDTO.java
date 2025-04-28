package com.sistemaMonetario.Lab3.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AlunoDTO {
    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private String rg;
    private String endereco;
    private Long instituicaoId;
    private String instituicaoNome;
    private String curso;
    private double saldoMoedas;
    private LocalDateTime dataCadastro;
}
