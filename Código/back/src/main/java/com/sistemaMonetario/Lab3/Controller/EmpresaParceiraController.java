package com.sistemaMonetario.Lab3.Controller;

import com.sistemaMonetario.Lab3.DTO.CreateEmpresaParceiraDTO;
import com.sistemaMonetario.Lab3.DTO.EmpresaParceiraDTO;
import com.sistemaMonetario.Lab3.Services.EmpresaParceiraService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/empresas")
@RequiredArgsConstructor
public class EmpresaParceiraController {

    private final EmpresaParceiraService empresaService;

    @PostMapping
    public ResponseEntity<EmpresaParceiraDTO> cadastrarEmpresa(
            @RequestBody @Valid CreateEmpresaParceiraDTO dto) {
        EmpresaParceiraDTO novaEmpresa = empresaService.cadastrarEmpresa(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaEmpresa);
    }

    @GetMapping
    public ResponseEntity<List<EmpresaParceiraDTO>> listarTodas() {
        return ResponseEntity.ok(empresaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmpresaParceiraDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(empresaService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpresaParceiraDTO> atualizarEmpresa(
            @PathVariable Long id,
            @RequestBody @Valid CreateEmpresaParceiraDTO dto) {
        return ResponseEntity.ok(empresaService.atualizarEmpresa(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEmpresa(@PathVariable Long id) {
        empresaService.deletarEmpresa(id);
        return ResponseEntity.noContent().build();
    }
}
