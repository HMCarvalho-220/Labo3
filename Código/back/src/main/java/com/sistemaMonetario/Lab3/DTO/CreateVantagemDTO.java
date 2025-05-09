package com.sistemaMonetario.Lab3.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateVantagemDTO {
    @NotBlank(message = "Título é obrigatório")
    private String titulo;
    
    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;
    
    @NotNull(message = "Valor em moedas é obrigatório")
    @Min(value = 1, message = "Valor deve ser maior que zero")
    private Double valorMoedas;
}
