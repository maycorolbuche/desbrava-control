<template>
  <Page title="Termos de Uso" :prev-route="{ name: 'profile' }">
    <v-card flat>
      <v-card-subtitle class="my-3"> Última atualização: 29 de março de 2026 </v-card-subtitle>
      <v-card-title>1. Aceitação dos Termos</v-card-title>
      <v-card-text>
        Ao acessar e utilizar este aplicativo, você concorda com os presentes Termos de Uso. Caso
        não concorde com qualquer parte destes termos, recomendamos que não utilize o serviço.
      </v-card-text>
      <v-card-title>2. Descrição do Serviço</v-card-title>
      <v-card-text>
        O aplicativo oferece funcionalidades voltadas para o gerenciamento de classes e
        especialidades do clube de desbravadores.
      </v-card-text>
      <v-card-title>3. SGC</v-card-title>
      <v-card-text>
        Este aplicativo não substitui o Sistema de Gerenciamento de Clubes (SGC) oficial da divisão
        Sul-Americana da Igreja Adventista do Sétimo Dia, sendo apenas uma ferramenta complementar
        para facilitar o controle de classes e especialidades. O SGC é a plataforma oficial para o
        registro de informações dos clubes de desbravadores, e este aplicativo não tem a intenção de
        replicar ou substituir suas funcionalidades. Todos os dados de classes e especialidades
        devem ser mantidos atualizados no SGC, enquanto este aplicativo pode ser utilizado como um
        recurso adicional para facilitar o gerenciamento interno.
      </v-card-text>
      <v-card-title>4. Privacidade e Dados Coletados</v-card-title>
      <v-card-text>
        Este aplicativo não faz coleta de dados pessoais sensíveis, como CPF, RG ou outras
        informações semelhantes. Os dados coletados (nome, e-mail, nome de usuário e senha) são
        utilizados exclusivamente para autenticação do usuário, identificação dentro da plataforma e
        comunicação básica, quando necessário. As senhas são armazenadas de forma segura, utilizando
        técnicas de criptografia.
      </v-card-text>
      <v-card-title>5. Responsabilidades do Usuário</v-card-title>
      <v-card-text>
        O usuário é responsável por:
        <ul>
          <li>Manter a confidencialidade de sua senha</li>
          <li>Não compartilhar suas credenciais de acesso</li>
          <li>Notificar imediatamente qualquer uso não autorizado de sua conta</li>
        </ul>
        <p>O uso indevido da conta é de responsabilidade do próprio usuário.</p>
      </v-card-text>
      <v-card-title>6. Uso Adequado</v-card-title>
      <v-card-text>
        O usuário concorda em não utilizar o aplicativo para:
        <ul>
          <li>Atividades ilegais</li>
          <li>Violação de direitos de terceiros</li>
          <li>
            Tentativas de invasão, exploração de falhas ou comprometimento da segurança do sistema
          </li>
        </ul>
      </v-card-text>
      <v-card-title>7. Limitação de Responsabilidade</v-card-title>
      <v-card-text>
        O aplicativo é fornecido sem garantias de funcionamento ininterrupto ou livre de erros. Não
        nos responsabilizamos por:
        <ul>
          <li>Perdas de dados causadas por falhas externas</li>
          <li>Problemas decorrentes do uso indevido da plataforma</li>
          <li>Indisponibilidade temporária do sistema</li>
        </ul>
      </v-card-text>
      <v-card-title>8. Alterações nos Termos</v-card-title>
      <v-card-text>
        Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Recomendamos
        que o usuário revise este documento periodicamente.
      </v-card-text>
      <v-card-title>9. Encerramento de Conta</v-card-title>
      <v-card-text>
        Podemos suspender ou encerrar contas que violem estes termos, sem aviso prévio.
      </v-card-text>
      <v-card-title>10. Contato</v-card-title>
      <v-card-text>
        Em caso de dúvidas sobre estes Termos de Uso, entre em contato através do seu regional ou
        diretor do clube.
      </v-card-text>
      <hr />
      <v-card-text>
        <strong>
          Ao utilizar este aplicativo, você declara que leu, entendeu e concorda com estes Termos de
          Uso.
        </strong>
      </v-card-text>
    </v-card>
  </Page>
</template>

<script setup>
import { computed } from 'vue'

import Page from '@/components/Page.vue'
import { userStore } from '@/stores/userStore'

const user_store = computed(() => {
  return userStore()
})

const user = computed(() => {
  return user_store.value?.user
})
</script>
