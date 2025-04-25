package com.sistemaMonetario.Lab3.Controller;

import com.sistemaMonetario.Lab3.DTO.AlunoDTO;
import com.sistemaMonetario.Lab3.DTO.CreateAlunoDTO;
import com.sistemaMonetario.Lab3.Services.AlunoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alunos")
@RequiredArgsConstructor
public class AlunoController {

    private final AlunoService alunoService;

    @PostMapping
    public ResponseEntity<AlunoDTO> createAluno(@RequestBody @Valid CreateAlunoDTO dto) {
        AlunoDTO created = alunoService.createAluno(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<AlunoDTO>> getAllAlunos() {
        List<AlunoDTO> alunos = alunoService.getAllAlunos();
        return ResponseEntity.ok(alunos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlunoDTO> getAlunoById(@PathVariable Long id) {
        AlunoDTO aluno = alunoService.getAlunoById(id);
        return ResponseEntity.ok(aluno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AlunoDTO> updateAluno(
            @PathVariable Long id, 
            @RequestBody @Valid CreateAlunoDTO dto) {
        AlunoDTO updated = alunoService.updateAluno(id, dto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAluno(@PathVariable Long id) {
        alunoService.deleteAluno(id);
        return ResponseEntity.noContent().build();
    }
}