# ⚽ API do Brasileirão

Bem-vindos ao meu projeto de API do Brasileirão! Criei essa aplicação para gerenciar a tabela do Campeonato Brasileiro de Futebol (Série A).

## 🚀 O que essa API faz?

Essa API permite que você:

- Veja a tabela completa do Brasileirão 2024
- Busque informações de um time específico usando a sigla (tipo "FLA" para Flamengo)
- Atualize os dados de um time (pontos, gols, vitórias, etc.)
- Adicione um novo time à tabela
- Remova um time da tabela

## 🛠️ Tecnologias usadas

- **Node.js**: O coração da aplicação
- **Express**: Framework para criar as rotas da API
- **Joi**: Para validar os dados e evitar informações incorretas
- **JavaScript (ES Modules)**: Código moderno com import/export

## 📋 Estrutura do projeto

O projeto é bem simples e organizado:

- **app.js**: Arquivo principal com todas as rotas e configurações
- **tabela.js**: Contém os dados dos times do Brasileirão 2024
- **validacao.js**: Define os modelos de validação para os times

## 🔍 Como usar a API

### Iniciar o servidor

```bash
node app.js
```

O servidor vai rodar na porta 300. Você vai ver a mensagem "Servidor rodando na porta 300" quando estiver tudo certo!

### Endpoints disponíveis

#### 1. Ver todos os times
```
GET /
```
Retorna a tabela completa do Brasileirão.

#### 2. Ver um time específico
```
GET /:sigla
```
Substitua `:sigla` pela sigla do time (exemplo: `/FLA` para Flamengo).

#### 3. Atualizar dados de um time
```
PUT /:sigla
```
Envie um JSON com os campos que deseja atualizar. Exemplo:
```json
{
  "pontos": 3,
  "vitorias": 1,
  "golsMarcados": 2,
  "golsSofridos": 0
}
```

#### 4. Adicionar um novo time
```
POST /
```
Envie um JSON com os dados do novo time. Exemplo:
```json
{
  "nome": "Novo Time FC",
  "sigla": "NFC",
  "pontos": 0,
  "vitorias": 0,
  "empates": 0,
  "derrotas": 0,
  "golsMarcados": 0,
  "golsSofridos": 0,
  "saldoGols": 0
}
```

#### 5. Remover um time
```
DELETE /:sigla
```
Substitua `:sigla` pela sigla do time que deseja remover.

## 🧠 Funcionalidades legais

- A API calcula automaticamente o saldo de gols quando você atualiza os gols marcados ou sofridos
- Todas as siglas são convertidas para maiúsculas para evitar problemas de busca
- Validação completa dos dados para garantir que tudo esteja correto
- Mensagens de erro amigáveis e informativas

## 🤝 Contribuições

Sinta-se à vontade para contribuir com esse projeto! Pode abrir issues, enviar pull requests ou dar sugestões de melhorias.

## 📝 Licença

Este projeto está sob a licença MIT. Pode usar, modificar e distribuir à vontade!

---

Feito com ❤️ e muito ☕ por um apaixonado por futebol e programação!
