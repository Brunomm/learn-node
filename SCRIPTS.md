Init app

```bash
docker-compose run --rm app npm init
```

Install dependences
```bash
docker-compose run --rm app yarn add express body-parser mongose bcryptjs
```

Install JWT
```bash
docker-compose run --rm app yarn add jsonwebtoken
```