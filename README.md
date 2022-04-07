Serviços:
   Criação de serviço
   Listagem de todos os serviços
   Remover serviços
   Listage de unico serviço

Usuário:
   Criação de um usuário
   Remoção de um usuário

Agendamento:
   Criar um novo agendamento
   Listar todos os agendamentos
   Listar um único agendamento
   Remover um agendamento

Horários
   Criar horários
   Listar horários 
   Listar um horário
   Remover horário

User schema:
   id
   name
   username
   password
   created_at

Horários schema:
   date
   morning_star_time: 
   morning_end_time:
   after_start_time:
   after_end_time:

Agendamentos Schema:
   CustomerName:
   number: 
   Service:
   date:
   start_time: 
   end_time: 


30/1/2020


2 - 5

Agendamento
Começa as 2 hrs tem a duração de uma hora(info do serviço)

1 Primeiro ver se tem algum horário disponível com aquele start time e date

2 Ver se o start time + (duração) for maior e igual a outro horário(start time + (duração)) &&
menor igual ao end time - duração.


Id do availability e duração são passados para os listAvailabilitydetails