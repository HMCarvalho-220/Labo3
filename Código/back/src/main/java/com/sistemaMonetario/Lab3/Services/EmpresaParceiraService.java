package com.sistemaMonetario.Lab3.Services;

import com.sistemaMonetario.Lab3.DTO.CreateEmpresaParceiraDTO;
import com.sistemaMonetario.Lab3.DTO.EmpresaParceiraDTO;
import com.sistemaMonetario.Lab3.Model.EmpresaParceira;
import com.sistemaMonetario.Lab3.Repository.EmpresaParceiraRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpresaParceiraService {

    private final EmpresaParceiraRepository empresaRepository;

    public EmpresaParceiraDTO cadastrarEmpresa(CreateEmpresaParceiraDTO dto) {
        if (empresaRepository.existsByCnpj(dto.getCnpj())) {
            throw new IllegalArgumentException("CNPJ já cadastrado");
        }

        EmpresaParceira empresa = new EmpresaParceira();
        empresa.setNome(dto.getNome());
        empresa.setEmail(dto.getEmail());
        empresa.setCnpj(dto.getCnpj());
        empresa.setSenha(dto.getSenha()); // Na prática, usar BCrypt
        empresa.setRamo(dto.getRamo());
        empresa.setDescricao(dto.getDescricao());

        EmpresaParceira salva = empresaRepository.save(empresa);
        return toDTO(salva);
    }

    public List<EmpresaParceiraDTO> listarTodas() {
        return empresaRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public EmpresaParceiraDTO buscarPorId(Long id) {
        EmpresaParceira empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada"));
        return toDTO(empresa);
    }

    public EmpresaParceiraDTO atualizarEmpresa(Long id, CreateEmpresaParceiraDTO dto) {
        EmpresaParceira empresa = empresaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada"));

        empresa.setNome(dto.getNome());
        empresa.setEmail(dto.getEmail());
        empresa.setRamo(dto.getRamo());
        empresa.setDescricao(dto.getDescricao());

        return toDTO(empresaRepository.save(empresa));
    }

    public void deletarEmpresa(Long id) {
        if (!empresaRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada");
        }
        empresaRepository.deleteById(id);
    }

    private EmpresaParceiraDTO toDTO(EmpresaParceira empresa) {
        EmpresaParceiraDTO dto = new EmpresaParceiraDTO();
        dto.setId(empresa.getId());
        dto.setNome(empresa.getNome());
        dto.setEmail(empresa.getEmail());
        dto.setCnpj(empresa.getCnpj());
        dto.setRamo(empresa.getRamo());
        dto.setDescricao(empresa.getDescricao());
        dto.setUrlLogo(empresa.getUrlLogo());
        return dto;
    }
}
