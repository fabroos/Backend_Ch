# Entrega 9

Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990).

# Agregar 10 documentos con valores distintos a las colecciones mensajes y productos

```
db.messages.insertMany([{
    "email": "juan@gmail.com",
    "message": "Hola, estoy en MongoDB",
    "timestamp": 1568888888
},
{
    "email": "inain@gmail.com",
    "message": "Hola, estoy en MongoDB y soy Inain",
    "timestamp": 1568888300
},
{
    "email": "laslo@gmail.com",
    "message": "Hola, estoy en MongoDB y soy Laslo",
    "timestamp": 1568888332
},
{
    "email": "picana@gmail.com",
    "message": "Hola, estoy en MongoDB y soy Picana",
    "timestamp": 1568888333
},
{
    "email": "fabri@gmail.com",
    "message": "Hola, estoy en MongoDB y soy Fabri",
    "timestamp": 1568888334
},
{
    "email": "saoko@gmail.com",
    "message": "Hola, estoy en MongoDB y soy Saoko",
    "timestamp": 1568888335
},
{
    "email": "piringa@gmail.com",
    "message": "Hola, estoy en MongoDB y soy Piringa",
    "timestamp": 1568888336
},
{
    "email": "omar@gmail.com",
    "message": "Hola, estoy en MongoDB y soy Omar",
    "timestamp": 1568888337
},
{
    "email": "juan@gmail.com",
    "message": "Hola, estoy en MongoDB y soy Juan",
    "timestamp": 1568888338
},
{
    "email": "luca@gmail.com",
    "message": "Hola, estoy en MongoDB y soy Luca",
    "timestamp": 1568888339
}]);


db.products.insertMany([
    {
        "name": "Laptop",
        "price": 1200,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
    },
    {
        "name": "Mouse",
        "price": 100,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
    },
    {
        "name": "Keyboard",
        "price": 200,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
    },
    {
        "name": "Monitor",
        "price": 300,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
    },
    {
        "name": "Laptop",
        "price": 1200,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
        },
    {
        "name": "Mouse",
        "price": 100,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
    },
    {
        "name": "Keyboard",
        "price": 200,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
    },
    {
        "name": "Monitor",
        "price": 300,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
    },
    {
        "name": "Laptop",
        "price": 1200,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
    },
    {
        "name": "Mouse",
        "price": 100,
        "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
    }
])
```

## Listar todos los documentos en cada colección

```
db.messages.find()
db.products.find()
```

## Mostrar la cantidad de documentos almacenados en cada una de ellas

```
db.messages.count()
db.products.count()
```

## Realizar un CRUD sobre la colección de productos

### Agregar un producto más en la colección de productos

````

db.products.insertOne({
    "name": "Laptop",
    "price": 4330,
    "image": "https://images-na.ssl-images-amazon.com/images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
})


    ```
````

### Realizar una consulta por nombre de producto específico

- Listar los productos con precio menor a 1000 pesos.
- Listar los productos con precio entre los 1000 a 3000 pesos.
- Listar los productos con precio mayor a 3000 pesos.
- Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

  ```
  db.products.find({
      "price": {
          "$lt": 1000
      }
  })

  db.products.find({
      "price": {
          "$gt": 1000,
          "$lt": 3000
      }
  })

  db.products.find({
      "price": {
          "$gt": 3000
      }
  })

  db.products.find({
      "price": {
          "$lt": 1000
      }
  }).sort({
      "price": 1
  }).skip(2).limit(1)
  ```

## Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100

    ```
    db.products.updateMany({}, {
        "$set": {
            "stock": 100
        }
    })
    ```

## Cambiar el stock a cero de los productos con precios mayores a 4000 pesos

    ```
    db.products.updateMany({
        "price": {
            "$gt": 4000
        }
    }, {
        "$set": {
            "stock": 0
        }
    })
    ```

    ## Borrar los productos con precio menor a 1000 pesos

    ```
    db.products.deleteMany({
        "price": {
            "$lt": 1000
        }
    })
    ```

# Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información

```mongo

db.createUser({
    "user": "pepe",
    "pwd": "asd456",
    "roles": [ {"role": "read", "db": "ecommerce"}]
})

mongo -u lector -p 123456

use ecommerce

db.products.find()
db.products.insertOne({
    "name": "Laptop",
    "price": 4330,
    "image": "https://images-na.ssl-images-amazon.com/
    images/I/71-X-%2BX-%2BcL._AC_SX425_.jpg"
})
// error

```
