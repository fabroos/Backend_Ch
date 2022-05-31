## Descargar imagen

```bash
docker pull $IMAGE_NAME
```

## crear contenedor y ejecutar

```bash
docker run \
    --name drm-mysql \
    -e MYSQL_ROOT_PASSWORD=mysqlpassword \
    -p 3306:3306 \
    -d $IMAGE_NAME
```

el comando -- name es para darle un nombre al contenedor
el comando -e es para pasar variables de entorno
el comando -p es para pasar puertos
el comando -d es para ejecutar el contenedor

## ejemplo mariadb

```bash
docker run --name drm-mariadb -e MYSQL_ROOT_PASSWORD=mysqlpassword -p 3306:3306 -d mariadb
```

## ejemplo mysql

```bash
docker run \
    --name drm-mysql \
    -e MYSQL_ROOT_PASSWORD=mysqlpassword \
    -p 3306:3306 \
    -d $IMAGE_NAME
```

### abrir una terminal en el contenedor

```bash
docker exec -it <nombre del contenedor> bash
```
