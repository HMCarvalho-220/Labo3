package com.sistemaMonetario.Lab3.Services;

import com.sistemaMonetario.Lab3.DTO.CreateVantagemDTO;
import com.sistemaMonetario.Lab3.DTO.VantagemDTO;
import com.sistemaMonetario.Lab3.Model.EmpresaParceira;
import com.sistemaMonetario.Lab3.Model.Vantagem;
import com.sistemaMonetario.Lab3.Repository.EmpresaParceiraRepository;
import com.sistemaMonetario.Lab3.Repository.VantagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VantagemService {

    private final VantagemRepository vantagemRepository;
    private final EmpresaParceiraRepository empresaRepository;

    public VantagemDTO criarVantagem(Long empresaId, CreateVantagemDTO dto) {
        EmpresaParceira empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada"));
        
        Vantagem vantagem = new Vantagem();
        vantagem.setTitulo(dto.getTitulo());
        vantagem.setDescricao(dto.getDescricao());
        vantagem.setValorMoedas(dto.getValorMoedas());
        vantagem.setEmpresa(empresa);
        
        Vantagem saved = vantagemRepository.save(vantagem);
        return toDTO(saved);
    }

    public List<VantagemDTO> listarVantagensAtivas() {
        return vantagemRepository.findByAtivaTrue().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<VantagemDTO> listarVantagensPorEmpresa(Long empresaId) {
        EmpresaParceira empresa = empresaRepository.findById(empresaId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Empresa não encontrada"));
        
        return vantagemRepository.findByEmpresaAndAtivaTrue(empresa).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public VantagemDTO buscarPorId(Long id) {
        Vantagem vantagem = vantagemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vantagem não encontrada"));
        return toDTO(vantagem);
    }

    public void desativarVantagem(Long id) {
        Vantagem vantagem = vantagemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vantagem não encontrada"));
        
        vantagem.setAtiva(false);
        vantagemRepository.save(vantagem);
    }

    public void incrementarResgate(Long id) {
        Vantagem vantagem = vantagemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Vantagem não encontrada"));
        
        vantagem.setQuantidadeResgatada(vantagem.getQuantidadeResgatada() + 1);
        vantagemRepository.save(vantagem);
    }

    private VantagemDTO toDTO(Vantagem vantagem) {
        VantagemDTO dto = new VantagemDTO();
        dto.setId(vantagem.getId());
        dto.setTitulo(vantagem.getTitulo());
        dto.setDescricao(vantagem.getDescricao());
        dto.setValorMoedas(vantagem.getValorMoedas());
        dto.setEmpresaId(vantagem.getEmpresa().getId());
        dto.setEmpresaNome(vantagem.getEmpresa().getNome());
        dto.setQuantidadeResgatada(vantagem.getQuantidadeResgatada());
        dto.setAtiva(vantagem.isAtiva());
        return dto;
    }
}
