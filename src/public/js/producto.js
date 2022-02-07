
/*$('#tallas').change(function (e) {

    e.preventDefault();
    
    let $this = $(this);

    let categ_id = $this[0].value;

    $.ajax({

        url: '/dcomputer/productos/ver_categorias',
        data: {'categ_padre':categ_id},
        type: 'POST',
        success: function(data){

           var output ="";
                   
           var array_categorias = JSON.parse(data);

           array_categorias.forEach(categoria => {

                output += '<option value='+categoria.categ_id+'>'+categoria.categ_nombre+'</option>';
               
           });
            
           $("#cmb_subcategoria").html(output);
                
           output ="";

        }

    });

});

*/