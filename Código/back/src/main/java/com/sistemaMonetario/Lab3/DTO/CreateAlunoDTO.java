package com.sistemaMonetario.Lab3.DTO;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateAlunoDTO {
    @NotBlank(message = "Nome é obrigatório")
    private String nome;
    
    @Email(message = "Email inválido")
    @NotBlank(message = "Email é obrigatório")
    private String email;
    
    @NotBlank(message = "CPF é obrigatório")
    @Pattern(regexp = "\\d{11}", message = "CPF deve conter 11 dígitos")
    private String cpf;
    
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracteres")
    private String senha;
    
    @NotBlank(message = "RG é obrigatório")
    private String rg;
    
    @NotBlank(message = "Endereço é obrigatório")
    private String endereco;
    
    @NotNull(message = "Instituição é obrigatória")
    private Long instituicaoId;
    
    @NotBlank(message = "Curso é obrigatório")
    private String curso;
}