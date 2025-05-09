package com.sistemaMonetario.Lab3.Services;

import com.sistemaMonetario.Lab3.Model.Instituicao;
import com.sistemaMonetario.Lab3.Repository.InstituicaoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InstituicaoService {

    private final InstituicaoRepository instituicaoRepository;

    public Instituicao criarInstituicao(Instituicao instituicao) {
        if (instituicaoRepository.existsByNome(instituicao.getNome())) {
            throw new IllegalArgumentException("Instituição já cadastrada");
        }
        return instituicaoRepository.save(instituicao);
    }

    public List<Instituicao> listarTodas() {
        return instituicaoRepository.findAll();
    }

    public List<Instituicao> buscarPorNome(String nome) {
        return instituicaoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Instituicao buscarPorId(Long id) {
        return instituicaoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Instituição não encontrada"));
    }
}
