class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const animaisValidos = ['Rex', 'Fofo', 'Mimi', 'Bola', 'Zero', 'Bebe', 'Loco'];
    const brinquedosValidos = ['RATO', 'BOLA', 'NOVELO', 'LASER', 'CAIXA', 'SKATE'];
    const brinquedosFavoritos = {
      Rex: ['RATO', 'BOLA'],
      Fofo: ['BOLA', 'RATO', 'LASER'],
      Mimi: ['BOLA', 'LASER'],
      Bola: ['CAIXA', 'NOVELO'],
      Zero: ['RATO', 'BOLA'],
      Bebe: ['LASER', 'RATO', 'BOLA'],
      Loco: ['SKATE', 'RATO']
    };

    const listaPessoa1 = brinquedosPessoa1.split(',').map(b => b.trim().toUpperCase());
    const listaPessoa2 = brinquedosPessoa2.split(',').map(b => b.trim().toUpperCase());
    const listaAnimais = ordemAnimais.split(',').map(a => a.trim());

    if (listaAnimais.some(a => !animaisValidos.includes(a)) || new Set(listaAnimais).size !== listaAnimais.length) {
      return { erro: 'Animal inválido', lista: null };
    }

    const allBrinquedos = [...listaPessoa1, ...listaPessoa2];
    if (allBrinquedos.some(b => !brinquedosValidos.includes(b))) {
      return { erro: 'Brinquedo inválido', lista: null };
    }

    const adotados = {};
    let contadorPessoa1 = 0;
    let contadorPessoa2 = 0;
    const animaisAdotados = [];

    const podeAdotar = (listaPessoa, favoritos, isLoco = false) => {
      if (isLoco) {
        return favoritos.every(b => listaPessoa.includes(b));
      } else {
        let index = 0;
        for (const b of listaPessoa) {
          if (b === favoritos[index]) {
            index++;
            if (index === favoritos.length) return true;
          }
        }
        return false;
      }
    };

    for (const animal of listaAnimais) {
      const favoritos = brinquedosFavoritos[animal];
      const isLoco = animal === 'Loco';
      const podePessoa1 = podeAdotar(listaPessoa1, favoritos, isLoco);
      const podePessoa2 = podeAdotar(listaPessoa2, favoritos, isLoco);

      let adotante = null;
      if (podePessoa1 && podePessoa2) {
        adotante = 'abrigo';
      } else if (podePessoa1) {
        if (contadorPessoa1 < 3) {
          adotante = 'pessoa 1';
          contadorPessoa1++;
        } else {
          adotante = 'abrigo';
        }
      } else if (podePessoa2) {
        if (contadorPessoa2 < 3) {
          adotante = 'pessoa 2';
          contadorPessoa2++;
        } else {
          adotante = 'abrigo';
        }
      } else {
        adotante = 'abrigo';
      }

      if (adotante !== 'abrigo') {
        animaisAdotados.push(animal);
      }

      adotados[animal] = adotante;
    }

    if (listaAnimais.includes('Loco') && adotados['Loco'] !== 'abrigo') {
      const hasCompany = animaisAdotados.length > 1;
      if (!hasCompany) {
        adotados['Loco'] = 'abrigo';
        animaisAdotados.splice(animaisAdotados.indexOf('Loco'), 1);
      }
    }

    const lista = Object.keys(adotados).sort().map(a => `${a} - ${adotados[a]}`);

    return { erro: null, lista };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
