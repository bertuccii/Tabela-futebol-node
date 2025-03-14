import express from 'express';
import tabela2024 from './tabela.js';
import { modeloTime, modeloAtualizacaoTime } from './validacao.js';

// Iniciar app express
const app = express();
const PORT = 300;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
// Get todos os times
app.get('/', (req, res) => {
    res.status(200).json(tabela2024);
});

// Get time pela sigla
app.get('/:sigla', (req, res) => {
    const sigla = req.params.sigla.toUpperCase();
    const time = tabela2024.find(time => time.sigla === sigla);
    
    if (!time) {
        return res.status(404).json({ 
            error: 'Time não encontrado', 
            message: 'Não existe na Série A do Brasileirão um time com essa sigla.' 
        });
    }
    
    res.status(200).json(time);
});

// Atualizar dados do time pela sigla
app.put('/:sigla', (req, res) => {
    const sigla = req.params.sigla.toUpperCase();
    const timeIndex = tabela2024.findIndex(time => time.sigla === sigla);
    
    if (timeIndex === -1) {
        return res.status(404).json({ 
            error: 'Time não encontrado', 
            message: 'Não existe na Série A do Brasileirão um time com essa sigla.' 
        });
    }
    
    const timeSelecionado = tabela2024[timeIndex];
    
    // Valida as informações para atuaizar
    const { error } = modeloAtualizacaoTime.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            error: 'Dados inválidos', 
            details: error.details 
        });
    }
    
    // Atualizar os dados do time
    const campos = Object.keys(req.body);
    for (let campo of campos) {
        // Verifica se é numero ou string e se for numero soma as informações
        if (typeof timeSelecionado[campo] === 'number' && typeof req.body[campo] === 'number') {
            timeSelecionado[campo] += req.body[campo];
        } else if (typeof timeSelecionado[campo] === 'string' && typeof req.body[campo] === 'string') {
            timeSelecionado[campo] = req.body[campo];
        }
    }
    
    // se necessário ja faz a soma do saldo de gols
    if ((campos.includes('golsMarcados') || campos.includes('golsSofridos')) && 
        !campos.includes('saldoGols')) {
        timeSelecionado.saldoGols = timeSelecionado.golsMarcados - timeSelecionado.golsSofridos;
    }
    
    res.status(200).json(timeSelecionado);
});

// Add novo time
app.post('/', (req, res) => {
    // Verifica se ja tem um time com essa sigla
    const siglaExistente = tabela2024.some(time => 
        time.sigla === (req.body.sigla || '').toUpperCase()
    );
    
    if (siglaExistente) {
        return res.status(409).json({ 
            error: 'Conflito', 
            message: 'Já existe um time com essa sigla no Brasileirão Série A.' 
        });
    }
    
    // Validar dados do time
    const { error, value } = modeloTime.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            error: 'Dados inválidos', 
            details: error.details 
        });
    }
    
    // Garantir que a sigla esta em Maiusculo
    const novoTime = {
        ...value,
        sigla: value.sigla.toUpperCase()
    };
    
    // adicionar time na tabela
    tabela2024.push(novoTime);
    res.status(201).json(novoTime);
});


// Remover time pela sigla
app.delete('/:sigla', (req, res) => {
    const sigla = req.params.sigla.toUpperCase();
    const indiceTimeSelecionado = tabela2024.findIndex(time => time.sigla === sigla);
    
    if (indiceTimeSelecionado === -1) {
        return res.status(404).json({ 
            error: 'Time não encontrado', 
            message: 'Não existe na Série A do Brasileirão um time com essa sigla.' 
        });
    }
    
    const timeRemovido = tabela2024.splice(indiceTimeSelecionado, 1)[0];
    res.status(200).json({ 
        message: `Time ${timeRemovido.nome} removido com sucesso`,
        time: timeRemovido 
    });
});

// Tratament de erro de rotas
app.use((req, res, next) => {
    res.status(404).json({ 
        error: 'Rota não encontrada',
        message: 'A rota solicitada não existe nesta API.' 
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: 'Ocorreu um erro ao processar sua solicitação.' 
    });
});

// Iniciar app
app.listen(PORT, () => console.log('Servidor rodando na porta 300'));
