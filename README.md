# Histórias de Usuário - Sistema de Moeda Estudantil

## 1. Cadastro de Usuários

### **US01 - Cadastro de Aluno**
**Como** um novo aluno  
**Eu quero** me cadastrar no sistema  
**Para que** eu possa receber e usar moedas estudantis  

**Critérios de Aceitação:**  
- Deve incluir nome, email, CPF, RG, endereço, instituição de ensino e curso  
- A instituição deve ser selecionada entre as pré-cadastradas  
- Deve gerar login/senha automáticos  

---

### **US02 - Cadastro de Empresa Parceira**
**Como** representante de uma empresa  
**Eu quero** cadastrar minha empresa no sistema  
**Para que** eu possa oferecer vantagens aos alunos  

**Critérios de Aceitação:**  
- Deve incluir CNPJ, ramo de atuação e vantagens oferecidas  
- Deve permitir upload de logo/identidade visual  

---

## 2. Operações com Moedas

### **US03 - Distribuição de Moedas (Professor)**
**Como** professor  
**Eu quero** distribuir moedas para alunos  
**Para que** eu possa reconhecer seu mérito  

**Critérios de Aceitação:**  
- Deve verificar saldo disponível do professor  
- Deve exigir mensagem de motivação (obrigatória)  
- Deve notificar o aluno por e-mail  

---

### **US04 - Resgate de Vantagens (Aluno)**
**Como** aluno  
**Eu quero** trocar moedas por vantagens  
**Para que** eu possa usufruir dos benefícios  

**Critérios de Aceitação:**  
- Deve mostrar saldo atual do aluno  
- Deve gerar cupom com código único  
- Deve enviar e-mail de confirmação para aluno e parceiro  

---

## 3. Consultas

### **US05 - Visualização de Extrato**
**Como** usuário (aluno/professor)  
**Eu quero** ver meu extrato de transações  
**Para que** eu possa acompanhar meu histórico  

**Critérios de Aceitação:**  
- Deve mostrar saldo atual  
- Deve listar transações ordenadas por data  
- Deve filtrar por período (opcional)  

---

### **US06 - Consulta de Vantagens Disponíveis**
**Como** aluno  
**Eu quero** ver todas as vantagens disponíveis  
**Para que** eu possa planejar meus resgates  

**Critérios de Aceitação:**  
- Deve mostrar custo em moedas  
- Deve permitir filtro por categoria  
- Deve exibir foto e descrição detalhada  

---

## 4. Administração

### **US07 - Recarga Semestral de Moedas (Sistema)**
**Como** administrador do sistema  
**Eu quero** que professores recebam 1000 moedas/semestre  
**Para que** eles possam distribuir aos alunos  

**Critérios de Aceitação:**  
- Deve ser automático no início de cada semestre  
- Moedas não usadas devem ser acumuladas  
- Deve notificar os professores  

---

### **US08 - Gerenciamento de Parcerias**
**Como** administrador  
**Eu quero** aprovar cadastros de empresas  
**Para que** apenas parceiras válidas ofereçam vantagens  

**Critérios de Aceitação:**  
- Deve exigir documentação comprobatória  
- Deve permitir ativação/desativação de parceiros  
- Deve registrar responsável legal  
