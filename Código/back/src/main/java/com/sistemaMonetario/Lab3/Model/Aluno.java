package com.sistemaMonetario.Lab3.Model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "alunos")
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@NoArgsConstructor
public class Aluno extends Usuario {
    
    @Column(nullable = false, unique = true, length = 12)
    private String rg;
    
    @Column(nullable = false, length = 200)
    private String endereco;
    
    @ManyToOne
    @JoinColumn(name = "instituicao_id", nullable = false)
    private Instituicao instituicao;
    
    @Column(nullable = false, length = 100)
    private String curso;
    
    @Column(name = "saldo_moedas", columnDefinition = "double default 0.0")
    private double saldoMoedas = 0.0;
    
    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro = LocalDateTime.now();
    
    // Métodos de negócio
    public void creditarMoedas(double valor) {
        this.saldoMoedas += valor;
    }
    
    public void debitarMoedas(double valor) {
        if (this.saldoMoedas < valor) {
            throw new IllegalArgumentException("Saldo insuficiente de moedas");
        }
        this.saldoMoedas -= valor;
    }
}