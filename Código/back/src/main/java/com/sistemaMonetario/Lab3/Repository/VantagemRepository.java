package com.sistemaMonetario.Lab3.Repository;

import com.sistemaMonetario.Lab3.Model.EmpresaParceira;
import com.sistemaMonetario.Lab3.Model.Vantagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VantagemRepository extends JpaRepository<Vantagem, Long> {
    List<Vantagem> findByEmpresaAndAtivaTrue(EmpresaParceira empresa);
    List<Vantagem> findByAtivaTrue();
}
