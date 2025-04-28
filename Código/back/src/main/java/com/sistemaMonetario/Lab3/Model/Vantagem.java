package com.sistemaMonetario.Lab3.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "vantagens")
@NoArgsConstructor
public class Vantagem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String titulo;
    
    @Column(nullable = false, length = 500)
    private String descricao;
    
    @Column(nullable = false)
    private double valorMoedas;
    
    @ManyToOne
    @JoinColumn(name = "empresa_id", nullable = false)
    private EmpresaParceira empresa;
    
    @Column(name = "quantidade_resgatada", columnDefinition = "int default 0")
    private int quantidadeResgatada = 0;
    
    @Column(name = "ativa", columnDefinition = "boolean default true")
    private boolean ativa = true;
}
