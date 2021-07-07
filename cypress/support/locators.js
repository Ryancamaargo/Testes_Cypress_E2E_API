const locators = {
    LOGIN: {
        EMAIL: '#email',
        SENHA: '#senha',
        BTN_LOGIN: '.btn'
    },
    CADASTRO: {
        EMAIL_CADASTRO: '#email',
        NOME_CADASTRO: '#nome',
        SENHA_CADASTRO: '#senha',
        BTN_CADASTRO: '.btn'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`
    },
    MENU: {
        HOME: '[data-test=menu-home]',
        SETTINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]',
        EXTRATO: '[data-test=menu-extrato]'
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        CONTA: '[data-test=conta]',
        STATUS: '[data-test=status]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`,
        FN_XP_REMOVER_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`,
        FN_XP_ALTERAR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='fas fa-edit']`,
        FN_XP_LINHA: desc => `//span[contains(., '${desc}')]/../../../..`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`
    },
    LINKTEXT_BUTTONS: {
        LINKTEXT_SAIR: '[href="/logout"]',
        LINKTEXT_CADASTRO: '[href="/cadastro"]',
        LINKTEXT_LOGIN: '[href="/login"]',
        LINKTEXT_HOME: '.nav > li:nth-child(1) > a'
    },
    CONTAS_BUTTONS: {
        ABRIROPCAO: '.dropdown-toggle',
        OPCAO_ADDCONTA: '[href="/addConta"]',
        OPCAO_LISTARCONTA: '[href="/contas"]'
    },
    ALERTA_MENSAGEM: '.alert',
    BTN_TODASTELAS: '.btn',
}


export default locators