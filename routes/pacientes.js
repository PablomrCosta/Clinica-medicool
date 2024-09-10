// routes/paciente.js
const express = require('express');
const router = express.Router();
const sequelize = require('../models/db');
const Paciente = require('../models/paciente');

// Importa a biblioteca de validação e formatação de CPF
const { cpf } = require('cpf-cnpj-validator');

// Sincroniza o modelo com o banco de dados
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});

router.get('/', (req, res) => {
  res.render('layout', { title: 'Menu', body: 'pacientes' });
});

router.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll(); 
    res.status(200);

    res.render('pacientes', {
      title: 'Lista de Pacientes',
      body: 'pacientes',
      pacientes: pacientes,
      isEmpty: pacientes.length === 0 
    });
  } catch (error) {
    res.status(500);
    return res.render('error', { title: 'Erro', message: error.message, error: error });
  }
});

router.get('/pacientes/add', (req, res) => {
  res.render('addpaciente', { title: 'Adicionar Paciente' });
});

router.post('/pacientes/add', async (req, res) => {
  try {
    let { CPF, Nome, Idade, DiaMarcado, HoraMarcada } = req.body;

    // Remove caracteres não numéricos e formata o CPF
    CPF = CPF.replace(/\D/g, '');
    if (!cpf.isValid(CPF)) {
      return res.render('addpaciente', {
        title: 'Adicionar Paciente',
        errorMessage: 'CPF inválido', 
        CPF, Nome, Idade, DiaMarcado, HoraMarcada 
      });
    }

    // Formata o CPF antes de salvar
    CPF = cpf.format(CPF);

    // Cria paciente CPF for válido
    const paciente = await Paciente.create({ CPF, Nome, Idade, DiaMarcado, HoraMarcada });
    res.status(201);
    res.redirect('/pacientes');
  } catch (error) {
    res.status(400);
    return res.render('error', { title: 'Erro', message: error.message, error });
  }
});

router.get('/pacientes/update', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.render('updatepaciente', { pacientes: pacientes, title: 'Atualizar Paciente' });
  } catch (error) {
    res.status(500);
    return res.render('error', {
      title: 'Erro',
      message: error.message,
      error: error,
    });
  }
});

router.get('/pacientes/update/:CPF', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.CPF);
    if (!paciente) {
      res.status(404);
      return res.render('error', {
        title: 'Erro',
        message: 'Paciente não encontrado.',
        error: '',
      });
    }
    res.json(paciente);
  } catch (error) {
    res.status(500);
    return res.render('error', {
      title: 'Erro',
      message: error.message,
      error: error,
    });
  }
});

router.post('/pacientes/update', async (req, res) => {
  let { pacienteCPF, Nome, Idade, DiaMarcado, HoraMarcada } = req.body;

  // Remove caracteres não numéricos e formata o CPF
  pacienteCPF = pacienteCPF.replace(/\D/g, '');
  if (!cpf.isValid(pacienteCPF)) {
    res.status(400);
    return res.render('error', {
      title: 'Erro',
      message: 'CPF inválido. Por favor, insira um CPF válido.',
      error: '',
    });
  }

  // Formata o CPF antes de atualizar
  pacienteCPF = cpf.format(pacienteCPF);

  try {
    await Paciente.update(
      { Nome, Idade, DiaMarcado, HoraMarcada },
      {
        where: { CPF: pacienteCPF },
      }
    );
    res.status(204);
    res.redirect('/pacientes');
  } catch (error) {
    res.status(500);
    return res.render('error', {
      title: 'Erro',
      message: error.message,
      error: error,
    });
  }
});

router.get('/pacientes/delete', (req, res) => {
  res.render('deletepaciente', { title: 'Apagar Paciente' });
});

router.post('/pacientes/delete', async (req, res) => {
  try {
    let CPF = req.body.CPF.replace(/\D/g, '');
    if (!cpf.isValid(CPF)) {
      return res.render('error', {
        title: 'Erro',
        message: 'CPF inválido. Por favor, insira um CPF válido.',
        error: '',
      });
    }
    CPF = cpf.format(CPF);

    const paciente = await Paciente.findByPk(CPF);
    if (!paciente) {
      res.status(404);
      return res.render('error', {
        title: 'Erro',
        message: 'Paciente não encontrado',
        error: '',
      });
    }
    await paciente.destroy();
    res.status(204);
    res.redirect('/pacientes');
  } catch (error) {
    res.status(500);
    return res.render('error', {
      title: 'Erro',
      message: error.message,
      error: error,
    });
  }
});

module.exports = router;
