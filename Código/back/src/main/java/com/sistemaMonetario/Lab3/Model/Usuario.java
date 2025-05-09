package com.sistemaMonetario.Lab3.Model;

import jakarta.persistence.*;
import lombok.*;

@Data
@MappedSuperclass
@NoArgsConstructor
@AllArgsConstructor
public abstract class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(nullable = false, unique = true, length = 14)
    private String cpf;
    
    @Column(nullable = false, length = 100)
    private String senha;
}
