package com.sistemaMonetario.Lab3.Model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "instituicoes")
@NoArgsConstructor
@AllArgsConstructor
public class Instituicao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nome;
    
    @Column(nullable = false, length = 200)
    private String endereco;
}
