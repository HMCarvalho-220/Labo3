package com.sistemaMonetario.Lab3.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "transacoes")
@NoArgsConstructor
public class Transacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;
    
    @Column(nullable = false)
    private double valor;
    
    @Column(nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private TipoTransacao tipo;
    
    @Column(nullable = false, length = 200)
    private String descricao;
    
    @Column(name = "data_transacao", nullable = false)
    private LocalDateTime dataTransacao = LocalDateTime.now();
    
    public enum TipoTransacao {
        CREDITO, DEBITO
    }
}
