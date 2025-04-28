package com.sistemaMonetario.Lab3.DTO;

import lombok.Data;

@Data
public class EmpresaParceiraDTO {
    private Long id;
    private String nome;
    private String email;
    private String cnpj;
    private String ramo;
    private String descricao;
    private String urlLogo;
}
