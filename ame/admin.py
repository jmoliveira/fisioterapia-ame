from django.contrib import admin
from models import Paciente, Estado, Pais
from forms import PacienteForm, EstadoForm

#class PacienteInline(admin.TabularInline):
#    model = Paciente

class PacienteAdmin(admin.ModelAdmin):
    form = PacienteForm
    list_display = ('nome','email')
    search_fields = ('nome',)
    fieldsets = (
        (None,
           {'fields': ('nome', 'sexo', 'data_nascimento', 'email')}
        ),
        (u'Endereco',
           {'fields': ('endereco', 'complemento', 'bairro', 'municipio', 'pais', 'estado', 'cep', 'telefone', 'celular'), 
            'classes': ['collapse']}
        ),
     )
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "estado":
            import pdb; pdb.set_trace()
            kwargs["queryset"] = Estado.objects.filter(pais__id="1")
            return db_field.formfield(**kwargs)
        return super(PacienteAdmin, self).formfield_for_foreignkey(db_field, request, **kwargs)
    
class EstadoAdmin(admin.ModelAdmin):
    list_display = ('nome','pais')
    form = EstadoForm

class PaisAdmin(admin.ModelAdmin):
    pass
 

admin.site.register(Estado, EstadoAdmin)
admin.site.register(Paciente, PacienteAdmin)
admin.site.register(Pais, PaisAdmin)

