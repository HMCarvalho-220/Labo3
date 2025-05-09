package com.sistemaMonetario.Lab3.Controller;

import com.sistemaMonetario.Lab3.DTO.TransacaoDTO;
import com.sistemaMonetario.Lab3.DTO.VantagemDTO;
import com.sistemaMonetario.Lab3.Services.TransacaoService;
import com.sistemaMonetario.Lab3.Services.VantagemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transacoes")
@RequiredArgsConstructor
public class TransacaoController {

    private final TransacaoService transacaoService;
    private final VantagemService vantagemService;

    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<List<TransacaoDTO>> listarTransacoesPorAluno(@PathVariable Long alunoId) {
        return ResponseEntity.ok(transacaoService.listarTransacoesPorAluno(alunoId));
    }

    @PostMapping("/creditar/{alunoId}")
    public ResponseEntity<TransacaoDTO> creditarMoedas(
            @PathVariable Long alunoId,
            @RequestBody Map<String, Object> payload) {
        
        double valor = Double.parseDouble(payload.get("valor").toString());
        String descricao = payload.get("descricao").toString();
        
        TransacaoDTO transacao = transacaoService.creditarMoedas(alunoId, valor, descricao);
        return ResponseEntity.status(HttpStatus.CREATED).body(transacao);
    }

    @PostMapping("/debitar/{alunoId}")
    public ResponseEntity<TransacaoDTO> debitarMoedas(
            @PathVariable Long alunoId,
            @RequestBody Map<String, Object> payload) {
        
        double valor = Double.parseDouble(payload.get("valor").toString());
        String descricao = payload.get("descricao").toString();
        
        TransacaoDTO transacao = transacaoService.debitarMoedas(alunoId, valor, descricao);
        return ResponseEntity.status(HttpStatus.CREATED).body(transacao);
    }

    @PostMapping("/resgatar/{alunoId}/vantagem/{vantagemId}")
    public ResponseEntity<TransacaoDTO> resgatarVantagem(
            @PathVariable Long alunoId,
            @PathVariable Long vantagemId) {
        
        VantagemDTO vantagem = vantagemService.buscarPorId(vantagemId);
        TransacaoDTO transacao = transacaoService.debitarMoedas(
                alunoId, 
                vantagem.getValorMoedas(), 
                "Resgate: " + vantagem.getTitulo()
        );
        vantagemService.incrementarResgate(vantagemId);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(transacao);
    }
}
