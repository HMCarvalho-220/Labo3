package com.sistemaMonetario.Lab3.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@Entity
@Table(name = "empresas_parceiras")
@EqualsAndHashCode(callSuper = true)
public class EmpresaParceira extends Usuario {
    
    @Column(nullable = false, unique = true, length = 18)
    private String cnpj;
    
    @Column(nullable = false, length = 50)
    private String ramo;
    
    @Column(length = 500)
    private String descricao;
    
    @Column(name = "url_logo")
    private String urlLogo;
}