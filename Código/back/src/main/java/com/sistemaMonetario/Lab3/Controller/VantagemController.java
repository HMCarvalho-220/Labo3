package com.sistemaMonetario.Lab3.Controller;

import com.sistemaMonetario.Lab3.DTO.CreateVantagemDTO;
import com.sistemaMonetario.Lab3.DTO.VantagemDTO;
import com.sistemaMonetario.Lab3.Services.VantagemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vantagens")
@RequiredArgsConstructor
public class VantagemController {

    private final VantagemService vantagemService;

    @GetMapping
    public ResponseEntity<List<VantagemDTO>> listarVantagensAtivas() {
        return ResponseEntity.ok(vantagemService.listarVantagensAtivas());
    }

    @GetMapping("/empresa/{empresaId}")
    public ResponseEntity<List<VantagemDTO>> listarVantagensPorEmpresa(@PathVariable Long empresaId) {
        return ResponseEntity.ok(vantagemService.listarVantagensPorEmpresa(empresaId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VantagemDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vantagemService.buscarPorId(id));
    }

    @PostMapping("/empresa/{empresaId}")
    public ResponseEntity<VantagemDTO> criarVantagem(
            @PathVariable Long empresaId,
            @RequestBody @Valid CreateVantagemDTO dto) {
        VantagemDTO vantagem = vantagemService.criarVantagem(empresaId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(vantagem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> desativarVantagem(@PathVariable Long id) {
        vantagemService.desativarVantagem(id);
        return ResponseEntity.noContent().build();
    }
}
