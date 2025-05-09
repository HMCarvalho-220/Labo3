package com.sistemaMonetario.Lab3.Services;

import com.sistemaMonetario.Lab3.DTO.AlunoDTO;
import com.sistemaMonetario.Lab3.DTO.CreateAlunoDTO;
import com.sistemaMonetario.Lab3.Model.Aluno;
import com.sistemaMonetario.Lab3.Model.Instituicao;
import com.sistemaMonetario.Lab3.Repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final InstituicaoService instituicaoService;

    public AlunoDTO createAluno(CreateAlunoDTO dto) {
        if (alunoRepository.existsByCpf(dto.getCpf())) {
            throw new IllegalArgumentException("CPF já cadastrado");
        }
        
        if (alunoRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado");
        }
        
        Instituicao instituicao = instituicaoService.buscarPorId(dto.getInstituicaoId());
        
        Aluno aluno = new Aluno();
        aluno.setNome(dto.getNome());
        aluno.setEmail(dto.getEmail());
        aluno.setCpf(dto.getCpf());
        aluno.setSenha(dto.getSenha()); // Na prática, usar BCrypt
        aluno.setRg(dto.getRg());
        aluno.setEndereco(dto.getEndereco());
        aluno.setInstituicao(instituicao);
        aluno.setCurso(dto.getCurso());
        
        Aluno saved = alunoRepository.save(aluno);
        return toDTO(saved);
    }

    public List<AlunoDTO> getAllAlunos() {
        return alunoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public AlunoDTO getAlunoById(Long id) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));
        return toDTO(aluno);
    }

    public AlunoDTO updateAluno(Long id, CreateAlunoDTO dto) {
        Aluno aluno = alunoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado"));
        
        Instituicao instituicao = instituicaoService.buscarPorId(dto.getInstituicaoId());
        
        aluno.setNome(dto.getNome());
        aluno.setEmail(dto.getEmail());
        aluno.setRg(dto.getRg());
        aluno.setEndereco(dto.getEndereco());
        aluno.setInstituicao(instituicao);
        aluno.setCurso(dto.getCurso());
        
        Aluno updated = alunoRepository.save(aluno);
        return toDTO(updated);
    }

    public void deleteAluno(Long id) {
        if (!alunoRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aluno não encontrado");
        }
        alunoRepository.deleteById(id);
    }
    
    private AlunoDTO toDTO(Aluno aluno) {
        AlunoDTO dto = new AlunoDTO();
        dto.setId(aluno.getId());
        dto.setNome(aluno.getNome());
        dto.setEmail(aluno.getEmail());
        dto.setCpf(aluno.getCpf());
        dto.setRg(aluno.getRg());
        dto.setEndereco(aluno.getEndereco());
        dto.setInstituicaoId(aluno.getInstituicao().getId());
        dto.setInstituicaoNome(aluno.getInstituicao().getNome());
        dto.setCurso(aluno.getCurso());
        dto.setSaldoMoedas(aluno.getSaldoMoedas());
        dto.setDataCadastro(aluno.getDataCadastro());
        return dto;
    }
}
