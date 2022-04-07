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

Agendamento(schedules)
1.Criar agendamentos:
-todos do request.body
-ex: /schedules
-customer_name,
-service, date,
-start_time,
-service_duration,
-phone_number,
-isMorning,
-user_id

2.Listar Agendamentos
-user_id = request.query
-ex: /schedules?user_id={userid}

Horários(availability):
1.Criar horarios:
-todos do request.body
-date,
-morning_start_time,
-morning_end_time,
-afternoon_start_time,
-afternoon_end_time,
-user_id
-ex: /availability (passar o barer token)

2.Listar horários:
-ex: /availability
-{user_id} = request.query

3.Listar detalhes do horario:
-{ service_duration, user_id } = request.query
-{id} = request.params
-ex:availability/details/{availabilityId}?service_duration={sd}&user_id={user_id}

Serviços(product)
1.Criar serviço(todos do request.body):
-name,
-description,
-price,
-duration,
-user_id
-ex: /products (passar o barer token)

2.Listar serviços:
-{user_id} = request.query
ex: /products?user_id={userid}

Transações(transaction)
1.Criar transações(todos do request.body):
-title,
-formatedDate,
-value,
-user_id
-ex: /transactions (passar o barer token)

2.Listar transactions:
-{user_id} = request.query
ex: /transactions?user_id={userid}
