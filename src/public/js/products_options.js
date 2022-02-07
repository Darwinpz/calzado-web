function delopciones(id) {

    document.getElementById("prod_" + id).remove();

    var count = document.getElementById("items").childElementCount

    if (document.getElementById("galeria") != null) {

        var galeria = document.getElementById("galeria").childElementCount;

        myDropzone.options.maxFiles = Math.abs((count - 1) - galeria)

        document.getElementById("max-archivos").innerText = "Cantidad Máxima de archivos: " + Math.abs((count - 1) - galeria)


    } else {
        myDropzone.options.maxFiles = count - 1

        document.getElementById("max-archivos").innerText = "Cantidad Máxima de archivos: " + (count - 1)
    }

}


function addopciones() {

    var count = document.getElementById("items").childElementCount

    count = count - 1;

    if (count <= 2) {

        var div_eliminar = document.createElement("div");
        div_eliminar.className = "col-1"

        var btn_eliminar = document.createElement("label")
        btn_eliminar.className = "btn btn-danger"
        btn_eliminar.innerText = "X"
        btn_eliminar.setAttribute("onclick", "delopciones(" + count + ")");

        div_eliminar.appendChild(btn_eliminar)

        var row = document.createElement("div");
        row.className = "row mb-2 items"
        row.id = "prod_" + count

        var col_stock = document.createElement("div");
        col_stock.className = "col";

        var col_precio = document.createElement("div");
        col_precio.className = "col";

        var col_color = document.createElement("div");
        col_color.className = "col";

        var col_tallas = document.createElement("div");
        col_tallas.className = "col";

        var input_stock = document.createElement("input");
        input_stock.type = "number"
        input_stock.placeholder = "stock"
        input_stock.className = "form-control"
        input_stock.min = "1"
        input_stock.name = "stock[]"
        input_stock.required = true
        input_stock.setAttribute("oninput", "validity.valid||(value='')");

        var input_precio = document.createElement("input");
        input_precio.type = "number"
        input_precio.placeholder = "precio"
        input_precio.className = "form-control"
        input_precio.min = "1"
        input_precio.name = "precio[]"
        input_precio.required = true

        var input_color = document.createElement("input");
        input_color.type = "text"
        input_color.placeholder = "color"
        input_color.className = "form-control"
        input_color.name = "color[]"
        input_color.required = true

        var input_tallas = document.createElement("input");
        input_tallas.type = "text"
        input_tallas.placeholder = "tallas"
        input_tallas.className = "form-control"
        input_tallas.name = "talla[]"
        input_tallas.required = true

        col_stock.appendChild(input_stock)
        col_precio.appendChild(input_precio)
        col_color.appendChild(input_color)
        col_tallas.appendChild(input_tallas)

        row.appendChild(div_eliminar)
        row.appendChild(col_stock)
        row.appendChild(col_color)
        row.appendChild(col_tallas)
        row.appendChild(col_precio)

        document.getElementById("items").appendChild(row)

        if (document.getElementById("galeria") != null) {

            var galeria = document.getElementById("galeria").childElementCount;

            myDropzone.options.maxFiles = Math.abs((count + 1) - galeria)

            document.getElementById("max-archivos").innerText = "Cantidad Máxima de archivos: " + Math.abs((count + 1) - galeria)

        } else {

            myDropzone.options.maxFiles = count + 1

            document.getElementById("max-archivos").innerText = "Cantidad Máxima de archivos: " + (count + 1)

        }


    }

}

function ObtenerItems() {

    var items = document.getElementsByClassName("items");

    var arreglo = []

    for (var prod of items) {

        var stock = prod.getElementsByTagName("input")[0].value;
        var precio = prod.getElementsByTagName("input")[1].value;
        var color = prod.getElementsByTagName("input")[2].value;

        if (stock != "" && precio != "" && color != "") {

            arreglo.push({ "stock": stock, "precio": precio, "color": color })

        }

    }

    return arreglo

}


function ObtenerCategorias() {

    var categorias = document.getElementsByClassName("categorias");

    var arreglo = ""

    for (var cat of categorias) {

        var item = cat.getElementsByTagName("input")[0];

        if (item.checked) {

            arreglo += item.value + ",";

        }

    }

    return arreglo


}


Dropzone.options.dropzoneForm = {
    url: "/api/uploads/productos",
    autoProcessQueue: true,
    addRemoveLinks: true,
    maxFiles: 1,
    acceptedFiles: ".jpg, .jpeg, .png",
    paramName: "fotos",

    init: function () {


        myDropzone = this;

        /*var boton_guardar = document.querySelector("#btn_guardar");

        myDropzone = this;

        boton_guardar.addEventListener("click", function (e) {
                
            var count = document.getElementById("items").childElementCount - 1

            if (myDropzone.files.length == count) {

                if (document.getElementById("prod_nombre").value != "" && document.getElementById("prod_descripcion").value != "" && ObtenerItems().length == count) {

                    if(ObtenerCategorias()!=""){

                        myDropzone.processQueue();

                    }else{

                        alert("Escoge almenos UNA Categoria");

                    }

                }else{
                    alert("Completa la información requerida");
                }

            } else {
                alert("Agrega las imágenes");
            }

        });*/

        this.on('error', function (file, response) {

            $(file.previewElement).find('.dz-error-message').text(response);

        });

        this.on('success', function (file, response) {

            var foto = document.createElement("input");
            foto.type = "text"
            foto.style = "display:none"
            foto.className = "form-control"
            foto.name = "foto[]"
            foto.value = response
            foto.id = file.upload.uuid
            document.getElementById("imagenes").appendChild(foto)


        });

        this.on('removedfile', function (file) {

            if (document.getElementById(file.upload.uuid) != null) {
                document.getElementById(file.upload.uuid).remove();
            }

        });

        this.on('sending', function (file, xhr, formData) {

            /*formData.append("prod_nombre", document.getElementById("prod_nombre").value);

            formData.append("prod_descripcion", document.getElementById("prod_descripcion").value);
            
            formData.append("prod_items", JSON.stringify(ObtenerItems()));

            formData.append("prod_categorias", ObtenerCategorias())*/


        });

    }

};

Dropzone.prototype.defaultOptions.dictDefaultMessage = "Arrastra los archivos aquí";
Dropzone.prototype.defaultOptions.dictFallbackMessage = "Tu buscador no soporta el arrastrar archivos";
Dropzone.prototype.defaultOptions.dictFallbackText = "Utilice el siguiente formulario de respaldo para cargar sus archivos";
Dropzone.prototype.defaultOptions.dictFileTooBig = "Archivo demasiado grande";
Dropzone.prototype.defaultOptions.dictInvalidFileType = "No puedes subir este tipo de archivo";
Dropzone.prototype.defaultOptions.dictResponseError = "El servidor no responde";
Dropzone.prototype.defaultOptions.dictCancelUpload = "Subida cancelada";
Dropzone.prototype.defaultOptions.dictCancelUploadConfirmation = "¿Estas seguro de cancelar la subida?";
Dropzone.prototype.defaultOptions.dictRemoveFile = "Remover archivo";
Dropzone.prototype.defaultOptions.dictMaxFilesExceeded = "No puedes subir mas archivos";