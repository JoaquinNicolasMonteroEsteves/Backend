# Carrito de productos

## Inicialización
1. El proyecto se inicializa sin ningún archivo "files" ni "Products.json" o "Carts.json", por lo que se irán creando a medida que se ejecuten las *request* desde Postman.
2. Las *request* api/products/ son 5: **POST**, dos *request* **GET**, **PUT** y **DEL**; mientras que las request de api/carts/ son 4: dos *request* **POST**, **GET** y **DEL**

## api/products/
### POST (raíz)
Insertará un producto en el archivo **Products.json** dentro de la carpeta *files*. De no existir ni el archivo ni la carpeta, se creará en esta misma *request*.
### GET (raíz)
Devolverá el contenido de **Products.json**. Al igual que la *request* **POST** (raíz), creará la carpeta *files* y/o el archivo **Products.json** en caso de no existir.
### GET (/:pid)
Devolverá el producto que se encuentre dentro del arcivho **Products.json** cuyo *id* coincida con el valor enviado al servidor como ':pid'. En caso de no encontrarse ningún producto con dicho ID, devolverá un mensaje que lo advierte.
### PUT (/:pid)
Actualizará la información del producto cuyo ID coincida con el brindado en lugar de ":pid". No es necesario enviar el objeto entero a modificar con la propiedad con el valor nuevo, sino que se puede enviar únicamente dicha propiedad, pero siempre con formato *OBJECT* desde Postman. En caso de que se envíe una propiedad inexistente **o** se intente modificar el ID de un producto, un aviso será devuelto desde la aplicación.
### DEL (/:pid)
Eliminará definitivamente el producto de la lista de **Products.json** cuyo ID coincida con el ":pid" brindado desde el Postman.

## api/carts/


