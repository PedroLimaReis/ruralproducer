
### Tecnologias
Typescript
PostgresSQL
Prisma
Express
SOLID

## Instalação

```bash
$ npm i

$ docker compose up -d

$ npx prisma generate

$ npx prisma migrate dev
```

## Criação do arquivo .env

```
  PORT=
  DATABASE_URL=
```

## Rodando a aplicação

```bash
$ npm run start:dev
```

## Rotas da aplicação

ROTA PARA BUSCAR TODOS OS PRODUTORES
GET - /

ROTA PARA BUSCAR INFORMAÇÕES DO DASHBOARD
GET - /dashboard

ROTA PARA CRIAR UM PRODUTOR RURAL
POST - /

ROTA PARA DELETAR UM PRODUTOR RURAL
PUT - /:id

ROTA PARA CRIAR UM PRODUTOR RURAL
DELETE - /

## JSON para serem utilizados
``` JSON
{
  "document": "10.942.260/0001-30",
  "nameProducer": "Pedro Lima Reis",
  "nameFarm": "Fazenda Catarina",
  "city": "Patrocinio Paulista",
  "state": "SP",
  "areaFarm": 2000,
  "areaForPlant": 350,
  "areaForVegetation": 280,
  "plantetCrops": [
    "SOJA"
  ]
}
```

``` JSON
{
  "document": "98.926.439/0001-44",
  "nameProducer": "Henrique Reis",
  "nameFarm": "Fazenda 02",
  "city": "Belo Horizonte",
  "state": "MG",
  "areaFarm": 2300,
  "areaForPlant": 850,
  "areaForVegetation": 980,
  "plantetCrops": [
    "MILHO"
  ]
}
```

``` JSON
{
  "document": "86.786.519/0001-62",
  "nameProducer": "Bruno Oliveira Costa",
  "nameFarm": "Fazenda Fenua",
  "city": "Franca",
  "state": "SP",
  "areaFarm": 6000,
  "areaForPlant": 3000,
  "areaForVegetation": 2080,
  "plantetCrops": [
    "ALGODAO",
    "CAFE",
    "CANADEACUCAR"
  ]
}
```
