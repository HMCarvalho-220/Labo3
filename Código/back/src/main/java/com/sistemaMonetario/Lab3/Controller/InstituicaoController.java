package com.sistemaMonetario.Lab3.Controller;

import com.sistemaMonetario.Lab3.Model.Instituicao;
import com.sistemaMonetario.Lab3.Services.InstituicaoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/instituicoes")
@RequiredArgsConstructor
public class InstituicaoController {

    private final InstituicaoService instituicaoService;

    @PostMapping
    public ResponseEntity<Instituicao> criarInstituicao(@RequestBody Instituicao instituicao) {
        Instituicao novaInstituicao = instituicaoService.criarInstituicao(instituicao);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaInstituicao);
    }

    @GetMapping
    public ResponseEntity<List<Instituicao>> listarTodas() {
        return ResponseEntity.ok(instituicaoService.listarTodas());
    }

    @GetMapping("/busca")
    public ResponseEntity<List<Instituicao>> buscarPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(instituicaoService.buscarPorNome(nome));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instituicao> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(instituicaoService.buscarPorId(id));
    }
}
